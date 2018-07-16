const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const SocketIO = require('socket.io');

const loadSockets = require('./socket/chat-socket');

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
var server = http.createServer(app);
var io = SocketIO(server);

loadSockets(io);

var loginDB = require('./tmp-data');

app.post('/login',(req,res) => {
    var user = req.body;
    if(loginDB[user.username] && loginDB[user.username].password === user.password){
        return res.header('x-auth',loginDB[user.username].secret).send({status:'OK'});
    }
    res.send({status:'ERROR', errorMessage:'UserName or password is incorrect!'});
});

app.get('/',(req,res) => {
    res.send({ message: 'Hello World! :P'});
});

server.listen(port,()=>{
    console.log('Server started at port',port);
});
