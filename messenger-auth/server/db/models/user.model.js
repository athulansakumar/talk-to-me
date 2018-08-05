const {mongoose} = require('../db');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _  = require('lodash');

const properties = require('../../../app.properties');
const SALT = properties.jwtSecret;

var userSchema = new mongoose.Schema({
    email: {
        required : true,
        unique: true,
        type: 'string',
        validate : {
            validator : validator.isEmail,
            message : '{VALUE} is not a valid email'
        }
    },
    firstName : {
        type: 'string',
        required : true
    },
    lastName: {
        type: 'string',
        required : true
    },
    password : {
        type: 'string',
        required : true
    },
    tokens : [{
        type :{
            type: 'string'
        },
        token:{
            type: 'string'
        }
    }]
});

userSchema.pre('save',async function(next) {
  if(this.isModified('password')){
      var hash = await bcrypt.hash(this.password,SALT)
      this.password = hash;
      next();
  }else{
      next();
  }
});

userSchema.methods.verifyPassword = function(password){
    return new Promise(async (resolve,reject) => {
        var result = await bcrypt.compare(password,this.password);
        if(result){
            return resolve();
        }
        reject();
    });
};

userSchema.methods.generateAuthToken = function(){
    var user  = this;
    user.tokens = user.tokens.reduce((t,v)=>{
        if(v.type!='auth')
            return t.concat([v]);
        return t;
    },[]);
    var token = jwt.sign({_id:user._id.toHexString()},SALT).toString();
    user.tokens = user.tokens.concat([{type:'auth',token}]);
    return user.save().then(() => {
        return Promise.resolve(token);
    });
}

userSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret = _.pick(doc,['_id','email','firstName','lastName']);
        return ret;
    }
};


var User = mongoose.model('User',userSchema);

module.exports = User;
