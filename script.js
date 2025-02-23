// Dog Animation Variables
var dog = document.getElementById("dog");
var idleImageNumber = 1;
var idleAnimationNumber = 1;

// Idle Animation
function idleAnimation() {
    idleImageNumber++;
    if (idleImageNumber == 10) idleImageNumber = 1;
    dog.src = "resources/Idle (" + idleImageNumber + ").png";
}

function idleAnimationStart() {
    idleAnimationNumber = setInterval(idleAnimation, 200);
}

// Run Animation Variables
var runImageNumber = 1;
var runAnimationNumber = 1;

// Run Animation
function runAnimation() {
    runImageNumber++;
    if (runImageNumber == 8) runImageNumber = 1;
    dog.src = "resources/Run (" + runImageNumber + ").png";
}

function runAnimationStart() {
    runAnimationNumber = setInterval(runAnimation, 100);
    clearInterval(idleAnimationNumber);
}

// Background Movement Variables
var backgroundPositionX = 0;
var moveBackgroundAnimationId = 0;
var score = 0;

// Background Movement
function moveBackground() {
    backgroundPositionX -= 20;
    document.getElementById("background").style.backgroundPositionX = backgroundPositionX + "px";
    score++;
    document.getElementById("score").innerHTML = "Score=" + score;
}

// Jump Animation Variables
var jumpImageNumber = 1;
var jumpAnimationNumber = 1;
var dogMarginTop = 450;

// Jump Animation
function jumpAnimation() {
    jumpImageNumber++;
    if (jumpImageNumber <= 4) dogMarginTop -= 100;
    if (jumpImageNumber > 5) dogMarginTop += 100;
    
    dog.style.marginTop = dogMarginTop + "px";
    dog.src = "resources/Jump (" + jumpImageNumber + ").png";

    if (jumpImageNumber == 8) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = 1;
        runImageNumber = 1;
        runAnimationStart();
    }
}

function jumpAnimationStart() {
    clearInterval(idleAnimationNumber);
    clearInterval(runAnimationNumber);
    jumpAnimationNumber = setInterval(jumpAnimation, 100);
    document.getElementById("jumpSound").play();
}

// Box Creation Variables
var boxMarginLeft = 1540;

// Create Obstacles
function createBoxes() {
    for (var i = 0; i <= 5; i++) {
        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;
        document.getElementById("background").appendChild(box);
        box.style.marginLeft = boxMarginLeft + "px";
        
        boxMarginLeft += (i <= 2) ? 800 : (i <= 4) ? 600 : 400;
    }
}

// Box Animation Variables
var boxAnimationId = 0;
var boxesPassed = 0;
var totalBoxes = 5;

// Box Animation
function boxAnimation() {
    for (var i = 0; i < 5; i++) {
        var box = document.getElementById("box" + i);
        var newMarginLeft = parseInt(getComputedStyle(box).marginLeft) - 45;
        box.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft < -160 && !box.passed) {
            box.passed = true;
            boxesPassed++;
        }

        if (newMarginLeft >= -110 && newMarginLeft <= 100 && dogMarginTop > 360) {
            endGame();
            return;
        }

        if (boxesPassed === totalBoxes) winGame();
    }
}

// Key Event Listener
function keyCheck(event) {
    var keyCode = event.which;
    
    if (keyCode == 13 && runAnimationNumber == 1) runAnimationStart();
    if (moveBackgroundAnimationId == 0) moveBackgroundAnimationId = setInterval(moveBackground, 100);
    if (boxAnimationId == 0) boxAnimationId = setInterval(boxAnimation, 100);
    if (keyCode == 32 && jumpAnimationNumber == 1) jumpAnimationStart();
}

// Dead Animation Variables
var deadImageNumber = 0;
var deadAnimationNumber = 0;

// Dead Animation
function dogDeadAnimation() {
    deadImageNumber++;
    if (deadImageNumber == 10) {
        deadImageNumber = 9;
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endscore").innerHTML = score;
    }
    dog.src = "resources/Dead (" + deadImageNumber + ").png";
}

// Reload Game
function reload() {
    location.reload();
}

// End Game Function
function endGame() {
    clearInterval(boxAnimationId);
    clearInterval(runAnimationNumber);
    clearInterval(jumpAnimationNumber);
    clearInterval(moveBackgroundAnimationId);
    document.getElementById("endSound").play();
    deadAnimationNumber = setInterval(dogDeadAnimation, 100);
}

// Win Game Function
function winGame() {
    clearInterval(boxAnimationId);
    clearInterval(runAnimationNumber);
    clearInterval(jumpAnimationNumber);
    clearInterval(moveBackgroundAnimationId);
    document.getElementById("winSound").play();
    document.getElementById("win").style.visibility = "visible";
    document.getElementById("winscore").innerHTML = score;
}
