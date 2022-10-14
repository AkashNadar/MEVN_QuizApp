const Questions = require("../models/question.js");

exports.getAllQuestions = (req, res, next) => {
  Questions.find({}).then((tests) => {
    res.status(200).json({
      length: tests.length,
      tests,
    });
  });
};

// Perfect
exports.createTest = (req, res, next) => {
  const createTest = new Questions({
    test: [],
    email: req.body.email,
    testName: req.body.testName,
  });
  createTest
    .save()
    .then((createdTest) => {
      res.status(201).json({
        message: "test created successfully",
        id: createdTest._id
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "test created unsuccessfully",
        error: err.message,
      });
    });
};

exports.removeTest = (req, res, next) => {
  const id = req.params.testId;

  Questions.findById(id)
    .then((test) => {
      test
        .remove()
        .then(() => {
          res.status(200).json({
            message: "Test deleted successfully",
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Test deletion unsuccessful",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Test not found",
        error: err.message,
      });
    });
};

exports.getTestById = (req, res, next) => {
  const testID = req.params.testId;

  Questions.findById(testID)
    .then((result) => {
      res.status(200).json({
        message: "Test Found",
        questions: result.test,
        testName: result.testName,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Test not found",
        error: err.message,
      });
    });
};

exports.getTestsByEmail = (req, res, next) => {

  Questions.find({
    email: req.params.email
  })
    .exec()
    .then((tests) => {
      return res.status(200).json({
        message: "Tests found",
        tests,
      })
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Test not found",
        error: err.message,
      })
    });
};

exports.addQuestion = (req, res, next) => {
  const bodyOptions = [];
  bodyOptions.push(req.body.op1);
  bodyOptions.push(req.body.op2);
  bodyOptions.push(req.body.op3);
  bodyOptions.push(req.body.op4);

  const singleQuestion = {
    question: req.body.question,
    options: bodyOptions,
    ans: req.body.ans,
  };
  //   console.log(bodyOptions);
  const testID = req.params.testId;
  console.log("inside create");
  Questions.findById(testID)
    .then((result) => {
      result.test.push(singleQuestion);
      Questions.updateOne({ _id: testID }, { $set: result })
        .exec()
        .then(() => {
          res.status(200).json({
            message: "Question added to the test sucessfully",
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Question not added",
            error: err.message,
          });
        });
      //   res.status(200).json({
      //     res: result,
      //     quest: singleQuestion,
      //   });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Test not found",
        error: err.message,
      });
    });
};

exports.removeQuestion = (req, res, next) => {
  const testID = req.params.testId;
  const questionID = req.params.questId;

  Questions.findById(testID)
    .then((test) => {
      test.test = test.test.filter(
        (quest) => quest._id != questionID
      );

      Questions.updateOne({ _id: testID }, { $set: test })
        .exec()
        .then(() => {
          res.status(200).json({
            message: "Question removed successfully",
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: "Question not removed",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Test not found",
        error: err.message,
      });
    });
};

exports.updateQuestion = (req, res, next) => {
  const updatedQuestion = {};
  const body = Object.entries(req.body);
  for (const key of body) {
    updatedQuestion[key[0]] = key[1];
  }
  delete updatedQuestion.questionId;
  Questions.updateOne(
    { _id: req.params.testId, "questions._id": req.body.questionId },
    { $set: updatedQuestion }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "question updated successfully",
        result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "question updated unsuccessful",
        error: err.message,
      });
    });
};
