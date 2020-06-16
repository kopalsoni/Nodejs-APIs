const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {

    console.log('I am here.........................');
    mongoose.connect('mongodb://localhost/Movies', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => winston.info('Connection to Movies database successful...'))
        // .catch(err => console.error('There was some problem while connecting to the database: ', err));
}