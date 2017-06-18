var canvas;
var canvasContext;
//ball
var ballX=50;
var ballY=50;
var ballSpeedX=10;
var ballSpeedY=5;
//paddle
var paddle1Y=250;
var paddle2Y=250;
const PADDLE_GIRTH=10;
const PADDLE_HEIGHT=100;
//score
const MAX_SCORE=8;
var playerScore=0;
var opponentScore=0;
var winScreen=false;

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

function handleMouseClick(e) {
    if(winScreen) {
        playerScore=0;
        opponentScore=0;
        winScreen=false;
    }
}


window.onload = function() {
    
    canvas=document.getElementById('gameCanvas');
    canvasContext=canvas.getContext('2d');
    
    var framesPerSecond=30;
    setInterval(function() {
        drawEverything();
        moveEverything();
    }, 1000/framesPerSecond);
    
    canvas.addEventListener('mousedown',handleMouseClick);
    
    canvas.addEventListener('mousemove',
        function(e) {
            var mousePos=calculateMousePos(e);
            paddle1Y=mousePos.y-(PADDLE_HEIGHT/2);
        });
}

function ballReset() {
    if(playerScore>=MAX_SCORE || opponentScore>=MAX_SCORE) {
        winScreen=true;
    }
    
    ballSpeedX=-ballSpeedX;
    ballX=canvas.width/2;
    ballY=canvas.height/2;
}

function computerMovement() {
    var paddle2YCenter=paddle2Y+(PADDLE_HEIGHT/2);
    if(paddle2YCenter<ballY-35) {
        paddle2Y+=6;
    } else if(paddle2YCenter>ballY-35) {
        paddle2Y-=6;
    }
}

function moveEverything() {
    if(winScreen==true) {
        return;
    }
    
    computerMovement();
    
    ballX+=ballSpeedX;
    ballY+=ballSpeedY;
    
    if(ballX < 0) {
        if(ballY > paddle1Y && ballY<paddle1Y+PADDLE_HEIGHT) {
            ballSpeedX=-ballSpeedX;
            
            var deltaY=ballY-(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY=deltaY*0.35;
        } else {
        //must be before ballReset()
        opponentScore++;
        ballReset();
        }
    }
    if(ballX > canvas.width) {
        if(ballY > paddle2Y && ballY<paddle2Y+PADDLE_HEIGHT) {
            ballSpeedX=-ballSpeedX;
            
            var deltaY=ballY-(paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY=deltaY*0.35;
        } else {
        //must be before ballReset()
        playerScore++;
        ballReset();
        }
    }
    if(ballY < 0) {
        ballSpeedY=-ballSpeedY;
    }
    if(ballY > canvas.height) {
        ballSpeedY=-ballSpeedY;
    }
}

function drawNet() {
    for(var i=0;i<canvas.height; i+=40) {
        colorRect(canvas.width/2-1,i,2,20,'white')
    }
}

function drawEverything() {
    
    //next line colors the canvas
    colorRect(0,0,canvas.width,canvas.height,'black');
    //next line displays the winning screen
    if(winScreen==true) {
        canvasContext.fillStyle='white';
        
        if(playerScore>=MAX_SCORE) {
            canvasContext.fillText('You Win!!!',350,200);
        } else if(opponentScore>=MAX_SCORE) {
            canvasContext.fillText('Computer Wins!!!',350,200);
        }
        
        canvasContext.fillText('click to continue',(canvas.width/2)-16,400);
        return;
    }
    //next line draws the net
    drawNet();
    //next line draws the player paddle(left)
    colorRect(0,paddle1Y,PADDLE_GIRTH,PADDLE_HEIGHT,'white');
    //next line draws the opponents paddle(right)
    colorRect(canvas.width-10,paddle2Y,PADDLE_GIRTH,PADDLE_HEIGHT,'white');
    //next line draws the ball
    colorCircle(ballX,ballY,10,'white');
    //next line draws the score
    canvasContext.fillText(playerScore,100, 100);
    canvasContext.fillText(opponentScore,canvas.width-100, 100);
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