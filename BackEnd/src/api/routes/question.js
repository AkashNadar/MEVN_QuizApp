const express = require("express");
const router = express.Router();
const questionController = require("../controllers/question.js");

router.get("/", questionController.getAllQuestions);
// router.post("/", questionController.addQuestion);

// router.get("/:questionId", questionController.getQuestionById);

// router.patch("/:testId", questionController.updateQuestion);

router.delete(
  "/:testId/removeQuestion/:questId",
  questionController.removeQuestion
);

router.delete("/deleteTest/:testId", questionController.removeTest);

router.post("/createTest", questionController.createTest);

router.patch("/:testId", questionController.addQuestion);

router.get("/:testId", questionController.getTestById);

router.get("/getAllTest/:email", questionController.getTestsByEmail);

module.exports = router;
