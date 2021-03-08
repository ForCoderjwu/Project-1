/***********************************************************************************
  Project 1 - Simple student's hand book
  by Jiaquan Wu
  
  -------------------------------------------------------------------------------
  DESCRIPTION:
    This program make up a student's hand book for their parents to used. It used the non-linear designing
    and clickable buttom.
***********************************************************************************/
var newTimer;
var state1 = true;
var drawfunction;

var textButton = [];
var buttonY = 50;
var students = [];
var currentstu;

var gradebook = [];
var studentprofile = [];
var studentschedule = [];
var studentgrade = [];

function setup() {
  newTimer = new Timer(5000); //Timer 5s
  drawfunction = makeHome;//Initial the home page

  //Make up the Button(name,x,y)
  textButton[0] = makeTextButton("Home", 20, buttonY);
  textButton[1] = makeTextButton("Personal Information", 20 + 300*1, buttonY);
  textButton[2] = makeTextButton("Class Schedule", 20 + 300*2, buttonY);
  textButton[3] = makeTextButton("Grade book", 20 + 300*3, buttonY);

  currentstu = 0;
  stringinput();

  //Using the user's windows width/height, but at least is 1100*750
  if (windowWidth <1100 || windowHeight < 750) createCanvas(1100, 750);
  else createCanvas(windowWidth, windowHeight);
  
  background(0);
  newTimer.start();
}

function draw() {
  if(!newTimer.expired()){
    initialscreen();
  }
  else{
    drawfunction();
    drawButtons();
  }
  //drawDebugInfo();
}

function drawDebugInfo() { //Optinal
  push();
  textSize(24);
  textAlign(LEFT);
	fill(255);
  text("X: " + mouseX + "   Y: " + mouseY, 20, height - 20);
  pop();
}
//======================= INFORMATION GIVE IN =======================//

function stringinput() {
  // Student's profile (NAME, AGE, GENDER, LEVEL, ID, TERM, IMAGE)
  studentprofile[0] = ["John", 16, "Male","Sophomore", 13786522, "FALL 2019", loadImage("asset/png1.png")];
  studentprofile[1] = ["Charle", 17, "Male","Junior", 19745628, "FALL 2018", loadImage("asset/bean.png")];

  //Student's schedule setup
  studentschedule[0] = [["Theology", "Math", "English", "Chemistry", "FREE TIME", "GYM"],["Math", "FREE TIME", "GYM", "English", "Chemistry", "Theology"]];
  studentschedule[1] = [["Biology", "Chinese", "FREE TIME", "Math", "Theology", "GYM"],["Math", "FREE TIME", "Theology", "Biology", "Chinese","GYM"]];

  //Grade book setup
  gradebook = ["Language", "Math", "Science", "Theology", "GYM"];
  studentgrade[0] = [80, 75, 78, 83, 90];
  studentgrade[1] = [76, 83, 90, 80, 87];
}

//====================== BUTTON DISPLAY ============================//

function drawButtons() {
  for( let i = 0; i < textButton.length; i++ ) {
    textButton[i].draw();
  }
}

// ================== INITIAL PROGRESS BAR ============================//

function initialscreen() {
  let barwidth = 300;
  let barheight = 20;

  // Draw a progress bar:
  noStroke();
  fill(240,124,0);
  rect( (width/2) - (barwidth/2) , (height/2) - (barwidth/2) , barwidth*newTimer.getPercentageElapsed(), barheight );
  
  // draw an outline of the progress bar.
  noFill();
  stroke(50);
  strokeWeight(1);
  rect( (width/2) - (barwidth/2), (height/2) - (barwidth/2), barwidth, barheight );
  noStroke();

  //TEXT
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("Welcome to the student hand book System!", width/2, (height/2) - (barwidth/2) - 20);
  text("Still loading......", width/2, (height/2) + (barwidth/2) + 20);
  text("Notice: Using the button 1 & 2 to change Student!", width/2, height - 300);
}

//========================== BUTTON ===================================//

function makeTextButton(label, x, y) {
  // tb is a local var Create the clickable object
  let tb  = new Clickable();
  
  // set the tb's text
  tb.textSize = 18;
  tb.text = label;

  // set width + height
  tb.width = 200;
  tb.height = 70;

  // set to middle of screen
  tb.locate( x, y );

  //set the original color
  tb.color = "#EEB422";

  // Clickable callback function for when it is pressed
  tb.onPress = textButtonPressed;
  tb.onHover = textButtonOnHover;
  tb.onOutside = textButtonOnOutside;

  return tb;
}

//=================== STUDENT SELECT FUNCTION =========================//

function keyPressed() {
  if (key === '1') {
    newTimer.start();
    background(0);
    currentstu = 0;
    drawfunction = makeHome; //Initial with Home screen
  }
  else if (key === '2') {
    newTimer.start();
    background(0);
    currentstu = 1;
    drawfunction = makeHome;
  }
}

//==================== TEXT BUTTON CALLBACK FUNCTIONS ===================//

// button pressed
textButtonPressed = function () {
  gotoState(this.text);
}

// Black background, white text
textButtonOnHover = function () {
  this.color = "#000000";
  this.textColor = "#FFFFFF";
}

// return to normal when it is outside
textButtonOnOutside = function () {
  this.color = "#EEB422";
  this.textColor = "#000000";
}

//==================== NAVIGATION SYSTEM ===================//

function gotoState(statename) {
  if( statename === "Home") {
    drawfunction = makeHome;
  }
  else if( statename === "Personal Information") {
    drawfunction = makeProfile;
  }
  else if( statename === "Class Schedule") {
    drawfunction = makeSchedule;
  }
  else if( statename === "Grade book") {
    drawfunction = makeGrade;
  }
}

//==================== STATE FUNCTION ===================//
var text_y = 140; //The text box location (y&x)
var text_x = 340;

makeHome = function() {
  background(187,255,255);
  push();
  // create the background PNG
  tint(255, 127);
  imageMode(CENTER);
  image(studentprofile[currentstu][6],width/2,height/2, height,height);

  //Create the text-back rect
  fill(0);
  rectMode(RADIUS);
  strokeWeight(3);
  stroke(0,255,0);
  rect(width/2,height/2, width/2 - 100, 100, 20);
  pop();

  textSize(36);
  fill(144,238,144);
  text("Welcome to the " + studentprofile[currentstu][0] + "'s hand book system!", width/2, height/2 - 20);
  text("Please use the text button on top to access each page", width/2, height/2 +20);
}

makeProfile = function() {
  background(10,80,120);
  maketitle("Profile");
  fill(255);
  strokeWeight(5);
  rect(text_x-5,text_y-20,300,300);//Background

  //Profile Text
  push();
  textAlign(LEFT);
  textSize(30);
  fill(0);

  text("NAME: " + studentprofile[currentstu][0], text_x, text_y);
  text("AGE: " + studentprofile[currentstu][1], text_x, text_y + 40);
  text("GENDER: " + studentprofile[currentstu][2], text_x, text_y + 40*2);
  text("LEVEL: " + studentprofile[currentstu][3], text_x, text_y + 40*3);
  text("ID: " + studentprofile[currentstu][4], text_x, text_y + 40*4);
  text("TERM: " + studentprofile[currentstu][5], text_x, text_y + 40*5);
  pop();
}

makeSchedule = function() {
  background(150,80,40);
  maketitle("Schedule");
  fill(255);
  strokeWeight(5);
  rect(text_x-5,text_y-20,600,600);//Background

  fill(0);
  //Line
  push();
  stroke(0);
  for (let index = 0; index < 10; index++) {
    line(text_x-5,text_y + 50 * (index + 1), text_x-5 + 600, text_y + 50 * (index + 1));
  }
  line(text_x-5 + (600 * (1/3)), text_y - 20, text_x-5 + (600 * (1/3)), text_y-20 + 600);
  line(text_x-5 + (600 * (2/3)), text_y - 20, text_x-5 + (600 * (2/3)), text_y-20 + 600);
  pop();

  //Text
  textAlign(LEFT);
  textSize(30);
  text("Today", text_x + 10 + (600 * (1/3)), text_y + 20);
  text("Tomorrow", text_x + 10 + (600 * (2/3)), text_y + 20);

  for (let index = 0; index <= studentschedule[currentstu][0].length + 2; index++) {
    let schedulex = text_x;
    let scheduley = text_y + 80 + (50 * index);
    //Create schedule by time with classnumber(index)
    switch (index) {
      case 0:
        text("8:00 ~ 8:40", schedulex, scheduley);
        makeclass(index,0);
        break;

      case 1:
        text("8:50 ~ 9:30", schedulex, scheduley);
        makeclass(index,0);
        break;
    
      case 2:
        text("9:30 ~ 9:50", schedulex, scheduley);
        fill(255,0,0);
        text("Main room", schedulex + (600 * (1/3)), scheduley);
        text("Main room", schedulex + (600 * (2/3)), scheduley);
        fill(0);
        break;

      case 3:
        text("10:00 ~ 10:40", schedulex, scheduley);
        makeclass(index,1);
        break;
      
      case 4:
        text("10:50 ~ 11:30", schedulex, scheduley);
        makeclass(index,1);
        break;
      
      case 5:
        text("11:30 ~ 12:00", schedulex, scheduley);
        fill(255,0,0);
        text("Lunch Brake", schedulex + (600 * (1/3)), scheduley);
        text("Lunch Brake", schedulex + (600 * (2/3)), scheduley);
        fill(0);
        break;

      case 6:
        text("12:10 ~ 12:50", schedulex, scheduley);
        makeclass(index,2);
        break;

      case 7:
        text("13:00 ~ 13:40", schedulex, scheduley);
        makeclass(index,2);
        break;
      
      case 8:
        fill(255,0,0);
        text("Class Over", schedulex + (600 * (1/3)), scheduley);
        text("Class Over", schedulex + (600 * (2/3)), scheduley);
        fill(0);
    }
  }
}

makeGrade = function() {
  background(10,120,134);
  maketitle("Grade");
  fill(255);
  strokeWeight(5);
  rect(text_x-5,text_y-30,600,600);//Background

  //TEXT
  textAlign(LEFT);
  textSize(30);
  fill(255,165,0);
  text("Current Grade in each subject:", text_x,text_y);
  fill(0);

  //Create the grading subject and text
  for (let index = 0; index < gradebook.length; index++) {
    text(gradebook[index], text_x, text_y + 50 * (index + 1));//Subject
    fill(255,0,0);
    text(studentgrade[currentstu][index], text_x + text_x, text_y + 50 * (index + 1));//Grade
    //Use the ABCD(F) as grade, too
    if(studentgrade[currentstu][index] >= 90) text("A", text_x + text_x + 50, text_y + 50 * (index + 1));
    else if(studentgrade[currentstu][index] >= 80) text("B", text_x + text_x + 50, text_y + 50 * (index + 1));
    else if(studentgrade[currentstu][index] >= 70) text("C", text_x + text_x + 50, text_y + 50 * (index + 1));
    else if(studentgrade[currentstu][index] >= 60) text("D", text_x + text_x + 50, text_y + 50 * (index + 1));
    else text("F", text_x + text_x + 50, text_y + 50 * (index + 1));
    fill(0);

    push();
    stroke(0);
    line(text_x-5,text_y + 50 * (index + 1)+ 25, text_x-5 + 600, text_y + 50 * (index + 1)+ 25);//Line between the subject
    pop();
  }
  
}

function maketitle(title) {
  push();
  //Title
  textSize(36);
  fill(255);
  textAlign(LEFT);
  text("Student's "+title, 25, 105);

  //Backgroung PNG
  push();
  tint(255, 127);
  imageMode(CENTER);
  image(studentprofile[currentstu][6],width/2,height/2, height,height);
  pop();

  //Image
  strokeWeight(2);
  rect(24,119,303,303);
  strokeWeight(0);
  image(studentprofile[currentstu][6],25,120, 300, 300);
  pop();
}

function makeclass(index, parameter) {
  //This make up the schedule for each line
  text(studentschedule[currentstu][0][index-parameter],text_x + (600 * (1/3)),text_y + 80 + (50 * index));
  text(studentschedule[currentstu][1][index-parameter],text_x + (600 * (2/3)),text_y + 80 + (50 * index));
}