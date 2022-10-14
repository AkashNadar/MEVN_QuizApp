const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },

    password: {
        type: String,
        required: true,
    },

    accessLevel: {
        type: String,
        default: 'student',
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);