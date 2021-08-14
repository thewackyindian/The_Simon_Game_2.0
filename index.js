var gamepattern = [];
var userPattern = [];
var level = -1;
var start = false;
var current = 0;
var score = 0;
var mobile = false;
buttonColors = ["red", "blue", "green", "yellow"];
$(".play").on("click", function () {
    mobile = true;
    $(".score").text(score);
    if (start !== true) {
    nextSequence();
    }
    start = true;
});
$(document).on("keypress", function () {
    $(".score").text(score);
    if (start !== true) {
    nextSequence();
    }
    start = true;
});
$(".btn").on("click", function () {
    var name = $(this).attr("id");
    userPattern.push(name);
    playSound(name);
    animatePress(name);
    checkAnswer(current);
    current++;
});
function animatePress(item){
    $("#" + item).addClass("pressed");
    setTimeout(function () {
        $("#" + item).removeClass("pressed");
    }, 100);
}
function animatebody(){
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}
function playSound(p) {
    var add = "sounds/" + p + ".mp3";
    var audio = new Audio(add);
    audio.play();
}
function nextSequence() {
    current = 0;
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    userPattern = [];
    $("h1").text("Level " + level);
    gamepattern.push(buttonColors[randomNumber]);
    playSound(buttonColors[randomNumber]);
    animatePress(buttonColors[randomNumber]);
}
function checkAnswer(current){
    if (gamepattern[current] === userPattern[current]) {
        console.log("success");
    }
    else {
        console.log("wrong");
        if (mobile == true) {
            $("h1").text("Game Over , Press Play to Start");
        }
        else {
              $("h1").text("Game Over , Press any key to Start");
        }
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        animatebody();
        level = -1;
        score = 0;
        gamepattern = [];
        start = false;
    }
    if (current === gamepattern.length - 1) {
        score += 10;
        $(".score").text(score);
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}





