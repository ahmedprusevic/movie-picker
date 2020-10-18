// To be able to make routes in separate folders we need express router
const express = require('express');
const router = express.Router();

// Bring in the auth middleware since we will have private routes
const auth = require('../../middleware/auth');
const { watch } = require('../../models/Profile');


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

// Routes are made instead app.get with router.post() method
// @route Create or update api/profile
// Private

router.post('/',auth, async (req, res) => {
    const { watched, favourite } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id
    if(watched){
        profileFields.watched = watched.map(watched => watched.trim()); 
    }
    if(favourite){
        profileFields.favourite = favourite.map(favourite => favourite.trim()); 
    }
    try{
        let profile = await Profile.findOne({ user: req.user.id });

        if(profile){
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields},
                { new: true }
            );
        return res.json(profile);
        }
        // Create 
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Routes are made instead app.delete with router.delete() method
// @route Delete api/profile , user and posts
// Private

router.delete('/',auth,  async (req, res) => {
    try {
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: "User removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Exporting Route

module.exports = router;