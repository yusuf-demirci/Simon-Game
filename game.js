const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function nextSequence(){
    level++;
    $("#level-title").text(`Level ${level}`)

    let randomColor = chooseColor();
    $(`#${randomColor}`).fadeOut(50).fadeIn(50);

    playSound(randomColor);
    gamePattern.push(randomColor);
}

function chooseColor(){
    let randomNumber = Math.floor(Math.random() * 4);
    return buttonColors[randomNumber];
}

function playSound(name){
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    }, 100)
}

function checkPattern(a, b) {
    return a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function beginGame(){
    level = 0;
    gamePattern = []
    userClickedPattern = []

    $(window).off("keydown");
    $(window).keydown(function(e){   
        nextSequence();
        $(window).off("keydown")
    })
}

$(".btn").click(function(e){
    let userChosenColor = e.target.id;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);

    if (checkPattern(userClickedPattern, gamePattern)){
        setTimeout(function(){
            nextSequence();
        }, 1000)
        userClickedPattern = []
    } else if (!(checkPattern(userClickedPattern, gamePattern.slice(0, userClickedPattern.length)))){
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        
        playSound("wrong");
        $("#level-title").text(`Game Over, Press Any Key to Restart`)
        beginGame()
    }
})

beginGame()



