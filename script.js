const quizData = [
    {
        question: "HTML document can contain ?",
        a: "Attributes",
        b: "Tags",
        c: "Plain text",
        d: "All of these",
        correct: "d"
    },
    {
        question: "Who is the primary author of HTML?",
        a: "Brendan Eich",
        b: "Tim Berners-Lee",
        c: "Web Programmer",
        d: "Google Inc",
        correct: "b"
    },
    {
        question: "HTML document is saved using _______ extension.",
        a: ".htl",
        b: ".html",
        c: ".hml",
        d: ".htnl",
        correct: "b"
    },
    {
        question: "What does the abbreviation HTML stand for?",
        a: "HyperText Markup Language",
        b: "HighText Markup Language",
        c: "HyperText Markdown Language",
        d: "None of the above",
        correct: "a"
    },
    {
        question: "How many sizes of header are available in HTML by default?",
        a: "5",
        b: "1",
        c: "3",
        d: "6",
        correct: "d"
    },
    {
        question: "How many types of CSS?",
        a: "1",
        b: "2",
        c: "3",
        d: "4",
        correct: "c"
    },
    {
        question: "Which CSS property is used to set the size of HTML text?",
        a: "size",
        b: "fonts-size",
        c: "font-size",
        d: "None",
        correct: "c"
    },
    {
        question: "CSS describe the_______",
        a: "Structure of webpage",
        b: "Skeleton of webpage",
        c: "Layout of webpage",
        d: "All of these",
        correct: "c"
    },
    {
        question: "Inline CSS is written in the________",
        a: "CSS file",
        b: "In the head tag",
        c: "In the link tag",
        d: "In the opening tag",
        correct: "d"
    },
    {
        question: "What is GIT?",
        a: "Text Editor",
        b: "Complier",
        c: "Version Control System",
        d: "Operating System",
        correct: "c"
    },
    {
        question: "How do you commit the staged changes?",
        a: "git save",
        b: "git update",
        c: "git commit",
        d: "git store",
        correct: "c"
    },
    {
        question: "Javascript is an___________ language?",
        a: "Object-Oriented",
        b: "Object-Based",
        c: "Procedural",
        d: "All of these",
        correct: "a"
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        a: "getElementbyId()",
        b: "getElementbyClassName()",
        c: "Both A and B",
        d: "None of the above",
        correct: "c"
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        a: "document.write()",
        b: "console.log()",
        c: "window.alert()",
        d: "All of the above",
        correct: "d"
    },
    {
        question: "What keyword is used to check whether a given property is valid or not?",
        a: "in",
        b: "is in",
        c: "exists",
        d: "lies",
        correct: "a"
    }
];

const userSelected = {}

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const labelEls = document.querySelectorAll('.op_label');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const submitBtn = document.getElementById('submit');
const reloadBtn = document.getElementById('reload');
const scoreEle = document.getElementById('score');
const resultEle = document.getElementById('result');
let currentQtn = 0;
let score = 0;
let submitted = false;

loadQtn();

function loadQtn() {
    const currentQtnData = quizData[currentQtn];
    questionEl.innerText = currentQtnData.question;
    a_text.innerText = currentQtnData.a;
    b_text.innerText = currentQtnData.b;
    c_text.innerText = currentQtnData.c;
    d_text.innerText = currentQtnData.d;
    if (submitted) {
        let actualAns = currentQtnData.correct;
        let userAns = userSelected[currentQtn];
        labelEls.forEach(labelEl => {
            labelEl.classList.remove("correct");
            labelEl.classList.remove("wrong");


        });
        if (actualAns == userAns) {
            let correct = actualAns + "_text";
            document.getElementById(correct).classList.add("correct")

        }
        else {
            let correct = actualAns + "_text";
            let wrong = userAns + "_text";

            document.getElementById(correct).classList.add("correct")

            document.getElementById(wrong).classList.add("wrong")

        }
    }
    else {
        deselectAnswer();
    }
    if (currentQtn == quizData.length - 1) {
        nextBtn.style.display = "none";
        if (submitted) {
            reloadBtn.style.display = "block";
            submitBtn.style.display = "none";
        }
        else {
            reloadBtn.style.display = "none";
            submitBtn.style.display = "block";


        }
    }
    if (userSelected[currentQtn]) {
        let selected = userSelected[currentQtn];
        document.getElementById(selected).checked = true
    }

}

function deselectAnswer() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
            userSelected[currentQtn] = answer

        }
    });

    return answer;
}
prevBtn.addEventListener('click', () => {
    getSelected()
    if (currentQtn > 0) {
        currentQtn--;
        if (currentQtn == 0) {
            prevBtn.disabled = true;
            prevBtn.classList.add('disabled')
        }
        loadQtn();
    }


})

nextBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (!submitted) {
        if (answer) {
            if (answer === quizData[currentQtn].correct) {
                score++;
            }
            currentQtn++;
            if (currentQtn < quizData.length) {
                loadQtn();
                prevBtn.disabled = false;
                prevBtn.classList.remove('disabled')
            }
        }
    }
    else {
        currentQtn++;
        loadQtn()
    }
})
submitBtn.addEventListener('click', () => {
    if (getSelected()) {
        submitted = true
        quiz.style.display = "none";
        resultEle.style.display = "block";
        scoreEle.innerHTML = `${score}/${quizData.length} questions answered correctly.`


    }


})

function loadAnswers() {
    currentQtn = 0
    quiz.style.display = "block";
    resultEle.style.display = "none";
    answerEls.forEach(answerEl => {
        answerEl.disabled = true;

    });
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
    loadQtn();

}