// Quiz Data
const questions = [
  {
    question: "What is the full form of PDF?",
    option1: "Portable Document Format",
    option2: "Personal Data File",
    option3: "Printable Document Form",
    option4: "Public Document Folder",
    correctAnswer: "option1"
  },
  {
    question: "Which software is used for creating spreadsheets?",
    option1: "Microsoft Word",
    option2: "Microsoft Excel",
    option3: "Microsoft PowerPoint",
    option4: "Microsoft Access",
    correctAnswer: "option2"
  },
  {
    question: "What is the default file extension of a Microsoft Word document (2007 and later)?",
    option1: ".txt",
    option2: ".doc",
    option3: ".docx",
    option4: ".word",
    correctAnswer: "option3"
  },
  {
    question: "Which of the following is an example of an operating system?",
    option1: "Google Chrome",
    option2: "Microsoft Excel",
    option3: "Windows 11",
    option4: "Adobe Photoshop",
    correctAnswer: "option3"
  },
  {
    question: "What does 'URL' stand for?",
    option1: "Uniform Resource Locator",
    option2: "Universal Reference Link",
    option3: "Unified Resource Library",
    option4: "Unique Retrieval Locator",
    correctAnswer: "option1"
  },
  {
    question: "Which key combination is used to copy text in most applications?",
    option1: "Ctrl + X",
    option2: "Ctrl + C",
    option3: "Ctrl + V",
    option4: "Ctrl + Z",
    correctAnswer: "option2"
  },
  {
    question: "Which of the following is NOT a web browser?",
    option1: "Mozilla Firefox",
    option2: "Google Chrome",
    option3: "Microsoft Edge",
    option4: "Microsoft Word",
    correctAnswer: "option4"
  },
  {
    question: "What is the function of the 'Ctrl + Z' shortcut?",
    option1: "Redo an action",
    option2: "Undo an action",
    option3: "Paste text",
    option4: "Save a file",
    correctAnswer: "option2"
  },
  {
    question: "Which software is used for creating presentations?",
    option1: "Microsoft Excel",
    option2: "Microsoft PowerPoint",
    option3: "Microsoft Word",
    option4: "Microsoft Access",
    correctAnswer: "option2"
  },
  {
    question: "What does 'CPU' stand for?",
    option1: "Central Processing Unit",
    option2: "Computer Processing Unit",
    option3: "Central Power Unit",
    option4: "Control Processing Unit",
    correctAnswer: "option1"
  }
];

// DOM Elements
const quizElement = document.getElementById('quiz');
const resultElement = document.getElementById('result');
const questionElement = document.getElementById('question');
const optionElements = [
  document.getElementById('option1'),
  document.getElementById('option2'),
  document.getElementById('option3'),
  document.getElementById('option4')
];
const optionInputs = document.querySelectorAll('input[name="option"]');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;

// Initialize Quiz
function initQuiz() {
  totalQuestionsElement.textContent = totalQuestions;
  loadQuestion();
}

// Load Question
function loadQuestion() {
  if (currentQuestionIndex >= totalQuestions) {
    showResult();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  currentQuestionElement.textContent = currentQuestionIndex + 1;
  
  questionElement.textContent = currentQuestion.question;
  
  optionElements.forEach((element, index) => {
    element.textContent = currentQuestion[`option${index + 1}`];
  });

  // Clear selection
  optionInputs.forEach(input => {
    input.checked = false;
  });
}

// Check Answer and Move to Next Question
function nextQuestion() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  
  if (!selectedOption) {
    alert('Please select an answer!');
    return;
  }
  
  // Check if answer is correct
  if (selectedOption.value === questions[currentQuestionIndex].correctAnswer) {
    score++;
  }
  
  currentQuestionIndex++;
  
  if (currentQuestionIndex < totalQuestions) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Show Final Result
function showResult() {
  quizElement.style.display = 'none';
  resultElement.style.display = 'block';
  scoreElement.textContent = `Your score: ${score} out of ${totalQuestions}`;
}

// Restart Quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizElement.style.display = 'block';
  resultElement.style.display = 'none';
  loadQuestion();
}

// Event Listeners
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (resultElement.style.display === 'block') {
      restartQuiz();
    } else {
      nextQuestion();
    }
  }
});

// Initialize the quiz when the page loads
window.onload = initQuiz;