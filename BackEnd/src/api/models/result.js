const { default: mongoose } = require('mongoose');


const resultSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    testName: {
        type: String,
        required: true,
    },
    rightAns: {
        type: Number,
        required: true,
    },
    wrongAns: {
        type: Number,
        required: true,
    },
    percent: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Results', resultSchema);