document.addEventListener("DOMContentLoaded", () => {
    const questions = [
      {
        question: "Is an International Driving Permit (IDP), alongside a Singapore driver's license, required to drive in Japan?",
        options: ["Yes", "No"],
        correctAnswer: 0,
        image: "assets/img/quiz_01.png",
        explanation: "Yes, you need to apply for an IDP beforehand in order to be able to drive in Japan."
      },
      {
        question: "On which side of the road do vehicles drive in Japan Tokyo?",
        options: ["Left-hand side", "Right-hand side"],
        correctAnswer: 0,
        image: "assets/img/quiz_02.png",
        explanation: "Vehicles drive on the left-hand side of the road in Japan."
      },
      // Add the rest of the questions here...
    ];
  
    const quizContainer = document.getElementById("quiz-container");
    const finalResult = document.getElementById("final-result");
    const currentQuestionElem = document.getElementById("current-question");
    const totalQuestionsElem = document.getElementById("total-questions");
    const quizQuestionElem = document.getElementById("quiz-question");
    const quizOptionsElem = document.getElementById("quiz-options");
    const quizImageElem = document.getElementById("quiz-image");
    const resultMessageElem = document.getElementById("result-message");
    const nextButton = document.getElementById("next-button");
    const finalScoreElem = document.getElementById("final-score");
    const resultTextElem = document.getElementById("result-text");
    const retryButton = document.getElementById("retry-button");
  
    let currentQuestionIndex = 0;
    let score = 0;
  
    const loadQuestion = (index) => {
      const question = questions[index];
      currentQuestionElem.textContent = index + 1;
      totalQuestionsElem.textContent = questions.length;
      quizQuestionElem.textContent = question.question;
      quizImageElem.src = question.image;
      quizOptionsElem.innerHTML = "";
      question.options.forEach((option, idx) => {
        const optionElem = document.createElement("li");
        optionElem.innerHTML = `<button class="option-btn" data-index="${idx}">${option}</button>`;
        quizOptionsElem.appendChild(optionElem);
      });
      resultMessageElem.textContent = "";
    };
  
    const showResult = () => {
      quizContainer.style.display = "none";
      finalResult.style.display = "block";
      finalScoreElem.textContent = `You got ${score}/${questions.length}`;
      resultTextElem.textContent = score === questions.length
        ? "Congratulations! You got a perfect score."
        : "Please try again to improve your score.";
    };
  
    quizOptionsElem.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        const selectedIndex = parseInt(event.target.getAttribute("data-index"));
        const question = questions[currentQuestionIndex];
        if (selectedIndex === question.correctAnswer) {
          score++;
          resultMessageElem.textContent = `Correct! ${question.explanation}`;
        } else {
          resultMessageElem.textContent = "Sorry, please try again!";
        }
      }
    });
  
    nextButton.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
      } else {
        showResult();
      }
    });
  
    retryButton.addEventListener("click", () => {
      currentQuestionIndex = 0;
      score = 0;
      quizContainer.style.display = "block";
      finalResult.style.display = "none";
      loadQuestion(currentQuestionIndex);
    });
  
    // Initialize the quiz
    loadQuestion(currentQuestionIndex);
  });
  