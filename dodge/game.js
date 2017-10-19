var player;
var enemy = [];
var enemyDir = [];
var enemySpeed = [];
var timer;
var score;
var isGameOver;
var img = [];

function preload() {
    img.push(loadImage("circle0.png"));
}

function setup() {
    createCanvas(600, 600);
    player = createSprite(width/2, height-5, 10, 10);
    player.setCollider("rectangle", 0, 0, 10, 10);
    fill("white");
    gameStart();
}

function draw() {
    if (isGameOver) {
        gameOver();
    } else {
        background(0, 0, 100);
        if (timer % 50 == 0) {
            firework(random(5, width-5), 50, 24, random(Math.PI/2), 1)
        }
        var i;
        for (i = 0; i < enemy.length; i++) {
            moveEnemy(i);
            if (enemy[i].overlap(player)) {
                isGameOver = true;
            }
        }
        for (i = 0; i < enemy.length; i++) {
            if (enemy[i].position.y < -enemy[i].height/2 ||
            enemy[i].position.y > height + enemy[i].height/2 || 
            enemy[i].position.x < -enemy[i].width/2 ||
            enemy[i].position.x > width + enemy[i].width/2) {
                removeEnemy(i);
                i--;
            }
        }
        movePlayer();
        drawSprites();
        score += Math.floor(10000/(20 + player.position.y));
        timer += 1;
        text(score, 10, 20);
    }
}

function firework(x, y, n, theta, speed) {
    var i;
    for (i=0; i<n; i++) {
        newEnemy(x, y, 2*Math.PI*i/n + theta, speed);
    }
}

function newEnemy(x, y, dir, speed) {
    enemy.push(createSprite(x, y, 20, 20));
    enemyDir.push(dir);
    enemySpeed.push(speed);
    enemy[enemy.length-1].setCollider("circle", 0, 0, 10, 10);
    enemy[enemy.length-1].addImage(img[0]);
}
function moveEnemy(i) {
    var theta = enemyDir[i];
    var speed = enemySpeed[i];
    enemy[i].position.x += speed*Math.cos(theta);
    enemy[i].position.y += speed*Math.sin(theta);
}
function movePlayer() {
    if (keyDown(RIGHT_ARROW) && player.position.x < width-player.width/2) {
        player.position.x += 2.5;
    }
    if (keyDown(LEFT_ARROW) && player.position.x > player.width/2) {
        player.position.x -= 2.5;
    }
    if (keyDown(DOWN_ARROW) && player.position.y < height-player.height/2) {
        player.position.y += 2.5;
    }
    if (keyDown(UP_ARROW) && player.position.y > player.height/2) {
        player.position.y -= 2.5;
    }
}
function removeAllEnemies() {
    var i;
    for (i = 0; i < enemy.length; i++) {
        enemy[i].remove();
    }
    enemy = [];
    enemyDir = [];
    enemySpeed = [];
}
function removeEnemy(i) {
    enemy[i].remove();
    enemy.splice(i, 1);
    enemyDir.splice(i, 1);
    enemySpeed.splice(i, 1);
}
function gameOver() {
    removeAllEnemies();
    background(0);
    textSize(50);
    textAlign(CENTER);
    text("Game Over", width/2, height/4)
    textSize(20);
    text("Your score is "+ score, width/2, height/2);
    text("Press space to retry", width/2, 3*height/4);
    if (keyDown(32)) {
        gameStart()
    }
}
function gameStart() {
    isGameOver = false;
    timer = 0;
    score = 0;
    player.position.x = width/2;
    player.position.y = height - 5;
}