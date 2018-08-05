const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8081;
app.use(bodyParser.json());

const argv = require('./yargs/yargs-configure');
const properties = require('../app.properties');

const {initDb} = require('./db/db');

initDb(properties[argv.env].dbUrl);

const routes = require('./express/express-routes');
routes(app);

app.listen(port,()=>{
    console.log('messenger-auth started at port',port);
});
