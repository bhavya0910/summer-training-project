// selecting elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGuage = document.getElementById("timeGuage");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("score");
// create our questions
let questions = [
    {
        question: " which of the following tag is used to mark a begining of paragraph ?",
        qImg: "C:/Users/Bhavya Nayyer/Desktop/Multiple-Choice-Quiz-JavaScript-master/img/download.png",
        choiceA: "none",
        choiceB: "br",
        choiceC: "p",
        correct: "C",

    },

    {
        question: "If we want define style for an unique element, then which css selector will we use ?",
        qImg: "img/css.png",
        choiceA: "Id",
        choiceB: "text",
        choiceC: "class",
        correct: "A",

    },

    {
        question: "JavaScript is designed for following purpose -",
        qImg: "img/js.png",
        choiceA: "To Perform Server Side Scripting Opertion",
        choiceB: "To add interactivity to HTML Pages",
        choiceC: "To Style HTML Pages",
        correct: "B",

    }

];
// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count =0;
const questionTime = 10 ; //10s
const guageWidth = 150; //150px
const guageUnit = guageWidth/questionTime;
let TIMER;
let score =0;
// render a question
function renderQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = "</p>" + q.question + "</p>";
    qImg.innerHTML = "<img src= " + q.imgsrc + " >";
    choiceA.innerHTML = "<p>"+q.choiceA+"</p>";
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}
start.addEventListener("click",startQuiz);
// start quiz
function startQuiz()
{
start.style.display = "none";
renderQuestion();
quiz.style.display = "block";
renderProgress();
renderCounter();
TIMER = setInterval(renderCounter,1000);
}
// progress render
function renderProgress()
{
    for(let qIndex = 0; qIndex <= lastQuestion; qindex++)
    {
        progress.innerHTML += " <div class = 'prog' id=" + qIndex +"></div>";
    }
}
// counter render
 function renderCounter()
 {
     if(count<=questionTime)
     {
         counter.innerHTML = count;
         timeGuage.style.width = count* guageUnit + "px";
         count++;
     } else{
         answerIsWrong();
         count=0;
     }
     count= 0;
    if(runningQuestion<lastQuestion)
    {
        runningQuestion++;
        renderQuestion();

    }else{
        clearInterval(TIMER);
        scoreRender();
    }
 } 
 // check answer
function checkAnswer(answer)
{
    if(answer==questions[runningQuestion].correct)
    {
        //IF ANS IS CORRECT
        score++;
        // change the color of progress bar to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change the progress color to red
        answerIsWrong();
    }
    count= 0;
    if(runningQuestion<lastQuestion)
    {
        runningQuestion++;
        renderQuestion();

    }else{
       clearInterval(TIMER);
       scoreRender();
    }
}
// answer is correct
function answerIsCorrect()
{
    document.getElementById(runningQuestion).style.backgroundColor="0f0";
}
// answer is wrong
function answerIsWrong()
{
    document.getElementById(runningQuestion).style.backgroundColor="f00";  
}
// score render
function scoreRender()
{
    scoreDiv.style.display="block";
    // calculating the score
    const scorePercent= Math.round(100* score/questions.length);
    //choosing images
    let img = (scorePercent>=80)? "img/5.png":
    (scorePercent>=60)? "img/4.png":
    (scorePercent>=40)? "img/3.png":
    (scorePercent>=20)? "img/2.png": "img/1.png"
    scoreDiv.innerHTML="<img src="+ img+">";
    scoreDiv.innerHTML += "<p>"+ scorePercent +"%</p>";
              
}