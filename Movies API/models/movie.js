const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema, Genre, validate } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 250 },
    genre: {
        type: genreSchema,
        required: true },
    numberInStock: {
        default: 10,
        type: Number,
        min: 0,
        max: 250, },
    dailyRentalrate: {
        default: 90,
        type: Number,
        min: 0,
        max: 250 }
}))

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreID: Joi.objectId().min(0).required(),                    // we want the client to only send the ID of the genre
    numberInStock: Joi.number().min(0),
    dailyRentalrate: Joi.number().min(0)   
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;