const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  test: [
    {
      question: {
        type: String,
        required: true,
      },

      options: [],

      ans: {
        type: String,
        required: true,
      },
    },
  ],
  email: {
    type: String,
    required: true,
  },
  testName: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Questions", QuestionSchema);
