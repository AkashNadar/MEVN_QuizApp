// Imports
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config;

//Internal Modules 
const questionRoutes = require('./api/routes/question.js');
const userRoutes = require('./api/routes/user.js');
const resultRoutes = require('./api/routes/result.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(morgan("dev"));

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "Origin, X-Requested-With, Accept, Authorization, Content-Type");
    if (req.method === "OPTIONS") {
        req.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
        res.status(200).json({})
    }
    next();
});

// Mongoose Connection

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("your mongoose is connected 😀"))
    .catch(err => console.log(err.message));

// Routes
app.use("/question", questionRoutes);
app.use("/users", userRoutes);
app.use("/results", resultRoutes);

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(__dirname + "/dist/"));

//     app.get('*', (req, res) => {
//         res.sendFile(__dirname + '/dist/index.html');
//     });
// }


// Welcome
app.use("/", (req, res, next) => {
    res.send("Welcome!");
});

// Catch all Errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: "Error 💥",
        }
    })
});

module.exports = app;