var Calvo, Calvo_parado, Calvo_correndo
var Corpo
var teste, teste2, teste3
var angle = 0
var fogo, fogoImg
var fogo_tempo
const ValorTF = 5


function preload(){
  Calvo_parado = loadImage("Assets/Calvo_parado.png")
  Calvo_correndo - loadAnimation("Assets/Calvo_correndo_Img1.png","Assets/Calvo_correndo_Img2.png","Assets/Calvo_correndo_Img3.png","Assets/Calvo_correndo_Img4.png","Assets/Calvo_correndo_Img5.png")
  fogoImg = loadImage("Assets/foguinho.png")
}


function setup() 
{
  createCanvas(windowWidth, windowHeight)


  //área do Calvo
  Calvo = createSprite(windowHeight/2, windowWidth/2, 60, 60)
  Calvo.addImage("normal", Calvo_parado)
  Calvo.addAnimation("correndo", Calvo_correndo)
  Calvo.scale =  2
  Calvo.y = windowHeight/2
  Calvo.x = windowWidth/2

  //tempo do cooler do tiro
  fogo_tempo = ValorTF

  //teste de inimigos futuros
  teste = createSprite(700,700,70,70)
  teste2 = createSprite(600,900,70,70)
  teste3 = createSprite(1100,200,70,70)

  //evitar bug
  angleMode(DEGREES)
  rectMode(CENTER)
  imageMode(CENTER)
}

function draw() 
{
  
  background("white")

  if(Calvo.velocity.x == 0 && calvo.velocity.y == 0){
    calvo.changeImage("normal")
  }else calvo.changeAnimation("correndo")
  //diminuir cooler do tiro
  if(fogo_tempo > 0){
    fogo_tempo -= 1
  }



  //movimento
  walk()
  
  //virar
  Calvo.rotation = angle*45



  
  console.log(fogo_tempo)
  drawSprites();
}

//ele mede o angulo e atira no valor do angulo*45
function keyPressed(){
  let Fvv = 20
  if(keyCode === 90 && fogo_tempo == 0){
    //área do fogo
    var fogo = createSprite(Calvo.x, Calvo.y, 10, 10)
    fogo.addImage("indo", fogoImg)
    fogo.scale = 2

    let Fvel = fogo.velocity

    //mediar para onde ir de acordo com o angle
    if(angle == 0){
      Fvel.y = -Fvv
    }else{
      if(angle == 2){
        Fvel.x = Fvv
      }else{
        if(angle == 4){
          Fvel.y = Fvv
        }else{
          if(angle == 6){
            Fvel.x = -Fvv
          }else{
            if(angle ==1){
              Fvel.x = Math.sqrt(Math.pow(Fvv,2)*2) /2
              Fvel.y = -Math.sqrt(Math.pow(Fvv,2)*2) /2
            }else{
              if(angle == 3){
                Fvel.x = Math.sqrt(Math.pow(Fvv,2)*2) /2
                Fvel.y = Math.sqrt(Math.pow(Fvv,2)*2) /2
              }else{
                if(angle == 5){
                  Fvel.x = -Math.sqrt(Math.pow(Fvv,2)*2) /2
                  Fvel.y = Math.sqrt(Math.pow(Fvv,2)*2) /2
                }else{
                  if(angle == 7){
                    Fvel.x = -Math.sqrt(Math.pow(Fvv,2)*2) /2
                    Fvel.y = -Math.sqrt(Math.pow(Fvv,2)*2) /2
                  }
                }
              }
            }
          }
        }
      }
    }
    //rotacionar para a direção da velocidade de acordo com angle
    fogo.rotation = angle*45

    //cooler do tiro
    fogo_tempo = ValorTF
  }
}




function walk(){
  //comandos para facilitar a escrita
  let vel = Calvo.velocity
  let medida1 = false
  let medida2 = false
  let medida3 = false
  let medida4 = false
  let k = keyDown
  let VV = 5
  

  //comandos para facilitar a escrita
  if(k("w")|| k("up"))
  {
    medida1 = true
  }else medida1 = false

 if(k("s")|| k("down"))
  {
    medida2 = true
  }else medida2 = false

  if(k("a")|| k("left"))
  {
    medida3 = true
  }else medida3 = false
  if(k("d")|| k("right") )
  {
    medida4 = true
  }else medida4 = false






  /*responder caso apenas uma for ligada e confirmar o oposto
  ex: w, ele confirma ir para cima e confirma ir para baixo por preucação
  */
  if (medida1 && !medida2 && !medida3 && !medida4) {
    vel.y = -VV;
    
    angle = 0
    
  }else{
    if(!medida1 && medida2 && !medida3 && !medida4){
      vel.y = VV;
      angle = 4
      }else{
        if(!medida1 && !medida2){
          vel.y = 0
          
        }
      }
  }

  


  if (medida2 && !medida1 && !medida3 && !medida4) {
    vel.y = VV;
    
    angle = 4
    
  }else{
    if(medida1 && !medida2 && !medida3 && !medida4){
      vel.y = -VV;
      angle = 0

      }else{
        if(!medida1 && !medida2){
          vel.y = 0
          
        }
      }
  }




  if (medida3 && !medida1 && !medida2 && !medida4) {
    vel.x = -VV;
    
    angle = 6
    
    
  }else{
    if(!medida3 && medida4 && !medida1 && !medida2){
      vel.x = VV;
      angle = 2
      
      }else{
        if(!medida3 && !medida4){
          vel.x = 0
        }
          
        
      }
    
  }
  



  if (medida4 && !medida1 && !medida2 && !medida3)  {
    vel.x = VV;
    

      angle = 2
     
  }else{
    if(medida3 && !medida4&& !medida2 && !medida1){
      vel.x = -VV;
      angle = 6
      
      }else{
        if(!medida3 && !medida4){
          vel.x = 0
        }
      }
  }
  

  /*responder caso apenas duas estejam ligado(diagonal)
  ex: w d, vai em diagonal
  */
  if(medida2 && medida3 && !medida1 && !medida4){
    vel.x = -Math.sqrt(Math.pow(VV,2)*2) /2
    vel.y = Math.sqrt(Math.pow(VV,2)*2) /2
    angle = 5
  }else{
    if(medida2 && medida4 && !medida1 && !medida3){
      vel.x = Math.sqrt(Math.pow(VV,2)*2) /2
      vel.y = Math.sqrt(Math.pow(VV,2)*2) /2
      angle = 3
    }
  }

  if(medida1 && medida3&& !medida2 && !medida4){
    vel.x = -Math.sqrt(Math.pow(VV,2)*2) /2
    vel.y = -Math.sqrt(Math.pow(VV,2)*2) /2
    angle = 7
  }else{
    if(medida1 && medida4&& !medida2 && !medida3){
      vel.x = Math.sqrt(Math.pow(VV,2)*2) /2
      vel.y = -Math.sqrt(Math.pow(VV,2)*2) /2
      angle = 1
    }
  }


  /*responder caso 2 estejam ligado(anular direções opostas)
  ex: w s, ele anula a velocidade y
  */
  if(medida1 && medida2 && !medida3 && !medida4){
    vel.y = 0
     
  }
    
  if(!medida1 && !medida2 && medida3 && medida4){
    vel.x = 0
    
  }
    
  if(medida1 && medida2 && medida3 && medida4){
    vel.x = 0
    
  }
      
    
  
  

  /* responder caso 3 estão ligado(anular direções opostas e continuar reto o único)
  ex: w s d, ele anula a velocidade y e continua a velocidade x
  */
  if(medida1 && !medida2 && medida3 && medida4){
    vel.x = 0
    vel.y = -VV
    angle = 0
  }

  if(!medida1 && medida2 && medida3 && medida4){
    vel.x = 0
    angle = 4
    vel.y = VV
  }
  if(medida1 && medida2 && medida3 && !medida4){
    vel.y = 0
    angle = 6
    vel.x = -VV
  }
  if(medida1 && medida2 && !medida3 && medida4){
    vel.y = 0
    angle = 2
    vel.x =  VV
  }
  
  
  
  
  
  
  

  
  
  console.log(angle)

  }






