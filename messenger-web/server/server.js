const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const SocketIO = require('socket.io');

const argv = require('./yargs/yargs-configure');
const properties = require('../app.properties');

process.env.AUTH_BASE_URL = properties[argv.env].authBaseUrl;
const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../dist/messenger')))
var server = http.createServer(app);
var io = SocketIO(server);

const configureRoutes = require('./express/express-routes');
const loadSockets = require('./socket/chat-socket');

loadSockets(io);
configureRoutes(app);

server.listen(port,()=>{
    console.log('messenger-web started at port',port);
});
