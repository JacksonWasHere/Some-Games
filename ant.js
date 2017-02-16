var grid = [];
var ax = 32;
var ay = 21;
var lastax = ax;
var lastay = ay;
var scale = 10;
var dir=0;
//I'm not sure how to make this faster.
window.onload=function(){
  c=document.getElementById("canvas");
  cc=c.getContext('2d');
  init();
  setInterval(update,.0001);
}
function init() {
  for (var x = 0; x < c.width/scale; x++) {
    grid[x]=[];
    for (var y = 0; y < c.height/scale; y++) {
      grid[x][y]=false;
    }
  }
}
function update() {
  if(grid[ax][ay]){
    move(0);
  } else {
    move(1);
  }
  lastay=ay;
  lastax=ax;
  draw();
}
function move (thang) {
  if (thang==0) {
    dir+=1;
  } else {
    dir-=1;
  }
  if (dir==4) {
    dir=0;
  }else if (dir==-1) {
    dir=3;
  }
  if(dir==0){
    ay-=1;
  } else if (dir==1) {
    ax+=1
  } else if (dir==2) {
    ay+=1
  } else if (dir==3) {
    ax-=1;
  }
  swap();
}
function swap() {
  if (grid[lastax][lastay]) {
    grid[lastax][lastay]=false;
  } else {
    grid[lastax][lastay]=true;
  }
}
function draw() {
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[x].length; y++) {
      if (grid[x][y]) {
        cc.fillStyle="#633D17"
      } else {
        cc.fillStyle="#947422";
      }
      cc.strokeStyle="#333333";
      cc.strokeWeight=1;
      cc.strokeRect(x*scale,y*scale,scale,scale);
      cc.fillRect(x*scale,y*scale,scale,scale);
    }
  }
  cc.fillStyle="#DF2A2A";
  cc.fillRect((ax+.5)*scale,(ay+.5)*scale,scale/2,scale/2);
}
