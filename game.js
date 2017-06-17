var canvas;
var canvasContext;
//ball
var ballX=50;
var ballY=50;
var ballSpeedX=10;
var ballSpeedY=5;
//paddle
var paddle1Y=250;
const PADDLE_HEIGHT=100;

function calculateMousePos(e) {
    var rect=canvas.getBoundingClientRect();
    var root=document.documentElement;
    var mouseX=e.clientX-rect.left-root.scrollLeft;
    var mouseY=e.clientY-rect.top-root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}



window.onload = function() {
    
    canvas=document.getElementById('gameCanvas');
    canvasContext=canvas.getContext('2d');
    
    var framesPerSecond=30;
    setInterval(function() {
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);
    
    canvas.addEventListener('mousemove',
        function(e) {
            var mousePos=calculateMousePos(e);
            paddle1Y=mousePos.y-(PADDLE_HEIGHT/2);
        });
}

function ballReset() {
    ballSpeedX=-ballSpeedX;
    ballX=canvas.width/2;
    ballY=canvas.height/2;
}

function moveEverything() {
    ballX=ballX+ballSpeedX;
    ballY=ballY+ballSpeedY;
    
    if(ballX < 0) {
        if(ballY > paddle1Y && ballY<paddle1Y+PADDLE_HEIGHT) {
            ballSpeedX=-ballSpeedX;
        } else {
        ballReset();
        }
    }
    if(ballX > canvas.width) {
        ballSpeedX=-ballSpeedX;
    }
    if(ballY < 0) {
        ballSpeedY=-ballSpeedY;
    }
    if(ballY > canvas.height) {
        ballSpeedY=-ballSpeedY;
    }
}

function drawEverything() {
    
    //next line colors the canvas
    colorRect(0,0,canvas.width,canvas.height,'black');
    //next line draws the player paddle(left)
    colorRect(0,paddle1Y,10,PADDLE_HEIGHT,'white');
    //next line draws the ball
    colorCircle(ballX,ballY,10,'red');
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