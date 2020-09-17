// Require mongoose to be able to interact with DB
const mongoose = require('mongoose');

// Create UserSchema with method 'new mongoose.Schema()'
// mongoose.schema takes in an object with properties, read online more for properties

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    watched: {
        type: [String]
    },
    favourite: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);