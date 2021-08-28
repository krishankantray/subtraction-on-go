module.exports = app => {
  const questions = require("../controllers/questions.controller.js");

  var router = require("express").Router();

  // Generate Questions
  router.get("/generateQuestionWithoutSaving", questions.generatedQuestionsWithoutSaving);

  // Create Questions and save Questions
  router.post("/generateQuestionAndSave", questions.generatedQuestionsAndSave);

  // Retrieve all Questions
  router.get("/getAllQuestions", questions.getAllQuestions);

  app.use('/api', router);
};
