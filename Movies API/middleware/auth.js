const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // store the token
    const token = req.header('x-auth-token');

    // validate
    if(!token) return res.status(401).send('Access denied. No token provided.');                           // client doesn't have authentication credentials to access

    try{
        // the const decoded is basically a payload
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))                  // second arg is private key for decoding the token
        req.user = decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token.');                                // bad request
    }
}

// module.exports = auth;