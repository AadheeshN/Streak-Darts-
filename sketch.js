const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world; 

var object1;

var dartObject, launcherObject, targetObject, backgroundImage, score, ground;

var popup;    

// default variables for progressbar
// start the time for progressbar
var startTime, done, counter, maxTime; 

function preload() {
  backgroundImage = loadImage("assets/arenaBackground.jpg");
}

function setup() {
  var canvas = createCanvas(1366, 657);
  engine = Engine.create();
  world = engine.world;

  dartObject = new Dart(200, 300, 100, 100);

  launcherObject = new Launcher(dartObject.body, {x: 200, y: 300});

  targetObject = new Target(900, 300, 200, 200);

  ground = new Ground(895, 375, 500, 10);


  //timerObject = 20;

  score = " (Not Hit!)";

  //createTimer();

  counter = 0; 
  startTime= millis(); 
  maxTime=20000; 
  done=false; 
  
}
  
function draw() {
  background(backgroundImage);  
  Engine.update(engine);

  dartObject.display();
  launcherObject.display();
  targetObject.display();

  ground.display();



  textSize(25);
  fill("White");
  text("Status: " + score, 1100, 80);

  textSize(20);
  fill("White");
  text("Drag and Release the Dart to Hit The Target!", 450, 550);
  text("The Time Is Ticking.....", 540, 610);
  text("For a Second Attempt, Press The Space Bar, Good Luck!", 400, 580);

  showTimer();

  if (score === "  (Hit!)") {
    respawn();
    object1.display();
  }

  keyPressed();

}

function keyPressed() {
  if (keyCode === 32) {
     launcherObject.attach(dartObject.body); 
  }
}


function showTimer(){
  if (counter-startTime < maxTime) {
    counter=millis();

    }  else { 
      done=true;
      //reset();
      swal("Oops!  You have failed to hit the target!  Better Luck Next Time :(");
    }
    // create the color for fill progressbar
    fill("Yellow");
    // no stroke for draw
    noStroke();

    rect(10,30,map(counter-startTime,0,maxTime,0,width*2), 30 );
    //console.log(map(counter-startTime,0,maxTime,0,2366));
    noFill();

    if (maxTime >  counter-startTime && score === " (Hit!)") {
      swal("GREAT JOB!  You Hit The Target!");
      counter=reset();
      console.log("Time");
    }
}

function mouseDragged() {
  Matter.Body.setPosition(dartObject.body, {x: mouseX , y: mouseY});
}

function mouseReleased() {
  launcherObject.fly();
}

async function getTime() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
}


function respawn() {
  //object1 = new Target(1000, 300, 200, 200);   
}

function reset() {
  Matter.Composite.clear(dartObject, false);  
  Matter.Composite.clear(targetObject, false);
}