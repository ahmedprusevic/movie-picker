// Require jwt token
const jwt = require('jsonwebtoken');
// Require config to use global variable jwtSecret
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header, x-auth-token is header through we will send token
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token){
        res.status(401).json({ msg: "No token, auth denied" });
    }
    // Verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({ msg: 'Token is not valid' });
    }
}