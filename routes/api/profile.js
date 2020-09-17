// To be able to make routes in separate folders we need express router
const express = require('express');
const router = express.Router();

// Bring in the auth middleware since we will have private routes
const auth = require('../../middleware/auth');

// Bringing in Profile and User models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Routes are made instead app.get with router.get() method
// @route GET api/profile/me
// Private
router.get('/me', auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);
        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Exporting Route

module.exports = router;