let userClickedPattern=[]
let gamePattern=[]
let buttonColours=["red","blue","green","yellow"]  
let level=0;
let started=false;
$(".btn").click(function(){
    let userChosenColour=this.id
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
   
});
$(document).keypress(function(){
    if(!started){
        started=true;
        $("#level-title").text("Level "+level);
        nextSequence();
        
}});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
    let audio= new Audio("sounds/" + name + ".mp3");
    audio.play();   
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over")
        playSound("wrong")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}