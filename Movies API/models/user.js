const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1250
    },
    isAdmin: {
        type: Boolean,
        // roles: [],
        // operations: []
    }
});

// adding a method in schema; menthods return key-value pair so we set a key generateAuthToken and set it to a value which is a fucntion
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
      name: Joi.string().min(5).max(250).required(),
      email: Joi.string().min(5).max(250).required().email(),
      password: Joi.string().min(5).max(1250).required()
    };
    return Joi.validate(user, schema);
  }
  
  exports.User = User; 
  exports.validate = validateUser;