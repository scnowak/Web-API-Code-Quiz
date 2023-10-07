var timeSpan = document.getElementById("time-left");
var startButton = document.getElementById("start-btn");
var mainContainer = document.getElementById("section-1");
var questionContainer = document.getElementById("section-2");
var initialsContainer = document.getElementById("section-3");
var questionEl = document.querySelector(".questions");
var choicesContainer = document.querySelector(".choices");
var initButton = document.getElementById("btn");
var initInput = document.getElementById("initials");

//var timeLeft = questions.length * 10;
var timeLeft = 60;
var currIndex = 0;

function displayTime() {
    timeSpan.textContent = "Time: " + timeLeft

}

function displayTimer () {
    var timeInterval = setInterval(function () {

        displayTime();
        timeLeft--;
        if (timeLeft <= 0) {
            timeSpan.textContent = "Time: 00" 
            clearInterval(timeInterval);
            quizEnd();
        }
    }, 1000);
};

function displayQuestion(){
 var currentQuestion = questions[currIndex];

 mainContainer.textContent = currentQuestion.question;

 choicesContainer.innerHTML = '';

 for (var i = 0; i < currentQuestion.choices.length; i++){
    var choice = currentQuestion.choices[i];
    var choiceBtn =  document.createElement('button');
    choiceBtn.setAttribute('class', 'choice');
    choiceBtn.setAttribute('value', choice);

    choiceBtn.textContent = i + 1 + '.' + choice;

    choiceBtn.addEventListener('click', responseToClick);

    choicesContainer.appendChild(choiceBtn);

 }
}

function responseToClick(event){
    var btnEl = event.target;
    // Safe gaurd for clicking screen and not  starting function
    if (!btnEl.matches('.choice')){
        return;
    }
    // make if statement for wrong answer choosen and else statement for correct answer
    if (btnEl.value !== questions[currIndex].answer){
        // take off time from timer
        timeLeft -= 5;
        // this is just to insure that negative time is not displayed
        if (timeLeft < 0){
            timeLeft = 0;
        }
        // display new time
        timeSpan.textContent = timeLeft;

        // make and element for a feedback that say Wrong!
    } else { // this else statement is for the correct answer
       
        currIndex++
        displayQuestion();

        // "resultEl" utilize the same element to display Correct!
    }

    // check to see if you've ran out of questions and/or time && || 


}



// function displayQuestion () {
//     choicesContainer.innerHTML = "";
//     mainContainer.style.display = "none";
//     questionContainer.style.display = "block";
//     var question = questions[currIndex].question;
//     var options = questions[currIndex].choices;
//     questionEl.textContent = question;
//     for (let i = 0; i < options[currIndex].length; i++) {
//         var btn = document.createElement("button");
//         btn.setAttribute("class", "choices-btn");
//         btn.textContent = options[i];
//         btn.onclick = displayChoices;

//         choicesContainer.appendChild(btn);
//     }
// }

// function displayChoices (event) {
//     console.log(event.target.textContent);
//     currIndex++;
//     displayQuestion();
// }

startButton.addEventListener("click", function () {
    displayTimer();
    displayQuestion();
})

function quizEnd(){
    clearInterval(timeLeft);
    questionContainer.setAttribute('class', 'hide');
    mainContainer.setAttribute('class', 'hide');
    initialsContainer.style.display='block';

}

initButton.addEventListener('click', function(event){
 event.preventDefault();
 var initialsValue = initInput.value;
 console.log(initialsValue);
})




