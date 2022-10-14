const Results = require('../models/result.js');

exports.getResults = (req, res, next) => {
    Results.find({})
        .then((results) => {
            res.status(200).json({
                length: results.length,
                results,
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: "Not Found",
                error: err.message,
            })
        });
};

exports.addResults = (req, res, next) => {
    const createResult = new Results({
        userId: req.body.userId,
        testName: req.body.testName,
        rightAns: req.body.rightAns,
        wrongAns: req.body.wrongAns,
        percent: req.body.percent,
    });
    createResult
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Result uploaded Sucessfully",
            });
        })
        .catch((error) => {
            res.status(400).json({
                message: "Error in uploading result",
                error: error.message,
            })
        });
};

exports.getResultsByUserId = (req, res, next) => {
    const userId = req.params.userId;
    Results.find({
        userId: userId,
    })
        .exec()
        .then((results) => {
            res.status(200).json({
                message: "Results found",
                results,
            });
        })
        .catch((err) => {
            res.status(400).json({
                message: "Results not found",
                error: err.message,
            })
        })
};

exports.deleteResult = (req, res, next) => {
    const id = req.params.resultId;

    Results.findById(id)
        .then((result) => {
            result
                .remove()
                .then(() => {
                    res.status(200).json({
                        message: "Result deleted succesfully"
                    });
                })
                .catch((err) => {
                    res.status(400).json({
                        message: "Result deletion failed",
                        error: err.message
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Result not found",
                error: err.message,
            })
        });
};