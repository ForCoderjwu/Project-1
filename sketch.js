/***********************************************************************************
  Project 1 - Simple student's hand book
  by Jiaquan Wu
  
  -------------------------------------------------------------------------------
  DESCRIPTION:
    This program make up a student's hand book for their parents to used. It used the non-linear designing
    and clickable buttom.
***********************************************************************************/
var simpleTimer;

// Setup code goes here
function setup() {
  newTimer = new Timer(5000);
  createCanvas(windowWidth, windowHeight);
 }

// Draw code goes here
function draw() {
  background(0);
}

function initialscreen() {
  let barlength = 300;
  let barwidth = 20;

  // Draw a progress bar:
  noStroke();
  fill(240,124,0);
  rect( height, vMargin + progBarHeight, progBarWidth*simpleTimer.getPercentageElapsed(), progBarHeight );
  
  // draw an outline of the progress bar.
  noFill();
  stroke(50);
  strokeWeight(1);
  rect( hMargin, vMargin + progBarHeight, progBarWidth, progBarHeight );
  noStroke();
}