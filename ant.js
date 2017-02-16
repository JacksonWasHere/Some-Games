var grid = [];
var ax = 36;
var ay = 32;
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
  draw()
}
function draw() {
  if(grid[lastax][lastay]){
    cc.fillStyle="#594918";
  } else {
    cc.fillStyle="#947422";
  }
  cc.fillRect(lastax*scale,lastay*scale,scale,scale);
  cc.fillStyle="#DF2A2A";
  cc.fillRect((ax+.5)*scale,(ay+.5)*scale,scale/2,scale/2);
}
