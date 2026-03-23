const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers-container');
const scoreElement = document.getElementById('score');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const progressBar = document.getElementById('progress');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'London', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false }
    ]
  },
  {
    question: 'Which planet is closest to the Sun?',
    answers: [
      { text: 'Venus', correct: false },
      { text: 'Mercury', correct: true },
      { text: 'Earth', correct: false },
      { text: 'Mars', correct: false }
    ]
  },
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '3', correct: false },
      { text: '4', correct: true },
      { text: '5', correct: false },
      { text: '6', correct: false }
    ]
  },
  {
    question: 'Who wrote Romeo and Juliet?',
    answers: [
      { text: 'Jane Austen', correct: false },
      { text: 'William Shakespeare', correct: true },
      { text: 'Mark Twain', correct: false },
      { text: 'Charles Dickens', correct: false }
    ]
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true },
      { text: 'Arctic Ocean', correct: false }
    ]
  }
];

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', startQuiz);

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  startScreen.classList.remove('active');
  resultsScreen.classList.remove('active');
  quizScreen.classList.add('active');
  scoreElement.innerText = score;
  totalQuestionsSpan.innerText = questions.length;
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestionSpan.innerText = currentQuestionIndex + 1;
  
  // Update progress bar
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn'); 
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answersContainer.appendChild(button);
  });
}

function resetState() {
  while (answersContainer.firstChild) {
    answersContainer.removeChild(answersContainer.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  
  if(isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
    scoreElement.innerText = score;
  } else {
    selectedBtn.classList.add('wrong');
  }

  // Disable all buttons and highlight the correct one
  Array.from(answersContainer.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  
  // Wait 1 second before next question
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove('active');
  resultsScreen.classList.add('active');
  finalScoreSpan.innerText = score;
  maxScoreSpan.innerText = questions.length;
  
  if(score === questions.length){
      resultMessage.innerText = "Perfect Score!";
  } else if (score > questions.length / 2) {
      resultMessage.innerText = "Good job!";
  } else {
      resultMessage.innerText = "Keep practicing!";
  }
}