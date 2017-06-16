var canvas;
var canvasContext;

window.onload = function() {
    console.log("Hiii!!!!");
    
    canvas=document.getElementById('gameCanvas');
    canvasContext=canvas.getContext('2d');
    canvasContext.fillStyle='black';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    
}