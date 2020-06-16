const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const Fawn = require('fawn');

const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerID);
    if (!customer) return res.status(400).send('Invalid Customer ID...');

    const movie = await Movie.findById(req.body.movieID);
    if (!movie) return res.status(400).send('Invalid Movie ID...');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock...');

    const rental = new Rental({
        customer : {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })
    // rental = await rental.save();
  
    // // update the number of stock in movie
    // movie.numberInStock--;
    // movie.save();
    //OR                                                // to peform the save and update at once or fail at once
    try {
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, 
            { $inc: { numberInStock: -1 } 
            })               // -1 because we want to decrement the number
        .run();
    res.send(rental);
    }
    catch(ex) {
        res.status(500).send(' Something failed')
    }
});

module.exports = router;