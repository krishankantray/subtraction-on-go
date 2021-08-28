/**
 * 
 * @param {number} min  
 * @param {number} max 
 * @returns return a random number between min and max
 */
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 
 * @param {number} n 
 * @param {number} i 
 * @returns return ith digit of a number 
 */
function ithDigit(n, i){
    const place = Math.pow(10,i) ; 
    const iPlace = Math.pow(10, i-1) ; 
    return Math.floor((n%place)/iPlace) ;
}

/**
 * 
 * @param {number} minuend 
 * @param {number} subtrahend 
 * @returns return true/false based on where borrow exists or not
 */
function isBorrowExis(minuend, subtrahend){
    for(let i=1; i<=subtrahend.toString().length; i++){
        if(ithDigit(minuend, i)<ithDigit(subtrahend, i))
            return true; 
    }
    return false; 
}

/**
 * 
 * @param {number} difference 
 * @returns an array of integral options
 */
function optionsGenerator(difference){
    let res = [difference];
    const diffLen = difference.toString().length ; 
    
    // Answer will be of same length as of difference 
    const mx = Math.pow(10, diffLen) -1 ;
    const mn = Math.pow(10, diffLen-1) ; 
    for(let i=0; i<3; i++){
        res.push(randomIntFromInterval(mn, mx)) ; 
    }
    // Shuffling the array 
    res.sort( () => .5 - Math.random() );
    return res ; 
}

/**
 * 
 * @param {number} minuendDigits 
 * @param {number} subtrahendDigits 
 * @param {boolean} isBorrow 
 * @returns generate one subtraction question
 */
function generate(minuendDigits, subtrahendDigits, isBorrow){
    if(isBorrow){
        const maxMinuend = Math.pow(10, minuendDigits) -1 ;
        const minMinuend = Math.pow(10, minuendDigits-1) ; 
        const maxSubtrahend = Math.pow(10, subtrahendDigits) -1 ;
        const minSubtrahend = Math.pow(10, subtrahendDigits-1) ; 
        let minuend = 0 ; 
        let subtrahend = 0 ;
        do{
            const n1 = randomIntFromInterval(minMinuend, maxMinuend) ;
            const n2 = randomIntFromInterval(minSubtrahend, maxSubtrahend) ;
            minuend = Math.max(n1, n2) ; 
            subtrahend = Math.min(n1, n2) ; 
        } while(!isBorrowExis(minuend, subtrahend))

        const difference = minuend - subtrahend ; 
        return {
            minuend,
            subtrahend,
            correctAns: difference,
            options : optionsGenerator(difference) 
        }
    }
    else{
        const max = Math.pow(10, minuendDigits) -1 ;
        const min = Math.pow(10, minuendDigits-1) ; 
        let minuend ;
        do{
            minuend = randomIntFromInterval(min, max) ;
        }while(minuend === min || ithDigit(minuend, subtrahendDigits)===0)
        let subtrahend = "" ;
        for(let i=1; i<=subtrahendDigits; i++){
            const mxDig = ithDigit(minuend, i) ; 
            const minDig = mxDig 
            subtrahend = (randomIntFromInterval(i===subtrahendDigits ? 1: 0,mxDig) ) + subtrahend ;
        }
        subtrahend = parseInt(subtrahend) ; 
        const difference = minuend - subtrahend ; 
        return {
            minuend,
            subtrahend,
            correctAns: difference,
            options : optionsGenerator(difference) 
        }
    }
}
/**
 * 
 * @param {number} totalQues 
 * @param {number} minuendDigits 
 * @param {number} subtrahendDigits 
 * @param {number} isBorrow 
 * @returns an array of (totoalQues) number of questions 
 */
function questionGenUtil(totalQues, minuendDigits, subtrahendDigits, isBorrow){
    let response = [] ;
    for(let i=0; i<totalQues; i++){
        response.push(generate(minuendDigits, subtrahendDigits, isBorrow)) ;
    }
    return response ; 
}

module.exports.questionGenUtil = questionGenUtil ; 
module.exports.isBorrowExis = isBorrowExis ; 
