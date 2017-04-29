//flappy bird-like
//mouse click or x to flap

var GRAVITY = .3;
var FLAP = -7;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var elephant, ground;
var clouds;
var gameOver;
var elephantImg, cloudImg, groundImg, bgImg;


function setup() {
  createCanvas(windowWidth,windowHeight);

  elephantImg = loadImage("Images/elephant-1B.png");
  cloudImg = loadImage("Images/cloud.png");
  groundImg = loadImage("Images/flappy_ground.png");
  bgImg = loadImage("Images/flappy_bg.png");
  
  elephant = createSprite(width/2, height/2, 40,40);
  elephant.rotateToDirection = true;
  elephant.velocity.x = 4;
  elephant.setCollider("circle", 0,0,25);
  elephant.addImage(elephantImg);

  ground = createSprite(800/2, GROUND_Y+100); //image 800x200
  ground.addImage(groundImg);

  clouds = new Group();
  gameOver = true;
  updateSprites(false);
  
  camera.position.y = height/2;
}

function draw() {

  if(gameOver && keyWentDown("x"))
    newGame();

  if(!gameOver) {

    if(keyWentDown("x"))
      elephant.velocity.y = FLAP;
    
    elephant.velocity.y += GRAVITY;
    
    if(elephant.position.y <= 0 || elephant.position.y > height)
      die();
    
    if(elephant.position.y+elephant.height/2 > GROUND_Y)
      die(); 

    if(elephant.overlap(clouds))
      die();

    //spawn pipes
    if(frameCount%60 == 0) {
      var cloudH = random(50, 600);
      var cloud = createSprite(elephant.position.x + width, GROUND_Y-cloudH/2+1+100, 80, cloudH);
      cloud.addImage(cloudImg);
      clouds.add(cloud);
    }

    //get rid of passed pipes
    for(var i = 0; i<clouds.length; i++)
      if(clouds[i].position.x < elephant.position.x-width/2)
        clouds[i].remove();
  }

  camera.position.x = elephant.position.x + width/4;

  //wrap ground
  if(camera.position.x > ground.position.x-ground.width+width/2)
    ground.position.x+=ground.width;

  background(247, 134, 131); 
  camera.off();
  image(bgImg, 0, GROUND_Y-190);
  camera.on();

  drawSprites(clouds);
  drawSprite(ground);
  drawSprite(elephant);
}

function die() {
  updateSprites(false);
  gameOver = true;   
}

function newGame() {
  clouds.removeSprites();
  gameOver = false;
  updateSprites(true);
  elephant.position.x = width/2;
  elephant.position.y = height/2;
  elephant.velocity.y = 0;
  ground.position.x = 800/2;
  ground.position.y = GROUND_Y+100;
}

function mousePressed() {
  if(gameOver)
    newGame();
  elephant.velocity.y = FLAP;
}