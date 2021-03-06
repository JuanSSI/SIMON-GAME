
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var usedClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  usedClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(usedClickedPattern.length-1);

  // console.log(usedClickedPattern);
});

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === usedClickedPattern[currentLevel]){

    console.log("succes");

    if (usedClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence(),1000;});
      }

  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
     $("body").removeClass("game-over");
   }, 200);

   $("#level-title").text("Game Over, press any key to restore.");

   startOver();

  }

}


function nextSequence() {

  usedClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);

  playSound(randomChosenColour);
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){

   $("#" + currentColour).addClass("pressed");

   setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){

  gamePattern = [];

  started = false;

  level = 0;


}


// if
