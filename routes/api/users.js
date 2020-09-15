// To be able to make routes in separate folders we need express router
const express = require('express');
const router = express.Router();
// express-validator gives us server side validation
const { check, validationResult } = require('express-validator');

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
    (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route')
});

// Exporting Route

module.exports = router;