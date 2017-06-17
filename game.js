var canvas;
var canvasContext;
var ballX=50;
var ballSpeedX=15;

window.onload = function() {
    
    canvas=document.getElementById('gameCanvas');
    canvasContext=canvas.getContext('2d');
    
    var framesPerSecond=30;
    setInterval(function() {
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);
}

function moveEverything() {
    ballX=ballX+ballSpeedX;
    if(ballX < 0) {
        ballSpeedX=-ballSpeedX;
    }
    if(ballX > canvas.width) {
        ballSpeedX=-ballSpeedX;
    }
}

function drawEverything() {
    
    //next line colors the canvas
    colorRect(0,0,canvas.width,canvas.height,'black');
    //next line draws the player paddle(left)
    colorRect(0,210,10,100,'white');
    //next line draws the ball
    colorCircle(ballX,150,10,'red');
}

function colorCircle(centerX,centerY,radius,drawColor) {
    canvasContext.fillStyle=drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle=drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}