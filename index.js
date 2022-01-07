// globals that will be altered

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; //This is to track what the user OUGHT to do

var userClickedPattern = []; //This is to track what the user ACTUALLY does

var level = -1;

function nextSequence() {
  level++;
  userClickedPattern = [];
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log($("#"+randomChosenColour));
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  // level++;
}

//What happens when you click a button
$(".btn").click(function() {
  // this.id works out here because of '$(".btn")'. this would
  //normally refer to the window (default). However since you are calling
  // a method on something, this now refers to that something
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});


// function to check user input vs expected input
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 850);
    }
  } else {
    // console.log("failure");
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}


//This is the function to play a sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function to animate button presses
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


//Code to start the game
$(document).keydown(function(){
  if (level === -1) {nextSequence();}
});

//function to start over the gamePattern
function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = -1;
}
