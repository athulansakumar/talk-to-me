const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../db/models/user.model');
const _ = require('lodash');

module.exports = (app) => {
    app.post('/api/login',async (req,res) => {
        try {
            var reqUser = req.body;
            let user = await User.findOne({email:reqUser.username});
            await user.verifyPassword(reqUser.password);
            let token = await user.generateAuthToken();
            return res.header('x-auth',token).send({status:'OK'});
        } catch (e) {
            return res.send({status:'ERROR', errorMessage:'UserName or password is incorrect!'});
        }
        res.send({status:'ERROR', errorMessage:'UserName or password is incorrect!'});
    });

    app.post('/api/signup',async (req,res) => {
        try {
            let user = User(_.pick(req.body,['email','firstName','lastName','password']));
            await user.save();
            let token = await user.generateAuthToken();
            return res.header('x-auth',token).send({status:'OK'});
        } catch (e) {
            return res.send({status:'ERROR', errorMessage:e});
        }
        res.send({status:'ERROR', errorMessage:'UserName or password is incorrect!'});
    });

    app.get('/api/user/:id',async (req,res) => {
        try {
            let user = await User.findById(req.params.id);
            res.send(user);
        } catch (e) {
            return res.send({status:'ERROR'});
        }
    });

    app.get('/health',(req,res)=>{
        res.send({message:'messenger-auth'});
    });
};
