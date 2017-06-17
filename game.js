var canvas;
var canvasContext;
var ballX=50;

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
    ballX+=5;
}

function drawEverything() {
    
    canvasContext.fillStyle='black';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle='white';
    canvasContext.fillRect(0,210,10,100);
    canvasContext.fillStyle='red';
    canvasContext.fillRect(ballX,100,10,10);   
}