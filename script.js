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

let currQuesIndex = 0;
let score = 0;
function displayQuestion() {
  optionsEle.textContent = "";
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

function checkAns(event) {
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

  setTimeout(() => {
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
    score = 0;
    endgame(); // to be declared
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

function endgame() {
  scoreEle.textContent = `Score : ${score}`;
}
