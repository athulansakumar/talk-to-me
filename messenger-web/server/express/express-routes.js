const path = require('path');
const axios = require('axios');
const _ = require('lodash');
const authBaseUrl = process.env.AUTH_BASE_URL;

var configureRoutes = (app) => {
    app.post('/api/login',async (req,res) => {
        try{
            var loginRes = await axios.post(`${authBaseUrl}/api/login`,req.body);
            var resBody = loginRes.data;
            var resHeader = _.pick(loginRes.headers,['x-auth']);
        }catch(err){
            return res.send({status:'ERROR', errorMessage:'Please try again!'});
        }
        res.header(resHeader).send(resBody);
    });

    app.get('/api/user/:id',async (req,res) => {
        try{
            var loginRes = await axios.get(`${authBaseUrl}/api/user/${req.params.id}`);
            var resBody = loginRes.data;
        }catch(err){
            return res.send({status:'ERROR', errorMessage:'Please try again!'});
        }
        res.send(resBody);
    });

    app.get('/health',(req,res) => {
        res.send({ message: 'messenger-web'});
    });

    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'../dist/messenger/index.html'),{req});
    });
};

module.exports = configureRoutes;
