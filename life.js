var play = false;
//speed of
var speed = 5;
var scale = 10;
//the grid
var grid = [];
//buffer to test everything;
var buffer = [];

var runGame;

window.onload=function() {
  c=document.getElementById('canvas');
  cc=c.getContext('2d');

  //initialize grid with all dead cells. Same with buffer.
  for (var x = 0; x < c.width/scale; x++) {
    grid[x]=[];
    buffer[x]=[];
    for (var y = 0; y < c.height/scale; y++) {
      buffer[x][y]=false;
      grid[x][y]=false;
    }
  }
  grid[10][10]=true;
  grid[10][11]=true;
  grid[12][10]=true;
  grid[11][10]=true;
  grid[11][12]=true;
  runGame = setInterval(update,1000/speed);
  //else let them edit
  var editGame = setInterval(edit,1000/60);
  gameOfLife();
}
function gameOfLife() {
  //run if allowed
  draw();
}
function update() {
  if(play) {
  draw();
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[x].length; y++) {
      buffer[x][y]=grid[x][y];
    }
  }
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[x].length; y++) {
      var neighbors = 0;
      for (var xx = x-1; xx <= x+1; xx++) {
        for (var yy = y-1; yy <= y+1; yy++) {
          if (xx>=0 && xx<c.width/scale && yy>=0 && yy<c.height/scale && !(xx==x && yy==y)) {
            if (buffer[xx][yy]) {
              neighbors++;
            }
          }
        }
      }
      if((x==10 || x==11) && (y==10 || y==11)) {
        //console.log("Cell "+x+","+y+" has "+neighbors);
      }
      if (neighbors>3 || neighbors<2) {
        grid[x][y]=false;
      }
      else if(neighbors == 3) {
        grid[x][y]=true;
      }
    }
  }
  }
}
var press = true;
function edit() {
  if(!play) {
  draw();
  c.addEventListener('mousedown', function(evt) {
    change(evt);
  },false);
  c.addEventListener('mouseup',function(){press=true;},false);
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(); // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
    return {
      x: (evt.clientX - rect.left) * scaleX - 5,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY  - 5   // been adjusted to be relative to element
    };
  }
  function change(e) {
    if(press && !play) {
      var p = getMousePos(c,e);
      var mx = Number((p.x/scale).toFixed(0));
      var my = Number((p.y/scale).toFixed(0));
      if(grid[mx][my]) {
        grid[mx][my]=false;
      } else {
        grid[mx][my]=true;
      }
      //grid[2][2]=true;
      press=false;
    }
  }
  }
}
//draws grid;
function draw() {
  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[x].length; y++) {
      if (grid[x][y]) {
        cc.fillStyle="#ffffff";
      } else {
        cc.fillStyle="#000000";
      }
      cc.fillRect(x*scale,y*scale,scale,scale);
    }
  }
}
function clear() {
  if(!play) {
    for (var x = 0; x < grid.length; x++) {
      for (var y = 0; y < grid[x].length; y++) {
        grid[x][y]=false;
      }
    }
  }
  console.log("Cleared");
}
function changeSpeed() {
  if(!play) {
    console.log(document.getElementById("speedBox").value);
    speed=document.getElementById("speedBox").value;
    console.log(speed);
    clearInterval(runGame);
    runGame = setInterval(update, 1000/speed);
  }
}
function pause() {
  if (play) {
    play=false;
    document.getElementById("playbtn").innerHTML = "Play";
  } else {
    play=true;
    document.getElementById("playbtn").innerHTML = "Pause";
  }
  console.log(speed);
  gameOfLife();
}
