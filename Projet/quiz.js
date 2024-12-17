document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
        {
            question: "What does HTML stand for?",
            answers: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language",
                "Hyper Tool Made Language"
            ],
            correct: 0
        },
        {
            question: "What does CSS stand for?",
            answers: [
                "Creative Style Sheets",
                "Colorful Style Sheets",
                "Cascading Style Sheets",
                "Computer Style Sheets"
            ],
            correct: 2
        },
        {
            question: "What does JS stand for?",
            answers: [
                "JavaStyle",
                "JavaScript",
                "JustScript",
                "JQuery Script"
            ],
            correct: 1
        },
        {
            question: "What does SQL stand for?",
            answers: [
                "Structured Query Language",
                "Stylish Query Language",
                "Simple Query Language",
                "Standard Query Language"
            ],
            correct: 0
        },
        {
            question: "What is the purpose of the `<head>` tag in HTML?",
            answers: [
                "To define the main content of the page",
                "To store metadata and links to stylesheets or scripts",
                "To define a header section",
                "To define a title only"
            ],
            correct: 1
        },
        {
            question: "Which of the following is used for styling web pages?",
            answers: [
                "HTML",
                "CSS",
                "JavaScript",
                "SQL"
            ],
            correct: 1
        },
        {
            question: "Which HTML tag is used to define an unordered list?",
            answers: [
                "<ul>",
                "<ol>",
                "<li>",
                "<list>"
            ],
            correct: 0
        },
        {
            question: "Which language is used for dynamic websites?",
            answers: [
                "HTML",
                "CSS",
                "JavaScript",
                "PHP"
            ],
            correct: 2
        },
        {
            question: "Which property is used to change the font size in CSS?",
            answers: [
                "font-size",
                "font-weight",
                "text-size",
                "size-font"
            ],
            correct: 0
        },
        {
            question: "Which of the following is not a valid HTML element?",
            answers: [
                "<div>",
                "<span>",
                "<p>",
                "<footer>"
            ],
            correct: 3
        },
        {
            question: "What is the correct HTML element for inserting a line break?",
            answers: [
                "<br>",
                "<break>",
                "<lb>",
                "<line>"
            ],
            correct: 0
        },
        {
            question: "How do you insert a comment in JavaScript?",
            answers: [
                "// This is a comment",
                "/* This is a comment */",
                "<-- This is a comment -->",
                ";; This is a comment"
            ],
            correct: 0
        },
        {
            question: "Which of the following is used for database management?",
            answers: [
                "HTML",
                "CSS",
                "SQL",
                "JavaScript"
            ],
            correct: 2
        }
    ];

    const questionEl = document.getElementById("question-text");
    const answersEl = document.getElementsByClassName("answers")[0];
    const progressBarEl = document.getElementById("progress-bar");
    const feedbackEl = document.getElementById("feedback");
    const resultEl = document.getElementById("result");
    const restartBtn = document.getElementById("restart");
    const questionNumberEl = document.getElementById("current-question");
    const totalQuestionsEl = document.getElementById("total-questions");
    const timeLeftEl = document.getElementById("time-left");  

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    const timeLimit = 30;

    function loadQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;
        questionNumberEl.textContent = currentQuestionIndex + 1;
        totalQuestionsEl.textContent = quizData.length;

        answersEl.innerHTML = "";

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.addEventListener("click", () => checkAnswer(index));
            answersEl.appendChild(button);
        });

        const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
        progressBarEl.style.width = `${progress}%`;

        startTimer();
    }

    function startTimer() {
        let timeLeft = timeLimit;
        timeLeftEl.textContent = timeLeft;  

        if (timer) {
            clearInterval(timer);
        }

        timer = setInterval(() => {
            timeLeft--;
            timeLeftEl.textContent = timeLeft;  

            if (timeLeft <= 0) {
                clearInterval(timer);
                feedbackEl.textContent = "Time's up!";
                feedbackEl.style.color = "red";
                feedbackEl.style.display = "block";
                setTimeout(() => {
                    feedbackEl.style.display = "none";
                    currentQuestionIndex++;
                    if (currentQuestionIndex < quizData.length) {
                        loadQuestion();
                    } else {
                        showResult();
                    }
                }, 1000);
            }
        }, 1000);
    }

    function checkAnswer(selectedIndex) {
        const currentQuestion = quizData[currentQuestionIndex];

        clearInterval(timer);

        if (selectedIndex === currentQuestion.correct) {
            feedbackEl.textContent = "Correct!";
            feedbackEl.style.color = "green";
            score++;
        } else {
            feedbackEl.textContent = "Wrong!";
            feedbackEl.style.color = "red";
        }

        feedbackEl.style.display = "block";

        setTimeout(() => {
            feedbackEl.style.display = "none";
            currentQuestionIndex++;

            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }, 1000);
    }

    function showResult() {
        questionEl.style.display = "none";
        answersEl.style.display = "none";
        resultEl.style.display = "block";

        resultEl.innerHTML = `
            <p>Your Score: ${score}/${quizData.length}</p>
            <p>You answered correctly to ${score} question(s).</p>
        `;
        restartBtn.style.display = "inline-block";
    }

    restartBtn.addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        questionEl.style.display = "block";
        answersEl.style.display = "flex";
        resultEl.style.display = "none";
        restartBtn.style.display = "none";
        loadQuestion();
    });

    loadQuestion();
});
