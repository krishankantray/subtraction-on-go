const Server = require('../../server');
const chai = require('chai');
const {expect} = require('chai') ;
const chaiHttp = require('chai-http');
const {isBorrowExis} = require('../helpers/subtractionGenerator')
chai.use(chaiHttp);

const testCase = {
    "totalQuestions" : 10,
    "minuendDigits" : 5,
    "subtrahendDigits" : 4,
    "isBorrow" : false
  } ; 


describe('Testing GET: /api/generateQuestionWithoutSaving', ()=>{
    it('GET', async function(){
        let res = await chai.request(Server)
        .get('/api/generateQuestionWithoutSaving')
        .set('Content-Type', 'application/json')
        .send(testCase)
        
        expect(res).to.have.status(200) ;
        const data = res.body ; 
        console.log(data.length) ; 
        expect(data).to.have.length(testCase.totalQuestions) ;
        for(const ques of data){
            expect(ques.subtrahend.toString()).to.have.length(testCase.subtrahendDigits) ; 
            expect(ques.minuend.toString()).to.have.length(testCase.minuendDigits) ; 
            expect(ques.minuend-ques.subtrahend).to.be.equal(ques.correctAns) ; 
            expect(isBorrowExis(ques.minuend, ques.subtrahend)).to.be.equal(testCase.isBorrow) ; 
        }
    })
})