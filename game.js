var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var t;
var c=5;

$(document).keydown(function(){
  if(!started){
    started=true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [];
  level=level+1;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  timedCount();
  function timedCount() {
    $(".timer").text("Timer: "+c);
    c=c-1;
    t = setTimeout(timedCount, 1000);
  }
  ti=setTimeout(function(){
    if(gamePattern.length!==userClickedPattern){
        $("h1").text("Time up.Press any key to restart");
        clearTimeout(t);
        startOver();
    }
  },6000);
}

$(".btn").click(function(event){
  var userChosenColor = this.id;//or: event.target.id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userClickedPattern.length-1);
});
console.log(userClickedPattern);

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      clearTimeout(t);
      clearTimeout(ti);
      c=5;
    setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else {
      clearTimeout(t);
      clearTimeout(ti);
      c=5;
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over");},200);
      $("h1").text("Game over. Press any key to restart");
      startOver();
    }
}

function startOver(){
  level = 0;
  gamePattern=[];
  started=false;
}

function playSound(name){
  var sound=new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed");},100);
}
