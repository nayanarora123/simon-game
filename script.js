const btn = $('[data-btn]');
 
const buttonColors = ['red', 'blue', 'green', 'yellow']

let gamePattern = [];

let userClickedPattern = [];

let started = true;

let level = 0;



function nextSequence(){
    userClickedPattern = [];                                 //after called nextSequence, array will empty and start from again

    level++;
    $('h1').text('Level '+level);                             //for level up everytime when nextSequence is called

    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //console.log(gamePattern)

    $('#'+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    var audio = new Audio(`sounds/${randomChosenColor}.mp3`);
    audio.play();
}

btn.click(function(){
    let userChosenColor = this.id;
    // console.log(this.id);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1); //to obtain last item of userClickedPattern
})

$(document).keypress(function(){
    if(started){
        $('h1').text('Level '+level);
        nextSequence();
         started = false;
    }

})


function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass('pressed');

    setTimeout(function(){
        $(`#${currentColor}`).removeClass('pressed');
    },50)
}

function startOver() {                          //reset the values
    level = 0;
    gamePattern = [];
    started = true;                            
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){    //check if last values are equal

    if(gamePattern.length === userClickedPattern.length){                 //check if lengths are equal
        setTimeout(function(){          
        nextSequence();
       },1000);
    }
    }
    else{
        
        let audioOver = new Audio('sounds/wrong.mp3');
        audioOver.play();

        $('body').addClass('game-over');
        $('h1').text('Game Over, Press Any Key To Restart');

        setTimeout(function(){
            $('body').removeClass('game-over');
        },100)

        startOver();
        }
    }