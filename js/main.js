
"use strict"
window.onload = (event) => {
   startGame();
  };

import Component from "./Component.js"

let canvas = document.getElementById("game");
let ctx = canvas.getContext('2d');

let btnUpSwim = document.getElementById("upSwim");

let gamePiece = new Component(30, 30, "green", 10, 120, null, ctx, canvas); // se crea la pieza roja
let myObstacles = [];
let myScore;
let frameNo;
let interval;
let isMouseDown;
let isMouseUp;

function startGame() {
    gamePiece.gravity = 0.05;
    myScore = new Component("30px", "Consolas", "black", 280, 40, "text", ctx, canvas); // puntaje
    startGameArea();

}
 //-----------------------------------------

 function updateGameArea() {
    let x;
    let height;
    let gap; 
    let minHeight;
    let maxHeight;
    let minGap;
    let maxGap;

    for (let i = 0; i < myObstacles.length; i += 1) {
        if (gamePiece.crashWith(myObstacles[i])) {
            return;
        } 
    }
    clearGameArea();
    frameNo += 1;
    if (frameNo == 1 || everyinterval(150)) {
        x = canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new Component(20, height, "blue", x, 0,null, ctx, canvas));
        myObstacles.push(new Component(20, x - height - gap, "blue", x, height + gap, null, ctx, canvas));
    }
    for (let i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="Puntaje: " + frameNo;
    myScore.update();
    gamePiece.newPos();
    gamePiece.update();
}

//------------------------------------------------------

function startGameArea() {
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    frameNo = 0;
    interval = setInterval(updateGameArea, 10);
}

function clearGameArea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function everyinterval(n) {
    if ((frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

function accelerate(n) {
    gamePiece.gravity = n;
}

function onMouseDown(e){
    isMouseUp = false;
    isMouseDown = true;
    console.log(isMouseDown);
    accelerate(e)
}

function onMouseUp(e){
    isMouseDown = false;
    isMouseUp = true;
    console.log(isMouseUp);
    accelerate(e)

}

btnUpSwim.addEventListener('mouseup', onMouseUp(0.05), false);
btnUpSwim.addEventListener('mousedown', onMouseDown(-0.2), false);
