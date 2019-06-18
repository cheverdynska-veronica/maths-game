//Define variables
var playing = false; //we don't play yet
var score;
var action;
var timeForCountDown;
var correctAnswer;
var correctPosition;


//Game
document.getElementById("start-reset").onclick = function() {//when we click on start-reset button
  //if we are playng
  if (playing == true) {
    location.reload(); //reload page
    
  }else{ //if we are not playing
    playing = true; //we are playing
    score = 0; //we set score to 0
    document.getElementById("score-value").innerHTML = score; //adding value of score
    show("time-countdown"); //show the box with time
    timeForCountDown = 60; //set value for time
    document.getElementById("time-countdown-value").innerHTML = timeForCountDown; //adding value of time
    hide("game-over"); //hide game over block
    document.getElementById("start-reset").innerHTML = "Reset Game"; //change value of start-reset button to reset
    
    //start counting down
    startCountDown();
    
    //generate a new question and variants of answers
    generateQA();
  }
}

//Cliicking on a box with a variant of answer

for(i=1; i<5; i++) {
  document.getElementById("variant" + i).onclick = function() {
    //are we playing?
    if(playing == true) {//we are playing
      if(this.innerHTML == correctAnswer) {//the answer is correct
        score++; //increase score by 1
        document.getElementById("score-value").innerHTML = score; //adding value of score
        hide("try-again-msg"); //hide try again message
        show("well-done-msg"); // show well done message
        setTimeout(function(){ //hide well done message after one second
          hide("well-done-msg");
        }, 1000);
        //Generate new question
        generateQA();
      }else{//the answer is wrong
        hide("well-done-msg"); // hide well done message
        show("try-again-msg"); //show try again message
        setTimeout(function(){ //hide try again message after one second
          hide("try-again-msg");
        }, 1000);
      }
    }
  }
}


//FUNCTIONS

//start counter
function startCountDown() {
  action = setInterval(function(){
    timeForCountDown -= 1;
    document.getElementById("time-countdown-value").innerHTML = timeForCountDown;
    //if there no more time left
    if(timeForCountDown == 0) {
      playing = false;
      stopCountDown();
      document.getElementById("start-reset").innerHTML = "Start Game"; //change value of start-reset button to start
      show("game-over");
      document.getElementById("game-over").innerHTML = "<p>Game over!</p><p>Your score is <span id=\"score-value\">"+ score +"</span>.</p>";
      hide("time-countdown");
      hide("well-done-msg");
      hide("try-again-msg");
    }
  }, 1000);
}

//stop counter
function stopCountDown() {
  clearInterval(action);
}

//hide and show an element by id
function hide(id) {
  document.getElementById(id).style.display = "none";
}
function show(id) {
  document.getElementById(id).style.display = "block";
}

//generate a question and answers
function generateQA() {
  var x = 1 + Math.round(9*Math.random());
  var y = 1 + Math.round(9*Math.random());
  correctAnswer = x*y;
  document.getElementById("question").innerHTML = x + "x" + y;
  correctPosition = 1 + Math.round(3*Math.random());
  document.getElementById("variant" + correctPosition).innerHTML = correctAnswer;//fill one box with the correct answer
  
  //fill other boxes with wrong answers
  var answers = [correctAnswer];

  for(i=1; i<5; i++) {
    if(i != correctPosition) {
      var wrongAnswer;
      do {
        wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));//a wrong answer
      }while(answers.indexOf(wrongAnswer)>-1)
      document.getElementById("variant" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}