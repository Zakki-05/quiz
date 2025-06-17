document.addEventListener('DOMContentLoaded', function () {
  // Quiz questions and answers
  const quizData = [
    {
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Personal Unit",
        "Central Process Unit",
        "Central Programming Unit"
      ],
      correct: 0
    },
    {
      question: "Which of these is not a programming language?",
      options: [
        "Python",
        "Java",
        "HTML",
        "C++"
      ],
      correct: 2
    },
    {
      question: "What is the main function of RAM in a computer?",
      options: [
        "Permanent storage of data",
        "Processing graphics",
        "Temporary storage for quick access",
        "Managing network connections"
      ],
      correct: 2
    },
    {
      question: "Which protocol is used to send email?",
      options: [
        "HTTP",
        "FTP",
        "SMTP",
        "SSH"
      ],
      correct: 2
    },
    {
      question: "What does 'www' stand for in a website URL?",
      options: [
        "World Wide Web",
        "Web World Wide",
        "Wide Web World",
        "World Web Wide"
      ],
      correct: 0
    },
    {
      question: "Which of these is an operating system?",
      options: [
        "Microsoft Word",
        "Adobe Photoshop",
        "Linux",
        "Google Chrome"
      ],
      correct: 2
    },
    {
      question: "What is the binary equivalent of the decimal number 10?",
      options: [
        "1010",
        "1001",
        "1100",
        "1111"
      ],
      correct: 0
    },
    {
      question: "Which company developed JavaScript?",
      options: [
        "Microsoft",
        "Netscape",
        "Google",
        "Apple"
      ],
      correct: 1
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Markup Language",
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language"
      ],
      correct: 0
    },
    {
      question: "Which of these is a relational database management system?",
      options: [
        "MongoDB",
        "MySQL",
        "Redis",
        "Elasticsearch"
      ],
      correct: 1
    }
  ];

  // DOM elements
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const questionElement = document.getElementById('question');
  const optionElements = [
    document.getElementById('option1'),
    document.getElementById('option2'),
    document.getElementById('option3'),
    document.getElementById('option4')
  ];
  const currentQuestionElement = document.getElementById('current-question');
  const totalQuestionsElement = document.getElementById('total-questions');
  const nextButton = document.getElementById('next-btn');
  const restartButton = document.getElementById('restart-btn');
  const scoreElement = document.getElementById('score');

  // Create feedback element
  const feedbackElement = document.createElement('div');
  feedbackElement.id = 'feedback';
  feedbackElement.style.marginTop = '10px';
  feedbackElement.style.minHeight = '20px';
  quizContainer.insertBefore(feedbackElement, nextButton);

  // Quiz variables
  let currentQuestion = 0;
  let score = 0;
  let selectedOption = null;
  let answerChecked = false;

  // Initialize the quiz
  function initQuiz() {
    totalQuestionsElement.textContent = quizData.length;
    showQuestion();
  }

  // Display the current question and options
  function showQuestion() {
    const questionData = quizData[currentQuestion];
    questionElement.textContent = questionData.question;

    optionElements.forEach((option, index) => {
      option.textContent = questionData.options[index];
      // Reset any previous highlighting
      option.parentElement.style.backgroundColor = '';
      option.parentElement.style.color = '';
      // Re-enable radio buttons
      option.previousElementSibling.disabled = false;
    });

    currentQuestionElement.textContent = currentQuestion + 1;

    // Clear previous selection and feedback
    document.querySelectorAll('input[name="option"]').forEach(radio => {
      radio.checked = false;
    });
    feedbackElement.textContent = '';
    feedbackElement.style.color = '';

    selectedOption = null;
    answerChecked = false;
    nextButton.disabled = true;
    nextButton.textContent = 'Submit Answer';
  }

  // Check the selected answer and provide feedback
  function checkAnswer() {
    if (selectedOption === null) return false;
    
    const questionData = quizData[currentQuestion];
    const isCorrect = selectedOption === questionData.correct;
    
    // Disable all radio buttons after answer is submitted
    document.querySelectorAll('input[name="option"]').forEach(radio => {
      radio.disabled = true;
    });

    if (!isCorrect) {
      // Highlight the correct answer in green
      optionElements[questionData.correct].parentElement.style.backgroundColor = '#4CAF50';
      optionElements[questionData.correct].parentElement.style.color = 'white';
      
      // Highlight the selected (wrong) answer in red
      optionElements[selectedOption].parentElement.style.backgroundColor = '#f44336';
      optionElements[selectedOption].parentElement.style.color = 'white';
      
      feedbackElement.textContent = `Incorrect! The correct answer is: ${questionData.options[questionData.correct]}`;
      feedbackElement.style.color = '#f44336';
    } else {
      // Highlight correct answer in green
      optionElements[selectedOption].parentElement.style.backgroundColor = '#4CAF50';
      optionElements[selectedOption].parentElement.style.color = 'white';
      feedbackElement.textContent = 'Correct!';
      feedbackElement.style.color = '#4CAF50';
      score++;
    }
    
    answerChecked = true;
    nextButton.textContent = currentQuestion < quizData.length - 1 ? 'Next Question' : 'View Results';
    return isCorrect;
  }

  // Event listeners for option selection
  document.querySelectorAll('input[name="option"]').forEach((radio, index) => {
    radio.addEventListener('change', () => {
      selectedOption = index;
      nextButton.disabled = false;
    });
  });

  // Next/Submit button click handler
  nextButton.addEventListener('click', () => {
    if (!answerChecked) {
      checkAnswer();
    } else {
      currentQuestion++;
      
      if (currentQuestion < quizData.length) {
        showQuestion();
      } else {
        showResult();
      }
    }
  });

  // Show the final result
  function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.textContent = `Your score: ${score} out of ${quizData.length}`;
  }

  // Restart button click handler
  restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    showQuestion();
  });

  // Start the quiz
  initQuiz();
});