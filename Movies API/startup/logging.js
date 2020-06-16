// require('express-async-errors');
const winston = require('winston');
winston.exitOnError = false;

// const winston = require("winston/lib/winston/transports");

module.exports = function(){

    console.log('I am here.........................');
    // winston.add(winston.transports.File, { filename: 'logfile.log' })
    // winston.add(new winston.transports.File({ filename: 'logfile.log' }));

    winston.exceptions.handle()(               //handleExceptions
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

    process.on('unhandledRejection', (ex) =>{
        throw ex;
    })
}