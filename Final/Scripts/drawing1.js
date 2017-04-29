
var elephant;
var platform;
var collide = 0;

var GRAVITY = 1;
var JUMP = 15;

function setup() 
{
  createCanvas(windowWidth,windowHeight);  
  
  elephant = createSprite(width/2, height/2);  
  elephant.addAnimation("normal", "Images/elephant-1.png", "Images/elephant-3.png");
  elephant.addAnimation("stretch", "Images/elephant-jump-1.png", "Images/elephant-jump-3.png");
  
  //if defined, the collider will be used for mouse events
  elephant.setCollider("circle", 0,0,50);
  
  platform = createSprite(width/2, 100 + height/2);
  platform.addAnimation("normal", "Images/platform-1.png",  "Images/platform-3.png");
  platform.addAnimation("hit", "Images/platform-hit-1.png",  "Images/platform-hit-3.png");
  
  // add a special animation for platform so that on collision, both change
  
}

function draw() 
{
  background(247, 134, 131); 
  
  fill(200);
  textAlign(CENTER);
  text("Press X or LEFT CLICK to jump!", width/2, 20);
  text("You jumped " + collide + " times!", width/2, 40);
  
  elephant.velocity.y += GRAVITY;
  
  if(elephant.collide(platform)) 
  {
    elephant.velocity.y = 0;
    elephant.changeAnimation("normal");
	platform.changeAnimation("hit");
	
	// add change for platform
  }
  
  if(keyWentDown("x") || mouseWentDown(LEFT))
  {
    elephant.changeAnimation("stretch");
    elephant.animation.rewind();
    elephant.velocity.y = -JUMP;
	platform.changeAnimation("normal");
	collide++;
  }
  
  
  drawSprites();
}