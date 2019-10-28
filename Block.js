/*This Class has a Block function which represents 
 and has all the properties each block in the grid contain*/

function Block(i, j) {

  this.i=i;
  this.j=j;

  this.g=0;
  this.h=0;
  this.f=0;

  this.neighbors=[];
  this.previous=undefined;

  //adds walls randomly, 40% of blocks are walls
  this.wall=false;
  if (random(1)<0.4) {
    this.wall=true;
  }

  //constructor funtion to display blocks
  this.show=function(col) {
    if (this.wall) {
      fill(0);
      noStroke();
      rect(this.i * w, this.j * h, w-1, h-1);
    } else if (col) {
      fill(col);
      rect(this.i * w, this.j * h, w-1, h-1);
    }
  }

  //constructor function to add nearby blocks of current block
  this.addNeighbors=function(grid) {

    var i=this.i;
    var j=this.j;

    if (i<cols-1) {
      this.neighbors.push(grid[i+1][j]);
    }
    if (i>0) {
      this.neighbors.push(grid[i-1][j]);
    }
    if (j<rows-1) {
      this.neighbors.push(grid[i][j+1]);
    }
    if (j>0) {
      this.neighbors.push(grid[i][j-1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  }
}
