// To be able to make routes in separate folders we need express router
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// importing bcrypt
const bcrypt = require('bcryptjs');

// To be able to acces the variables in this case jwt token, you used it also in mongoURI when connecting databse
const config = require('config');

// requireing jsonwebtoken
const jwt = require('jsonwebtoken');

// importing middleware
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// Routes are made instead app.get with router.get() method
// @route GET api/auth
// Public route
// Putting in auth middleware will make this route protected
// Using async await since we are making request to our database
router.get('/', auth, async (req,res) => {
    try {
        // Find user by id and don't bring back password
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Making log in possible
router.post('/', 
// Below is server side validation, that will be later used in React on front end to display message
    [
    check('email', 'Please include valid email').isEmail(),
    check('password', 
    'Password is required'
    ).exists()
    ], 
// Callback function
   async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
    // Check if the user exists, User.findOne is method that will check if user exists given the parameter to check with can be name email or anything
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ errors:[ { msg:'Invalid Credentials' } ]});
        }

    // make sure the password match
    // bcrypt.compare is method that takes 2 arguments password and encrypted password and compares them
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res.status(400).json({ errors:[ { msg:'Invalid Credentials' } ]});
    }
    // Return jsonwebtoken
    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(
        payload, 
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
    } catch(err) {
        console.error(err.mesage);
        res.status(500).send('Server error');
    }
});

// Exporting Route

module.exports = router;