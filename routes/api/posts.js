// To be able to make routes in separate folders we need express router
const express = require('express');
const router = express.Router();

// Routes are made instead app.get with router.get() method
// @route GET api/posts
// Public route
router.get('/', (req,res) => res.send('Posts route'));

// Exporting Route

module.exports = router;