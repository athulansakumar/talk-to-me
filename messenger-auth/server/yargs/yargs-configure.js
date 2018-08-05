const yargs = require('yargs');

const argv = yargs.options({
    env:{
      description : 'environment (default is dev)',
      demand : false,
      string: true,
      default: 'dev'
    },
    dev:{
        description : 'dev environment',
        demand : false,
        boolean: true,
        alias: 'd'
    },
    production:{
        description : 'production environment',
        demand : false,
        boolean: true,
        alias: 'prod'
    }
}).argv;

argv.env = argv.prod?'production':'dev';

module.exports = argv;
