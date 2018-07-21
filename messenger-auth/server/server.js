const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 8081;
app.use(bodyParser.json());

const SALT = require('../app.properties').jwtSecret;
var loginDB = require('./tmp-data');

app.post('/api/login',async (req,res) => {
    try {
        var user = req.body;
        var token = jwt.sign({username:user.username}, SALT);
        // console.log(await bcrypt.hash(user.password,SALT));
        var result = await bcrypt.compare(user.password,loginDB[user.username].password);
        if(result){
            return res.header('x-auth',token).send({status:'OK'});
        }
    } catch (e) {
        return res.send({status:'ERROR', errorMessage:'UserName or password is incorrect!'});
    }
    res.send({status:'ERROR', errorMessage:'UserName or password is incorrect!'});
});

app.get('/health',(req,res)=>{
    res.send({message:'messenger-auth'});
});

app.listen(port,()=>{
    console.log('messenger-auth started at port',port);
});
