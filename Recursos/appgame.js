"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.style.border = "1px solid #000";
const widthBlock = 100;
const heightBlock = 100;
const spaceColor = "#000";
const planetsList = [];
const enemiesList = [];
const ammunitionList = [];
let collisionEnemy = false;
let collisionPlayer = false;
const audioGame = new Audio();
audioGame.src = "../audio/audioGame.mp3";
audioGame.play();
// scene
const scene = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];
// writeScene
function writeScene (){
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 10; x++) {
            //  if(scene[y][x] == 0){
                 ctx.fillStyle = spaceColor;
                 ctx.fillRect(x*widthBlock,y*heightBlock,widthBlock,heightBlock);
            //  } 
        };
    };
};
// Write Objects
function planets (posX,posY,radio,startAngle,endAngle,color,velocity) {
    this.posX = posX;
    this.posY = posY;
    this.radio = radio;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.color = color;
    this.velocity = velocity;
    this.writePlanets = function () {
        ctx.beginPath();
        ctx.arc(this.posX,this.posY,this.radio,this.startAngle,this.endAngle);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    this.moveBottom = function () {
        this.posX -= this.velocity;
        if(this.posX < 0) {
            this.posX = 1100; 
            this.posX = Math.random()*1100;
        }
    };
};
planetsList.push(new planets(1100,Math.random()*500,10,0,2*Math.PI,"rgba(92,28,97,0.5)",0.5));
planetsList.push(new planets(1100,Math.random()*500,15,0,2*Math.PI,"rgba(92,28,97,0.7)",0.75));
planetsList.push(new planets(1100,Math.random()*500,5,0,2*Math.PI,"rgba(92,28,97,0.25)",1.5));
planetsList.push(new planets(1100,Math.random()*500,10,0,2*Math.PI,"rgba(92,28,97,0.5)",1.75));
planetsList.push(new planets(1100,Math.random()*500,15,0,2*Math.PI,"rgba(92,28,97,0.7)",2));
planetsList.push(new planets(1100,Math.random()*500,5,0,2*Math.PI,"rgba(92,28,97,0.25)",2.25));
planetsList.push(new planets(1100,Math.random()*500,10,0,2*Math.PI,"rgba(92,28,97,0.5)",2.50));
planetsList.push(new planets(1100,Math.random()*500,15,0,2*Math.PI,"rgba(92,28,97,0.7)",1));
planetsList.push(new planets(1100,Math.random()*500,5,0,2*Math.PI,"rgba(92,28,97,0.25)",0.7));
planetsList.push(new planets(1100,Math.random()*500,10,0,2*Math.PI,"rgba(92,28,97,0.5)",0.70));
planetsList.push(new planets(1100,Math.random()*500,15,0,2*Math.PI,"rgba(92,28,97,0.7)",0.8));
planetsList.push(new planets(1100,Math.random()*500,5,0,2*Math.PI,"rgba(92,28,97,0.25)",1.96));
planetsList.push(new planets(1100,Math.random()*500,10,0,2*Math.PI,"rgba(92,28,97,0.5)",1.45));
planetsList.push(new planets(1100,Math.random()*500,15,0,2*Math.PI,"rgba(92,28,97,0.7)",2.6));
planetsList.push(new planets(1100,Math.random()*500,5,0,2*Math.PI,"rgba(92,28,97,0.25)",2.45));
planetsList.push(new planets(1100,Math.random()*500,10,0,2*Math.PI,"rgba(92,28,97,0.5)",2.60));
planetsList.push(new planets(1100,Math.random()*500,15,0,2*Math.PI,"rgba(92,28,97,0.7)",2.5));
planetsList.push(new planets(1100,Math.random()*500,5,0,2*Math.PI,"rgba(92,28,97,0.25)",1.5));

function aeronaut (posX,posY,width,height,color,velocity) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = velocity;
    this.writeAeronaut = function () {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.posX,this.posY,this.width,this.height);
        if(collisionPlayer){
            let playerCollisionPNG = new Image();
            playerCollisionPNG.src = "../images/playerCollision.png";
            ctx.drawImage(playerCollisionPNG,this.posX,this.posY,this.width,this.height);
            setTimeout(()=>{
                collisionPlayer = false;
            },1000);
        }
        else{
            let playerPNG = new Image();
            playerPNG.src = "../images/player.png";
            ctx.drawImage(playerPNG,this.posX,this.posY,this.width,this.height);
        }
    };
    this.moveTop = function () {
        if(this.posY > 0) {
            this.posY -= 10;
            ammunitionPlayerList.forEach(ammunitionPlayer=> ammunitionPlayer.posY -= 10);
        }
    };
    this.moveBottom = function () {
        if(this.posY < 450) {
            this.posY += 10;
            ammunitionPlayerList.forEach(ammunitionPlayer=> ammunitionPlayer.posY += 10);
        }
    };
    this.moveLeft = function () {
        if(this.posX > 0) {
            this.posX -= 10;
            ammunitionPlayerList.forEach(ammunitionPlayer=> ammunitionPlayer.posX -= 10);
        }
    };
    this.moveRight = function () {
        if(this.posX < 950) {
            this.posX += 10;
            ammunitionPlayerList.forEach(ammunitionPlayer=> ammunitionPlayer.posX += 10);
        }
    };
};
const player = new aeronaut(10,200,50,50,"#00f",0.5);
function ammunitionRightPlayer (posX,posY,width,height,color,velocity) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = velocity;
    this.writeAmmunition = function () {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.posX,this.posY,this.width,this.height);
        let ammunitionPlayerPNG = new Image();
        ammunitionPlayerPNG.src = "../images/ammunitionPlayer.png";
        ctx.drawImage(ammunitionPlayerPNG,this.posX,this.posY,this.width,this.height);
    };
    this.attackEnemyRight = function () {
        const attack = setInterval(()=>{
            this.posX += 10
        },10);
        if(this.posX > 1000) {
            this.posX = player.posX + 40;
            this.posY = player.posY + 20;
            clearInterval(attack);
        }
    };
};
const ammunition1Player = new ammunitionRightPlayer(player.posX + 35,player.posY + 20,15,10,"#fff",0.5);
function ammunitionTopPlayer (posX,posY,width,height,color,velocity) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = velocity;
    this.writeAmmunition = function () {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.posX,this.posY,this.width,this.height);
        let ammunitionPlayerPNG = new Image();
        ammunitionPlayerPNG.src = "../images/ammunitionPlayer.png";
        ctx.drawImage(ammunitionPlayerPNG,this.posX,this.posY,this.width,this.height);
    };
    this.attackEnemyTop = function () {
        const attack = setInterval(()=>{
            this.posX += 10;
            this.posY -= 7
        },10);
        if(this.posY < 0 || this.posX > 1000) {
            this.posX = player.posX + 40;
            this.posY = player.posY + 20;
            clearInterval(attack);
        }
    };
};
const ammunition2Player = new ammunitionTopPlayer(player.posX + 35,player.posY + 20,15,10,"#fff",0.5);
function ammunitionBottomPlayer (posX,posY,width,height,color,velocity) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = velocity;
    this.writeAmmunition = function () {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.posX,this.posY,this.width,this.height);
        let ammunitionPlayerPNG = new Image();
        ammunitionPlayerPNG.src = "../images/ammunitionPlayer.png";
        ctx.drawImage(ammunitionPlayerPNG,this.posX,this.posY,this.width,this.height);
    };
    this.attackEnemyBottom = function () {
        const attack = setInterval(()=>{
            this.posX += 10;
            this.posY += 7;
        },10);
        if(this.posY > 500 || this.posX > 1000) {
            this.posX = player.posX + 40;
            this.posY = player.posY + 20;
            clearInterval(attack);
        }
    };
};
const ammunition3Player = new ammunitionBottomPlayer(player.posX + 35,player.posY + 20,15,10,"#fff",0.5);
const ammunitionPlayerList = [ammunition3Player,ammunition2Player,ammunition1Player];
function enemies (posX,posY,width,height,color,velocity) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = velocity;
    this.writeEnemy = function () {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.posX,this.posY,this.width,this.height);
        let enemyPNG = new Image();
        enemyPNG.src = "../images/enemy.png";
        ctx.drawImage(enemyPNG,this.posX,this.posY,this.width,this.height);
    };
    this.moveLeft = function () {
        this.posX -= this.velocity;
        this.posY -= 0.20;
        if (this.posX <= -50 || this.posY <= -50) {
            this.posX = 1050;
            this.posY = Math.random()*500;
        }
    };
};
let random1 = Math.random()*500;
let random2 = Math.random()*500;
let random3 = Math.random()*500;
let random4 = Math.random()*500;
let random5 = Math.random()*500;
let random6 = Math.random()*500;
let random7 = Math.random()*500;
let random8 = Math.random()*500;
enemiesList.push(new enemies(100,random1,50,50,"#f00",0.5));
enemiesList.push(new enemies(100,random2,50,50,"#f00",1));
enemiesList.push(new enemies(100,random3,50,50,"#f00",1.75));
enemiesList.push(new enemies(100,random4,50,50,"#f00",2.25));
enemiesList.push(new enemies(100,random5,50,50,"#f00",1.4));
enemiesList.push(new enemies(100,random6,50,50,"#f00",3.5));
enemiesList.push(new enemies(100,random7,50,50,"#f00",1.75));
enemiesList.push(new enemies(100,random8,50,50,"#f00",0.4));

function ammunitionEnemies (posX,posY,width,height,color,velocity) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = velocity;
    this.writeAmmunition = function () {
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.posX,this.posY,this.width,this.height);
        let ammunitionPlayerPNG = new Image();
        ammunitionPlayerPNG.src = "../images/ammunitionEnemy.png";
        ctx.drawImage(ammunitionPlayerPNG,this.posX,this.posY,this.width,this.height);
    };
    this.attackPlayer = function () {
        this.posX -= 20;
        this.posY -= 0.20;
    };
};
ammunitionList.push(new ammunitionEnemies(100,random1 + 20,15,10,"#fff",0.5));
ammunitionList.push(new ammunitionEnemies(100,random2 + 20,15,10,"#fff",1));
ammunitionList.push(new ammunitionEnemies(100,random3 + 20,15,10,"#fff",1.75));
ammunitionList.push(new ammunitionEnemies(100,random4 + 20,15,10,"#fff",2.25));
ammunitionList.push(new ammunitionEnemies(100,random5 + 20,15,10,"#fff",1.4));
ammunitionList.push(new ammunitionEnemies(100,random6 + 20,15,10,"#fff",3.5));
ammunitionList.push(new ammunitionEnemies(100,random7 + 20,15,10,"#fff",1.75));
ammunitionList.push(new ammunitionEnemies(100,random8 + 20,15,10,"#fff",0.4));
// mark
const puntuacion = document.getElementById("puntuacion");
const lives = document.getElementById("lives");
const record = document.getElementById("record");
let newPuntuacion = 0;
let newLives = 10;
let newRecord = 0;
puntuacion.textContent = newPuntuacion;
lives.textContent = newLives;
record.textContent = localStorage.getItem("record");
// collision
function collision () {
    enemiesList.forEach(enemy=>{
        ammunitionList.forEach(ammunition=>{
            ammunitionPlayerList.forEach(ammunition=>{
                if(ammunition.posX + 10 >= enemy.posX &&
                    ammunition.posY >= enemy.posY &&
                    ammunition.posY <= enemy.posY + 50 && 
                    ammunition.posX <= enemy.posX + 50){
                        enemy.posX = 1050;
                        enemy.posY = Math.random()*500;
                        ammunition.posX = player.posX;
                        puntuacion.textContent = newPuntuacion += 1;
                        collisionEnemy = true;
                        explosionEnemy.play();
                }
            });
            if(player.posX + 50 >= enemy.posX && 
                player.posY >= enemy.posY &&
                player.posY <= enemy.posY + 50){
                    enemy.posX = 1050;
                    enemy.posY = Math.random()*500;
                    lives.textContent = newLives -= 1;
                    collisionEnemy = true;
                    collisionPlayer = true;
                    collisionSound.play();
                    if(newLives <= 0){
                        lives.textContent = 0;
                        window.location.href = "gameOver.html";
                        if(newPuntuacion > newRecord){
                            localStorage.setItem("record",newPuntuacion);
                        }
                    }
            }
            if(player.posX + 50 >= ammunition.posX && 
                player.posY >= ammunition.posY &&
                player.posY <= ammunition.posY + 10){
                    ammunition.posX = 1050;
                    lives.textContent = newLives -= 1;
                    collisionEnemy = true;
                    collisionPlayer = true;
                    if(newLives <= 0){
                        lives.textContent = 0;
                        window.location.href = "gameOver.html";
                        if(newPuntuacion > newRecord){
                            localStorage.setItem("record",newPuntuacion);
                        }
                    }
                }
        });
    });
};
const shoot = new Audio();
shoot.src = "../audio/shoot.mp3";
const explosionEnemy = new Audio();
explosionEnemy.src = "../audio/explosionEnemy.mp3";
const collisionSound = new Audio();
collisionSound.src = "../audio/collisionSound.mp3";
const gameOver = new Audio();
gameOver.src = "../audio/gameOver.mp3";
// Event Game
addEventListener("keydown",(e)=>{
    e.preventDefault();
    if(e.key == "w" || e.key == "W") player.moveTop();
    else if (e.key == "s" || e.key == "S") {
        player.moveBottom();
    }
    else if (e.key == "a" || e.key == "A") player.moveLeft();
    else if (e.key == "d" || e.key == "D") player.moveRight();
    else if (e.key == " ") {
        ammunition1Player.attackEnemyRight();
        shoot.play();
    }
    else if (e.key == "q" || e.key == "Q") {
        ammunition2Player.attackEnemyTop();
        shoot.play();
    }
    else if (e.key == "e" || e.key == "E") {
        ammunition3Player.attackEnemyBottom();
        shoot.play();
    }
});
// clear canvas
function clearCanvas (){
    canvas.width = 1000;
    canvas.height = 500;
};
// function principal 
function principal () {
    requestAnimationFrame(principal);
    clearCanvas();
    writeScene();
    collision();
    ammunition1Player.writeAmmunition();
    ammunition2Player.writeAmmunition();
    ammunition3Player.writeAmmunition();
    for (let i = 0; i < planetsList.length; i++) {
        planetsList[i].writePlanets(); 
        planetsList[i].moveBottom();
    };
    for (let i = 0; i < ammunitionList.length; i++) {
        ammunitionList[i].writeAmmunition(); 
        if(player.posY >= enemiesList[i].posY - 50 &&
            player.posY <= enemiesList[i].posY + 100){
                ammunitionList[i].attackPlayer()
            }
        else { 
            ammunitionList[i].posX = enemiesList[i].posX;  
            ammunitionList[i].posY = enemiesList[i].posY + 20;
        }
    };
    for (let i = 0; i < enemiesList.length; i++) {
        enemiesList[i].writeEnemy();
        enemiesList[i].moveLeft();
    };
    player.writeAeronaut();
};
principal(); 