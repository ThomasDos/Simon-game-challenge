const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = -1;
let restarter = true;
let counterClick = -1;
let Highscore = 0;

function nextSequence() {
  level++;
  counterClick = -1;
  let randomNumber = Math.floor(Math.random() * 4);

  gamePattern.push(buttonColours[randomNumber]);

  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(makeSound, 600 * (i + 1), gamePattern[i]);
    setTimeout(animatePress, 600 * (i + 1), gamePattern[i]);
  }

  if (level > Highscore) {
    Highscore = level;
  }
}

function makeSound(value) {
  let audio;
  switch (value) {
    case "blue":
      audio = new Audio("./sounds/blue.mp3");
      break;

    case "green":
      audio = new Audio("./sounds/green.mp3");
      break;

    case "red":
      audio = new Audio("./sounds/red.mp3");
      break;

    case "yellow":
      audio = new Audio("./sounds/yellow.mp3");
      break;

    default:
      break;
  }
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(".btn").click(function () {
  counterClick++;
  let btnId = $(this).attr("id");
  userClickedPattern.push(btnId);

  makeSound(btnId);
  animatePress(btnId);
  $(this).fadeOut(100).fadeIn(100);

  if (gamePattern[counterClick] === userClickedPattern[counterClick]) {
    if (
      gamePattern.length === userClickedPattern.length &&
      counterClick < gamePattern.length
    ) {
      nextSequence();
      userClickedPattern = [];

      $("#level-title").html("Level " + level);
      $(".highscore").html("High score : " + Highscore);
    }
  } else {
    let loser = new Audio("./sounds/wrong.mp3");
    loser.play();
    $("#level-title").html(
      "loser cunt, press any key to reset, Level " + level
    );
    restarter = true;
  }
});

$(document).keydown(() => {
  if (level < 0 || restarter) {
    restarter = false;
    gamePattern = [];
    level = -1;
    nextSequence();
    userClickedPattern = [];

    $("#level-title").html("Level " + level);
  }
});
