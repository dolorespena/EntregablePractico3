
export default class Component{

    constructor(width, height, color, x, y, type, ctx, canvas) { //Constructor
        this.type = type;
        this.score = 0;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;    
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.ctx = ctx;
        this.color = color;
        this.canvas = canvas
    }

    update() { //actualizacion de componente
        if (this.type == "text") {
            this.ctx.font = this.width + " " + this.height;
            this.ctx.fillStyle = this.color;
            this.ctx.fillText(this.text, this.x, this.y);
        } else {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    
    newPos() { // nueva posicion
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    
    hitBottom() { //tocar fondo
        let rockbottom = this.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    
    crashWith(obj) { //chocar con un objeto
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = obj.x;
        let otherright = obj.x + (obj.width);
        let othertop = obj.y;
        let otherbottom = obj.y + (obj.height);
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }



}