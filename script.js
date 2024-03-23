var valid_words = ['AA', 'AB', 'AD', 'AE', 'AG', 'AH', 'AI', 'AL', 'AM',
 'AN', 'AR', 'AS', 'AT', 'AW', 'AX', 'AY', 'BA', 'BE', 'BI', 'BO', 'BY', 'DA', 'DE', 
 'DO', 'ED', 'EF', 'EH', 'EL', 'EM', 'EN', 'ER', 'ES', 'ET', 'EW', 'EX', 'FA', 'FE',
 'GI', 'GO', 'HA', 'HE', 'HI', 'HM', 'HO', 'ID', 'IF', 'IN', 'IS', 'IT', 'JO', 'KA', 
 'KI', 'LA', 'LI', 'LO', 'MA', 'ME', 'MI', 'MM', 'MO', 'MU', 'MY', 'NA', 'NE', 'NO', 
 'NU', 'OD', 'OE', 'OF', 'OH', 'OI', 'OK', 'OM', 'ON', 'OP', 'OR', 'OS', 'OW', 'OX',
 'OY', 'PA', 'PE', 'PI', 'PO', 'QI', 'RE', 'SH', 'SI', 'SO', 'TA', 'TE', 'TI', 'TO',
 'UH', 'UM', 'UN', 'UP', 'US', 'UT', 'WE', 'WO', 'XI', 'XU', 'YA', 'YE', 'YO', 'ZA'];

var vowels = ['A','E','I','O','U','Y'];

var correctAudio = new Audio("./gameSounds/correct.mp3")
var wrongAudio = new Audio("./gameSounds/wrong.mp3")

var wordDiv = document.getElementById("word");
var score = document.getElementById("score_correct");
var total = document.getElementById("total");
var correctDiv = document.getElementById("correct");
var wrongDiv = document.getElementById("wrong");

this.wordPrompt = "";
function getWordPrompt(){
    return this.wordPrompt;
}

function setWordPrompt(wordToSet){
    this.wordPrompt = wordToSet;
    wordDiv.textContent = wordPrompt;
}

this.setWordPrompt(generateRandomWord());

var yesButton = document.getElementById("yesButton");
yesButton.addEventListener("keyup", (e) => {

    let pressedKey = String(e.key)
 
    if (pressedKey === "ArrowLeft" || pressedKey === "Left") {
        isAnswerCorrect("yes");
    }
})

yesButton.addEventListener("click", (e) => {
    isAnswerCorrect("yes")
})

var noButton = document.getElementById("noButton");
noButton.addEventListener("keyup", (e) => {

    let pressedKey = String(e.key)
 
    if (pressedKey === "ArrowRight" || pressedKey === "Right") {
        isAnswerCorrect("no");
    }
})

noButton.addEventListener("click", (e) => {
    isAnswerCorrect("no");
})

function generateRandomWord(){
    //unicode characters for alphabet are between 65-90
    var letter = String.fromCharCode(Math.floor(Math.random() * 26)+65);
    var vowel = vowels[Math.floor(Math.random()*5)];
    var order = Math.random();
    if (order > .5){
        return vowel + letter;
    }
    else {
        return letter + vowel;
    }

    //we're not accounting for double consonant words - "HM", "MM", "SH"
 }

function isAnswerCorrect(answer){
    total.textContent = (Number(total.textContent) + 1).toString();
    var wordPrompt = this.getWordPrompt();
    var wordIndex = valid_words.indexOf(wordPrompt);

    if ((answer === "yes") && (wordIndex !== -1)){
        correctAudio.play();
        correctDiv.style.visibility = "visible";
        score.textContent = (Number(score.textContent) + 1).toString();
    }
    else if ((answer === "no") && (wordIndex === -1)){
        correctAudio.play();
        correctDiv.style.visibility = "visible";
        score.textContent = (Number(score.textContent) + 1).toString();
    }
    else {
        wrongAudio.play();
        wrongDiv.style.visibility = "visible";
    }
    
    setTimeout(function(){
        correctDiv.style.visibility= 'hidden';
        wrongDiv.style.visibility = 'hidden';
        this.setWordPrompt(generateRandomWord());
    },1500);
    
}


