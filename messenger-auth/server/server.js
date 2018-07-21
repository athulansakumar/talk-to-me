const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8081;
app.use(bodyParser.json());

var loginDB = require('./tmp-data');

app.post('/api/login',(req,res) => {
    var user = req.body;
    if(loginDB[user.username] && loginDB[user.username].password === user.password){
        return res.header('x-auth',loginDB[user.username].secret).send({status:'OK'});
    }
    res.send({status:'ERROR', errorMessage:'UserName or password is incorrect!'});
});

app.listen(port,()=>{
    console.log('messenger-auth started at port',port);
});
