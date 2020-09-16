// To be able to make routes in separate folders we need express router
const express = require('express');
const router = express.Router();
// express-validator gives us server side validation
const { check, validationResult } = require('express-validator');

// requireing jsonwebtoken
const jwt = require('jsonwebtoken');

// To be able to acces the variables in this case jwt token, you used it also in mongoURI when connecting databse
const config = require('config');

// library used to encrypt password 
const bcrypt = require('bcryptjs');

// Bring User model
const User = require('../../models/User');

// Routes are made instead app.get with router.get() , router.post() method
// @route POST api/users
// Registrating user
// Public route
router.post('/', 
// Below is server side validation, that will be later used in React on front end to display message
    [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 
    'Please enter a password with 6 or more characters'
    ).isLength({min:6}) 
    ], 
// Callback function
   async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
    // Check if the user exists, User.findOne is method that will check if user exists given the parameter to check with can be name email or anything
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ errors:[ { msg:'User already exists' } ]});
        }
        // create new user using object created above.
        user = new User({
            name,
            email,
            password
        });
    // Encrypt password
    //  creating salt of how many rounds we want to salt our password , 10 being recomended by docs, we have to use await since it returns promise
    const salt = await bcrypt.genSalt(10);
    // taking that password from the user object we created above, use await again since it returns a promise, bcrypt.hash() method takes in two things password and salt
    user.password = await bcrypt.hash(password, salt);
    // save user in the database, again await since ti returns a promise
    await user.save();

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