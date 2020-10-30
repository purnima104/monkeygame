var PLAY = 1;
var END = 0;
var gameState = PLAY;


var banana ,bananaImage
var  obstacleImage
var FoodGroup, obstacleGroup
var ground, invisible
var monkey , monkey_running
var survival;
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)
  
  
  
  ground = createSprite(200,180,1200,20);
  ground.x = ground.width /2;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
 
  obstacleGroup = createGroup();
  FoodGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,20,100);
  
  
  survival = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("survival: "+ survival, 500,50);
  
  
  if(gameState === PLAY){
  ground.velocityX = -(4 + 3* survival/100)
    //scoring
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach(); 
      survival=survival+1
    }
    
    
      
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&&monkey.y>100){
        jumpi();
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    
    spawnBanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
            
    }
  }
   else if (gameState === END) {
      
     
 
      
    
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
   }
  
 
 
      monkey.collide(ground);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + survival/100);
   obstacle.addImage(obstacleImage)
   
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnBanana() {
  
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(5 + survival/100);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    
    FoodGroup.add(banana);
  }
}
function jumpi(){
  monkey.velocityY=-12
}

