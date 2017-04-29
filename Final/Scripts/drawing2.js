
//flappy elephant-like
//mouse click or x to flap

var GRAVITY = .8;
var FLAP = -7;
var GROUND_Y = 700;
var MIN_OPENING = 50;
var elephant, ground;
var gameOver;
var elephantImg, bgImg;

function setup() {
  createCanvas(windowWidth,windowHeight);

  elephantImg = loadImage("Images/elephant-1A.png");
  groundImg = loadImage("Images/flappy_ground.png");
  elephant = createSprite(width/2, height/2);
  elephant.rotateToDirection = true;
  elephant.velocity.x = 4;
  elephant.setCollider("circle", 0,0,20);
  elephant.addImage(elephantImg);
  
  ground = createSprite(800/2, GROUND_Y+100); //image 800x200
  ground.addImage(groundImg);

  gameOver = true;
  updateSprites(false);
  
  camera.position.y = height/2;
}

function draw() 
{
  if(gameOver && keyWentDown("x"))
  {
	newGame();
  }


  if(!gameOver) 
  {
    if(keyWentDown("x"))
      elephant.velocity.y = FLAP;
    
    elephant.velocity.y += GRAVITY;
    
    if(elephant.position.y <= 0)
      die();
    
    if(elephant.position.y + elephant.height/2 > GROUND_Y)
      die();
   }

  camera.position.x = elephant.position.x + width/4;

  if(camera.position.x > ground.position.x-ground.width+width/2)
    ground.position.x+=ground.width;

  background(247, 134, 131); 
  camera.off();
  
  fill(200);
  textAlign(CENTER);
  text("Press X or LEFT CLICK to stay in the air!", width/2, 20);
  
  camera.on();

  drawSprite(elephant);
}

function die() 
{
  updateSprites(false);
  gameOver = true;   
}

function newGame() 
{
  gameOver = false;
  updateSprites(true);
  elephant.position.x = width/2;
  elephant.position.y = height/2;
  elephant.velocity.y = 0;
  ground.position.x = width;
  ground.position.y = GROUND_Y+100;
}

function mousePressed() 
{
  if(gameOver)
    newGame();
  elephant.velocity.y = FLAP;
}