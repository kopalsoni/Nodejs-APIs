const auth = require('../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const { User, validate} = require('../models/user');
const router = express.Router();

console.log(' In routes of users...');

router.get('/me', auth, async (req, res) => {                              // if we use ID, anyone can get the user info just with the ID so we use me
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered...');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);                     // instead of passing a callback, we await the promise
    user.password = await bcrypt.hash(user.password, salt)
    
    await user.save();

    // generating json web token
    //const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    const token = user.generateAuthToken();
    
    // sending the token in header
    res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));             // since we don't want to send passwords
});

module.exports = router;