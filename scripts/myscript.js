var questions=[{
    question:"The var and function are known as?",
    choices:["Data types","Keywords","Prototypes","Declaration statements"],
    correctAnswer:3
},{
    question:"Which of these is known as the Equality operator used for checking whether both the values are equal?",
    choices:["=","==","===","&&"],
    correctAnswer:1
},{
    question:"Which of these symbols is used to create comments in JavaScript?",
    choices:["//","\\","/*/*","#"],
    correctAnswer:0
},
{
    question:"Which of the following can be used to call a JavaScript Code Snippet?",
    choices:["Function/Method","Preprocessor","Triggering Event","RMI"],
    correctAnswer:0
},{
    question:"Which of the following is not a framework?",
    choices:["JavaScript .NET","jQuery","Cocoa JS","JavaScript"],
    correctAnswer:3
},
{
    question:"Which of the following is the property that is triggered in response to JS errors?",
    choices:["onclick","onmessage","onerror","onexception"],
    correctAnswer:2
},{
    question:"Which of the following is a correct syntax to display “Hello World” in an alert box using JavaScript?",
    choices:["alertBox('Hello World');","alert('Hello World');","msgAlert('Hello World');","displayAlert('Hello World');"],
    correctAnswer:1
},{
    question:"What is the purpose of JavaScript in web development?",
    choices:["To structure web pages","To style web pages","To add interactivity and dynamic content to web pages","To store data on the server"],
    correctAnswer:2
},{
    question:"Which keyword is used for declaring a variable in JavaScript that can be reassigned?",
    choices:["const","var","let","static"],
    correctAnswer:2
},{
    question:"Which symbol is used separate JavaScript statements?",
    choices:["Comma (,)","Colon (:)","Hyphen (_)","Semicolon (;)"],
    correctAnswer:3
}];
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // alert(numChoices);
    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}