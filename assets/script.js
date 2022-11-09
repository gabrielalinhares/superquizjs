var homeEl = document.querySelector("#home");
var startEl = document.querySelector("#start");
var cardQstnEl = document.querySelector("#questionCard");
var cardResultEl = document.querySelector("#resultCard");
var questionEl = document.querySelector("#question");
var AEl = document.querySelector("#A");
var BEl = document.querySelector("#B");
var CEl = document.querySelector("#C");
var DEl = document.querySelector("#D");
var resultEl = document.querySelector("#result");
var cardScoreEl = document.querySelector("#scoreCard");
var yourScoreEl = document.querySelector("#yourScore");
var timerEl = document.querySelector("#timer");
var nameEl = document.querySelector("#name");
var cardRankingEl = document.querySelector("#rankingCard");
var saveEl = document.querySelector("#save");
var ScoreBtnEl = document.querySelector("#ScoreBtn");
var orderedListEl = document.querySelector("#orderedList");
var returnBtnEl = document.querySelector("#returnBtn");
var clearScoresBtnEl = document.querySelector("#clearScoresBtn");
var headerEl = document.querySelector("header");

var questionIndex = 0;
var time = 75; // timer starting time
var scoresqstn = [];
if (localStorage.getItem("storageString")) {
  scoresqstn = JSON.parse(localStorage.getItem("storageString"));
}
var myInterval;

//Questions
var qstn = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["1.<javascript>", "2.<script>", "3.<alerts>", "4.<scripting>"],
    answer: "2.<script>",
  },
  {
    question: "How to write an IF statement in JavaScript?",
    choices: [
      "1.if i = 5 then",
      "2.if i == 5 then",
      "3.if i = 5",
      "4.if (i == 5)",
    ],
    answer: "4.if (i == 5)",
  },
  {
    question:
      "How to write an IF statement for executing some code if i is NOT equal to 5?",
    choices: [
      "1.if (i != 5)",
      "2.if (i <> 5)",
      "3.if i =! 5 then",
      "4.if i <> 5",
    ],
    answer: "1.if (i != 5)",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["1.onmouseclick", "2.onmouseover", "3.onchange", "4.onclick"],
    answer: "4.onclick",
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    choices: ["1.*", "2.-", "3.=", "4.x"],
    answer: "3.=",
  },
];

//Functions
function startFt() {
  homeEl.style.display = "none";
  cardQstnEl.style.display = "block";
  cardResultEl.style.display = "block";
  displayQuestion();
  myInterval = setInterval(updatetimer, 1000);
}

function stopTime() {
  clearInterval(myInterval);
}

function updatetimer() {
  time--;
  timerEl.textContent = "Time: " + time;
  if (time == 0) {
    clearInterval(updatetimer);
    stopclock();
    time == 0;
    displayScore();
  }
}

function stopclock() {
  window.alert("You are out of time");
}

function displayQuestion() {
  questionEl.textContent = qstn[questionIndex].question;
  AEl.textContent = qstn[questionIndex].choices[0];
  BEl.textContent = qstn[questionIndex].choices[1];
  CEl.textContent = qstn[questionIndex].choices[2];
  DEl.textContent = qstn[questionIndex].choices[3];
}

function displayScore() {
  homeEl.style.display = "none";
  cardQstnEl.style.display = "none";
  cardScoreEl.style.display = "block";
  cardResultEl.style.display = "block";
}

function saveFt() {
  nameEl.value;
  var userInfo = {
    Name: nameEl.value,
    Score: time,
  };
  scoresqstn.push(userInfo);
  localStorage.setItem("storageString", JSON.stringify(scoresqstn));
  rankingFt();
}

function rankingFt() {
  homeEl.style.display = "none";
  cardQstnEl.style.display = "none";
  cardScoreEl.style.display = "none";
  cardResultEl.style.display = "none";
  cardRankingEl.style.display = "block";
  headerEl.style.display = "none";

  var storageString = localStorage.getItem("storageString");
  var storageParse = JSON.parse(storageString);
  console.log(storageString);
  console.log(storageParse);

  for (var i = 0; i < scoresqstn.length; i++) {
    var listEl = document.createElement("li");
    listEl.textContent = storageParse[i].Name + " / " + storageParse[i].Score;
    orderedListEl.appendChild(listEl);
  }
}
function choiceFt(event) {
  if (questionIndex < qstn.length) {
    if (event.target.className == "choice") {
      if (event.target.textContent == qstn[questionIndex].answer) {
        resultEl.textContent = "Correct!";
        resultEl.setAttribute("style", "color: greenyellow");
      } else {
        resultEl.textContent = "Wrong!";
        resultEl.setAttribute("style", "color:red");
        time -= 10;
        timerEl.textContent = "Time: " + time;
      }
      questionIndex++;
      if (questionIndex == qstn.length) {
        stopTime();
        displayScore();
        yourScoreEl.textContent = "Your Score is: " + time;
      } else {
        displayQuestion();
      }
    }
  }
}

function goBackFt() {
  homeEl.style.display = "block";
  cardQstnEl.style.display = "none";
  cardScoreEl.style.display = "none";
  cardResultEl.style.display = "none";
  cardRankingEl.style.display = "none";
  headerEl.style.display = "flex";
  headerEl.style.justifyContent = "space-between";
  window.location.reload();
}

function clearScoresFt() {
  localStorage.setItem("storageString", "");
  window.location.reload();
}

//Event Listeners
startEl.addEventListener("click", startFt);
cardQstnEl.addEventListener("click", choiceFt);
saveEl.addEventListener("click", saveFt);
ScoreBtnEl.addEventListener("click", rankingFt);
returnBtnEl.addEventListener("click", goBackFt);
clearScoresBtnEl.addEventListener("click", clearScoresFt);
