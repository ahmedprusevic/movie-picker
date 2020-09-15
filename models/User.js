// Require mongoose to be able to interact with DB
const mongoose = require('mongoose');

// Create UserSchema with method 'new mongoose.Schema()'
// mongoose.schema takes in an object with properties, read online more for properties
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Exporting Schema , naming it User, mongoose.model method takes in two arguments first one is the name second one is Schema

module.exports = User = mongoose.model('user', UserSchema);