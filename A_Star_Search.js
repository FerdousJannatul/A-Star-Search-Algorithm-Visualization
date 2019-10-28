/* This Class draws all the blocks and 
 does the path finding*/

var cols=50; //number of columns in the display grid
var rows=50; //number of rows in the display grid
var grid=new Array(cols);

var openSet=[]; //the blocks which can still be evaluated
var closedSet=[];  //the blocks which have been evaluated already

var w, h; //dimensions of each block

var path=[]; //the list of blocks the algorithm took between start to end

var start; //the start block 
var end;  //the destination block

//function to remove an element with a specified value from an array
function removeElement(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

//function to estimate the distance from current block to end (pythagorean distance)
function heuristic(a, b) {
  var d=dist(a.i, a.j, b.i, b.j);
  return d;
}

function setup() {

  createCanvas(600, 600);

  w=width/cols;
  h=height/rows;

  //creating a 2-D array
  for (var i=0; i<cols; i++) {
    grid[i]=new Array(rows);
  }

  //adding a block at each grid
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Block(i, j);
    }
  }

  //adding neighbor blocks for each block
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  //defining start and end, and they are never a wall
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall=false;
  end.wall=false;


  // openSet starts with start block only
  openSet.push(start);
}


function draw() {

  //loops until there are still blocks that can be evaluated
  if (openSet.length>0) {

    //finds the index for the block that has the least f value to destination
    var lowestIndex=0;
    for (var i=0; i<openSet.length; i++) {
      if (openSet[i].f<openSet[lowestIndex].f) {
        lowestIndex=i;
      }
    }

    var current=openSet[lowestIndex];

    //program stops if the current block is the destination block
    if (current===end) {
      noLoop();
      console.log("Done!");
    }

    //adds the current block into closed set after it is evaluated once
    removeElement(openSet, current);
    closedSet.push(current);

    var neighbors=current.neighbors;

    for (var i=0; i<neighbors.length; i++) {

      var neighbor=neighbors[i];

      //checks if current to neighbor is better or neighbor.g is better
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG= current.g + heuristic(neighbor, current);

        var newPath=false;
        if (openSet.includes(neighbor)) {
          if (tempG<neighbor.g) {
            neighbor.g=tempG;
            newPath=true;
          }
        } else {
          neighbor.g=tempG;
          newPath=true;
          openSet.push(neighbor);
        }
        if (newPath) {
          neighbor.h=heuristic(neighbor, end);
          neighbor.f=neighbor.g+neighbor.h;
          neighbor.previous=current;
        }
      }
    }
  } else { //there is no solution if there is nothing in openset and destination block is not reached
    console.log("No Solution");
    noLoop();
    return;
  }

  background(255);

  //draw all the blocks
  for (var i=0; i<cols; i++) {
    for (var j=0; j<rows; j++) {
      grid[i][j].show(color(200, 100));
    }
  }

  //draw openSet blocks
  for (var i=0; i<openSet.length; i++) {
    openSet[i].show(color(70, 180, 100));
  }

  //draw closedSet blocks
  for (var i=0; i<closedSet.length; i++) {
    closedSet[i].show(color(79, 179, 183));
  }

  //adds all the blocks the most efficient path used
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  //draw the path taken
  noFill();
  stroke(255, 255, 0);
  strokeWeight(7);
  beginShape();
  for (var i=0; i<path.length; i++) {
    vertex(path[i].i*w, path[i].j*h);
  }

  endShape();
}
