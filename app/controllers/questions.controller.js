const db = require("../models");
const Questions = db.questions;
const Op = db.Sequelize.Op;
const {questionGenUtil} = require("../helpers/subtractionGenerator");
// Create and Save Questions
const generateQuestions = (req) => {
  

  // Create a Questions
  let reqBody = req.body;
  const totalQuestions = reqBody.totalQuestions;
  const minuendDigits = reqBody.minuendDigits;
  const subtrahendDigits = reqBody.subtrahendDigits;
  const isBorrow = reqBody.isBorrow ? reqBody.isBorrow : false;

  const generatedQuestions = questionGenUtil(
    totalQuestions,
    minuendDigits,
    subtrahendDigits,
    isBorrow
  );
  const dbPayload = generatedQuestions.map((que) => ({
    minuendDigits,
    subtrahendDigits,
    isBorrow,
    minuend: que.minuend,
    subtrahend: que.subtrahend,
    option1: que.options[0],
    option2: que.options[1],
    option3: que.options[2],
    option4: que.options[3]
  }));
  
  return {generatedQuestions, dbPayload} ;  
};

exports.generatedQuestionsWithoutSaving = (req, res) => {
  // Validate request
  let reqBody = req.body;
  if (
    !reqBody.totalQuestions ||
    !reqBody.minuendDigits ||
    !reqBody.subtrahendDigits
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  try{
    const {generatedQuestions} = generateQuestions(req) ;
    res.send(generatedQuestions) ; 
  }catch(err){
    res.status(400).send({message: err.message ||"Some error occured"}) ; 
    console.log(err) ;
  }

}  

exports.generatedQuestionsAndSave = (req, res) => {
  // Validate request
  let reqBody = req.body;
  if (
    !reqBody.totalQuestions ||
    !reqBody.minuendDigits ||
    !reqBody.subtrahendDigits
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const {generatedQuestions, dbPayload} = generateQuestions(req) ;
  Questions.bulkCreate(dbPayload)
  .then(()=>{
    res.send(generatedQuestions) ; 
  })
  .catch((err)=>{
    res.status(500).send({
      message: err.message || "Some error occured"
    })
  })
}

// Retrieve all Questions from the database.
exports.getAllQuestions = (req, res) => {
  Questions.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving questions.",
      });
    });
};