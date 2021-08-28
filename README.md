## Tech Stack used : 
* Node.js 
* Express 
* Sequelize 
* MySQL



### Project setup via Docker
First goto project root directory.

Then run below commands : 
```
sudo docker build -t subtraction-on-go . 
```
```
sudo docker run -p 9000:9000 subtraction-on-go
```

### Project setup without docker
Install all dependencies
```
npm install
```
Run test cases 
```
npm test
```
Start local development server
```
npm start
```

This app is also deployed on - https://subtraction-on-go.herokuapp.com/

<br>
<hr>
<br>

**There are three endpoints available :** 

Generate without save : 
```bash
curl --location --request GET 'https://subtraction-on-go.herokuapp.com/api/generateQuestionWithoutSaving' \
--header 'Content-Type: application/json' \
--data-raw '{
  "totalQuestions" : 10,
  "minuendDigits" : 5,
  "subtrahendDigits" : 4,
  "isBorrow" : false
}'
```

Generate and save : 

```bash
curl --location --request POST 'https://subtraction-on-go.herokuapp.com/api/generateQuestionAndSave' \
--header 'Content-Type: application/json' \
--data-raw '{
  "totalQuestions" : 10,
  "minuendDigits" : 5,
  "subtrahendDigits" : 4,
  "isBorrow" : false
}'
```

Get all questions : 

```bash
curl --location --request GET 'https://subtraction-on-go.herokuapp.com/api/getAllQuestions' \
--header 'Content-Type: application/json' \
--data-raw ''
```

### Database Structure
The database contains only one table called - `questions`

Below is the structure of the table :  
![Image of MySQL table ](/app/docs/tables.png)


## All bonus points covered : 

* ✅ Writing test cases : Test case written using `mocha` and `chai` ( `app/test` )
* ✅ Dockerfile added
* ✅ options are of same length as correct answer
* ✅ Code deployed on `Heroku` : https://subtraction-on-go.herokuapp.com/

<br>
<hr>
<br>

## Deatiled discussion of theory of questions and options generation :

<br>

**All the logics are written inside file :** `app/helpers/subtractionGenerator.js`

<br>

### Question Generation logic

<br>

We handle borrow and no borrow conditions separately.

1) **For case when borrow is needed :**  
    When borrow is needed then we just generate two random number of given length utill alteast one borrow is there in the question. 
    Sudo Code : 
    ```javascript
    do{
        // generate two random numbers of given length
    } while( ! isBorrowExist)
    ```
2) **For case when borrow is not needed :**  
    This was really tricky to implement 🥵 

    When borrow is not needed then we generate the `minuend` randomly of given length with a condition that the digit at `subtrahendDigits` of minuend number should not be `0` . 

    For generating `subtrahend`, we follow `minuend` digit by digit and generate random digit less than the `minuend` . 


### Options generation logic 

<br>

For generating the options, we find the number of digits in the difference `(minuend - subtrahend)` , then generate ramdom number having same number of digits as that of difference. 

And we shuffle the `options[]` array using below logic : 

```
options.sort( () => .5 - Math.random() );
```
The `sort()` function takes a comaparator, in this case, the comparator sometimes returns positive and somtimes negative. 
