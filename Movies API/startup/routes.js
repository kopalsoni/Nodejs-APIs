const home = require('../routes/homepage');
const customers = require('../routes/customers');
const genres = require('../routes/genres');
const movies = require('../routes/movies')
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const express = require('express');
const error = require('../middleware/error');

module.exports = function(app) {
    // applying middleware functions
    app.use(express.json());                                    // to enable parsing of json object in the body of requests like req.body.name
    // app.use(express.urlencoded({ extended = true}));            // For e.g. POST a new object using key-value pair from postman
    // app.use(express.static('public'));                          // put all our static assets like css, images etc inside public folder
    app.use('/api/genres', genres);
    app.use('/', home);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);                             // error - passing a reference to the function; error() calling the function
}