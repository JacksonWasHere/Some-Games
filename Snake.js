/*
Here is my recreation of the snake game. Use the WASD keys to control the snake.
*/

class Snake {
  constructor(x,y,xv,yv) {
    this.x=x;
    this.y=y;
    this.xv=xv;
    this.yv=yv;
  }
  draw() {
    cc.strokeStyle="#444444";
    cc.lineWidth=1;
    cc.fillStyle="#ffffff";
    cc.strokeRect(this.x*15,this.y*15,15,15);
    cc.fillRect(this.x*15,this.y*15,15,15);
  }
  move() {
    this.x += this.xv;
    this.y += this.yv;
  }
}
var piece = [];
var k = 0;

var press = true;
var play = false;

var noFood = true;
var foodx;
var foody;

var score = 1;

window.onload=function() {
  c=document.getElementById("canvas");
  cc=c.getContext('2d');
  piece[0]= new Snake(1,1,1,0);
  setInterval(update,1000/10);
}
function checkKeyPressed(e) {
  if (e.keyCode=="83" && piece[0].yv != -1 && press) {
    piece[0].xv = 0;
    piece[0].yv = 1;
    press = false;
  }
  if (e.keyCode=="87" && piece[0].yv != 1 && press) {
    piece[0].xv = 0;
    piece[0].yv = -1;
    press = false;
  }
  if (e.keyCode=="68" && piece[0].xv != -1 && press) {
    piece[0].xv = 1;
    piece[0].yv = 0;
    press = false;
  }
  if (e.keyCode=="65" && piece[0].xv != 1 && press) {
    piece[0].xv = -1;
    piece[0].yv = 0;
    press = false;
  }
  play=true;
}
function keyRelease() {
  press=true;
}
function update() {
  window.addEventListener("keydown", checkKeyPressed, false);
  cc.fillStyle="#444444";
  cc.fillRect(0,0,c.width,c.height);
  if(play) {
    if(noFood)
    {
      makeFood();
      noFood=false;
    }
    drawFood();
    for (var i = 0; i < piece.length; i++) {
      piece[i].move();
      piece[i].draw();
    }
    for (var i = piece.length-1; i > 0; i--) {
      piece[i].xv=piece[i-1].xv;
      piece[i].yv=piece[i-1].yv;
    }
    if(piece[0].x == foodx && piece[0].y == foody)
    {
      piece[piece.length] = new Snake(piece[piece.length-1].x-piece[piece.length-1].xv, piece[piece.length-1].y-piece[piece.length-1].yv, piece[piece.length-1].xv, piece[piece.length-1].yv);
      noFood = true;
      score++;
    }
    for (var i = 1; i < piece.length; i++) {
      if (piece[0].x == piece[i].x && piece[0].y == piece[i].y) {
        piece[0]= new Snake(1,1,1,0);
        piece.length=1;
        confirm("You Died!");
        play = false;
        score = 1;
      }
    }
    if (piece[0].x >= 43 || piece[0].x < 0 || piece[0].y >= 28 || piece[0].y < 0) {
      piece[0]= new Snake(1,1,1,0);
      piece.length=1;
      confirm("You Died!");
      play = false;
      score = 1;
    }
    window.addEventListener("keyup", keyRelease, false);
  }
  else {
    piece[0].draw();
    if(noFood)
    {
      makeFood()
      noFood=false;
    }
    drawFood()
  }
  document.getElementById("scoreLabel").innerHTML = "Your score is: "+score;
}
function makeFood() {
  foody = (Math.random()*28 | 0);
  foodx = (Math.random()*43 | 0);
}
function drawFood() {
  cc.strokeStyle="#444444";
  cc.lineWidth=1;
  cc.fillStyle="#990000";
  cc.strokeRect(foodx*15,foody*15,15,15);
  cc.fillRect(foodx*15,foody*15,15,15);
}
