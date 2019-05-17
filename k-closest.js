var canvasWidth,canvasHeight;
var ctx, canvas;


window.onload = function() {
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    theBoard = new Board(ctx);
    theBoard.drawPixels();
  };