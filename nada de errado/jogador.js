class Player
{
    constructor(x,y,w,h){
        this.w = w
        this.h = h
        this.x = x 
        this.y = y
        this.corpo = createSprite(this.x,this.y,this.w,this.h)
    }


    show(){
      
      push()
      translate(this.x, this.y)
      rotate(angle)
      fill("red")
      rect(0,0, this.w, this.h)
      angle += 5
      pop()
    }
}