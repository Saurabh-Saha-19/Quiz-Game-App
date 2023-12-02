const questions = [
  {
    question: "Which is the largest animal in the world ?",
    options: ["Shark", "Whale", "Elephant", "Giraffe"],
    correctAns: "Whale",
  },

  {
    question: "Who is the richest person of India ?",
    options: ["Mukesh Ambani", "Ratan Tata", "Ms. Dhoni", "Vijay Malya"],
    correctAns: "Mukesh Ambani",
  },

  {
    question: "Who is the first one to land on the moon ?",
    options: [
      "Mukesh Sharma",
      "Jeff Bezos",
      "Neil Armstrong",
      "Sunita Billiams",
    ],
    correctAns: "Neil Armstrong",
  },
];

const questionEle = document.getElementById("question");
const optionsEle = document.getElementById("answer-btns");
const scoreEle = document.getElementById("score");
const skipButton = document.getElementsByClassName("skipbtn")[0];
const restartButton = document.getElementsByClassName("restartbtn")[0];
const quizBodyEle = document.getElementById("quiz-body");
const skipRestart = document.getElementById("skip-restart");
const scoreDivEle = document.getElementById("score-div");

let currQuesIndex = 0;
let score = 0;
let timeOut;

function displayQuestion() {
  optionsEle.textContent = "";
  //skipButton.style.display = "block";
  const { question, options, correctAns } = questions[currQuesIndex];
  questionEle.textContent = question;
  options.forEach((option) => {
    const optionEle = document.createElement("button");
    optionEle.classList.add("btn");
    optionEle.textContent = option;
    optionsEle.appendChild(optionEle);

    const attribute = document.createAttribute("data-correct");
    if (option == correctAns) {
      attribute.value = "true";
    } else {
      attribute.value = "false";
    }

    optionEle.setAttributeNode(attribute);

    optionEle.addEventListener("click", (event) => {
      checkAns(event);
    });
  });
}

function disableOptions() {
  const options = Array.from(optionsEle.children);
  options.forEach((option) => {
    option.disabled = true;
  });
}

function checkAns(event) {
  disableOptions();
  const selectedOpt = event.target;
  //console.log(selectedOpt);
  if (selectedOpt.dataset.correct === "true") {
    selectedOpt.classList.add("correct");
    score++;
  } else {
    selectedOpt.classList.add("wrong");
    showAns();
    score = score - 0.75;
  }
  scoreEle.textContent = `Score : ${score}`;

  timeOut = setTimeout(() => {
    resetButtonsState();
    nextQuesDisplay();
  }, 2000);
}

function showAns() {
  const options = Array.from(optionsEle.children);
  options.forEach((option) => {
    if (option.dataset.correct === "true") {
      option.classList.add("correct");
    }
  });
}

function nextQuesDisplay() {
  currQuesIndex++;
  if (currQuesIndex >= questions.length) {
    currQuesIndex = 0;
    endgame();
  }

  displayQuestion();
}

function resetButtonsState() {
  const options = Array.from(optionsEle.children);
  options.forEach((option) => {
    if (option.classList.contains("correct")) {
      option.classList.remove("correct");
    }
    if (option.classList.contains("wrong")) {
      option.classList.remove("wrong");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayQuestion();
});

skipButton.addEventListener("click", () => {
  skipQues();
});

restartButton.addEventListener("click", () => {
  restartQuiz();
});

function skipQues() {
  clearTimeout(timeOut);
  nextQuesDisplay();
}

function restartQuiz() {
  clearTimeout(timeOut);
  score = 0;
  currQuesIndex = 0;
  scoreEle.textContent = ``;
  quizBodyEle.style.display = "block";
  scoreDivEle.textContent = "";
  displayQuestion();
  skipButton.style.display = "block";
}

function endgame() {
  skipButton.style.display = "None";
  quizBodyEle.style.display = "None";
  const h1Ele = document.createElement("h1");
  h1Ele.textContent = `Quiz Completed !!!`;

  const scoreEle = document.createElement("p");
  scoreEle.textContent = `Your Final Score : ${score}`;
  scoreEle.classList.add("final-score");
  scoreDivEle.appendChild(h1Ele);
  scoreDivEle.appendChild(scoreEle);
  //scoreEle.textContent = `Score : ${score}`;
}
