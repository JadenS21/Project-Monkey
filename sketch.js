var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;

var score,survivalTime=0;

var fruitGroup,obstacleGroup;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10);
  ground.x=ground.width/2;
  console.log(ground.x)
  
  obstacleGroup = new Group();
  fruitGroup = new Group();
}


function draw() {
createCanvas(600,600);
  
  
  if (gameState===PLAY){
    
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,100,50);
    
   if(keyDown("space") && monkey.y >= 310) {
      monkey.velocityY = -14;
   }
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground)
    
    if (fruitGroup.isTouching(monkey)){
      
      fruitGroup.destroyEach();
    }
    
    spawnfruits();
    spawnObstacles();
    
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    
  }
  else if (gameState===END){
    
    obstacleGroup.setVelocityXEach=0;
    bananaGroup.setVelocityXEach=0;
    
    fruitGroup.setLifetimeEach(-1);
    obastacleGroup.setLifetimeEach(-1);
  }
 
  drawSprites();
}


function spawnfruits(){
  
  if (frameCount % 150 === 0) {
    var banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(170,210));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;}
  //banana.lifetime = 200;
  //fruitGroup.add(banana);
}


function spawnObstacles(){
  
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600,330,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;}
  //obstacle.lifetime = 200;
  //obstacleGroup.add(obstacle);
}