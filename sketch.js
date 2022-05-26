// Primeiro sempre as variaveis.
var trex ,trex_running;
var solo, soloimg, soloinv;
var nuvem, nuvemimg
var obstaculo, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6
var pontuacao=0;
var gpNuvens
var obstaculos
var PLAY=1
var AND=0
var GameState=PLAY
var trexMorto
var gameover, gameoverimg
var restart, restartimg
var die
var jump
var point

 function preload(){  //carregamento de imagens
 // variavel para carregar a imagem de animação do Trex correndo
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
soloimg=loadImage("ground2.png")
nuvemimg=loadImage("cloud.png")
obstaculo1=loadImage("obstacle1.png")
obstaculo2=loadImage("obstacle2.png")
obstaculo3=loadImage("obstacle3.png")
obstaculo4=loadImage("obstacle4.png")
obstaculo5=loadImage("obstacle5.png")
obstaculo6=loadImage("obstacle6.png")
trexMorto=loadImage("trex_collided.png")
gameoverimg=loadImage("gameOver.png")
restartimg=loadImage("restart.png")
die=loadSound("die.mp3")
jump=loadSound("jump.mp3")
point=loadSound("checkpoint.mp3")
}//chave de fechamento do function preload

function setup(){// criar os sprites e configurações do jogo
  createCanvas(windowWidth,windowHeight); //criar a tela do jogo
  var mensagem="esta é uma mensagem"
  console.log(mensagem)
    //criar sprite trex
    trex=createSprite(50,height-95,20,50); 
   trex.addAnimation("running",trex_running) 
  trex.addAnimation("morto", trexMorto)
  gameover=createSprite(width/2,height/2-50)
  gameover.addImage(gameoverimg)
  restart=createSprite(width/2,height/2)
  restart.addImage(restartimg)
    //criar solo
solo=createSprite(width/2,height-95,width,20)
solo.addImage(soloimg)  

soloinv=createSprite(width/2,height-90,width,20)
soloinv.visible=false
gpNuvens=new Group()
obstaculos=new Group()
var rand= Math.round(random(10,60))
console.log(rand)
trex.debug=true
trex.setCollider("rectangle",0,0,40,trex.height)
}//chave de fechamento do function setup

function draw(){ // o que vai executar varias vezes dentro do codigo.
  background("white"); //pintar a tela, sempre a primeira coisa do function draw.
  text("pontuação:"+pontuacao,500,50)
  
if(GameState===PLAY){
  pontuacao=pontuacao+Math.round(getFrameRate()/60)
  solo.velocityX=-(4*pontuacao/60)
  gerarnuvens()
  gerarobstaculos();
  gameover.visible=false
  restart.visible=false
  if (solo.x<width/2) {
    solo.x=solo.width/2
  }
  if (touches.length>0||keyDown("space")&& trex.y>=100) {
    jump.play()
    trex.velocityY=-10
    touches=[]
  }
  
  if(pontuacao>0&& pontuacao%100===0){
    point.play()
  }

  if(obstaculos.isTouching(trex)){GameState=AND
  die.play()
  }
}
else if(GameState===AND){
solo.velocityX=0
trex.changeAnimation("morto",trexMorto)
gameover.visible=true
restart.visible=true
obstaculos.setVelocityXEach(0)
gpNuvens.setVelocityXEach(0)
obstaculos.setLifetimeEach(-1)
gpNuvens.setLifetimeEach(-1)
trex.velocityY=0}
trex.velocityY=trex.velocityY+0.5
trex.collide(soloinv)
if(touches.length>0||mousePressedOver(restart)){
  reset()
  touches=[]
}

  drawSprites(); // desenhar sprites, sempre é a ultima coisa dentro do function draw.
}// chave de fechamento do function draw.
function gerarnuvens(){
  if (frameCount%60===0) {
    nuvem=createSprite(width+20,100,40,10)
    nuvem.addImage(nuvemimg)
  nuvem.velocityX=-3
  nuvem.y=Math.round(random(height-100,height-300))

  trex.depth=nuvem.depth
  trex.depth+=1
  nuvem.lifetime=width/nuvem.velocityX
  gpNuvens.add(nuvem)}}
  function gerarobstaculos() {
    if(frameCount%60===0){
    obstaculo=createSprite(width+20, height-95, 10,40)
  obstaculo.velocityX= -(4* pontuacao/100)
  var rand=Math.round(random(1,6))
switch(rand){
case 1:obstaculo.addImage(obstaculo1);
break;
case 2:obstaculo.addImage(obstaculo2);
break;
case 3:obstaculo.addImage(obstaculo3);
break;
case 4:obstaculo.addImage(obstaculo4);
break;
case 5:obstaculo.addImage(obstaculo5);
break;
case 6:obstaculo.addImage(obstaculo6);
break;
default:break;
}
obstaculo.scale=0.5
obstaculo.lifetime=width/obstaculo.velocityX
obstaculos.add(obstaculo)}

  }
  function reset(){
    GameState=PLAY
    trex.changeAnimation("running",trex_running)
    obstaculos.destroyEach()
    gpNuvens.destroyEach()
    pontuacao=0
  }