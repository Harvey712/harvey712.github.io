var player;
var enemy = [];
var enemyDir = [];
var enemySpeed = [];
var timer;
var score;
var isGameOver;
var img = [];
var spawnX;
var spawnY;
var spawnDir;
var level;
var midLevel;

function preload() {
    img.push(loadImage("circle0.png"));
    img.push(loadImage("circle1.png"));
}

function setup() {
    createCanvas(600, 600);
    player = createSprite(width/2, height-5, 10, 10);
    player.setCollider("rectangle", 0, 0, 10, 10);
    fill("white");
    gameStart();
}

function draw() {
    if (isGameOver != 0) {
        gameOver();
    } else {
        background(0, 0, 100);
        if (timer < 1500) {
            spawnEnemy(level);
        } else {
            midLevel = false;
        }
        var i;
        for (i = 0; i < enemy.length; i++) {
            moveEnemy(i);
            if (enemy[i].overlap(player)) {
                isGameOver = 1;
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
        
        textSize(20);
        textAlign(LEFT);
        text(score, 10, 20);
        textAlign(RIGHT);
        if (midLevel) {
            text(Math.ceil((1500 - timer)/50), width-10, 20);
        score += Math.floor(10000/(200 + player.position.y));
        }
        
        timer += 1;
        if (!midLevel && enemy.length == 0) {
            midLevel = true;
            timer = 0;
            level += 1;
            if (level > 3) {
                isGameOver = 2;
            }
        }
    }
}

function spawnEnemy(phase) {
    var t;
    if (phase == 0) {
        t = timer % 80;
        if (t == 0) {
            spawnX = random(5, width-5);
            spawnY = 50;
            spawnDir = random(Math.PI/2);
            firework(spawnX, spawnY, 12, spawnDir, 1);
        }
    } else if (phase == 1) {
        t = timer % 80;
        if (t == 0) {
            spawnX = random(5, width-5);
            spawnY = 30;
            spawnDir = random(Math.PI/2);
            firework(spawnX, spawnY, 8, spawnDir, 2);
        } else if (t < 45 && t % 15 == 0) {
            firework(spawnX, spawnY, 8, spawnDir, 2);
        }
    } else if (phase == 2) {
        t = timer % 12;
        if (t == 0) {
            spawnX = random(5, width - 5);
            spawnY = random(5, height/2);
            aimed(spawnX, spawnY, 1.5);
        }
    } else if (phase == 3) {
        t = timer % 120;
        if (t % 60 == 0) {
            spawnX = random(5, width - 5);
            spawnY = 50;
            firework(spawnX, spawnY, 10, 0, 1);
        }
        if (t == 0) {
            var i;
            for (i=0; i<height/2; i+=40) {
                aimed(5, i, 4);
                aimed(width-5, i, 4);
            }
        }
    }
}
function firework(x, y, n, theta, speed) {
    var i;
    for (i=0; i<n; i++) {
        newEnemy(x, y, 2*Math.PI*i/n + theta, speed, 0);
    }
}
function aimed(x, y, speed) {
    newEnemy(x, y, Math.atan2(player.position.y - y, player.position.x - x), speed, 1);
}

function newEnemy(x, y, dir, speed, image) {
    enemy.push(createSprite(x, y, 20, 20));
    enemyDir.push(dir);
    enemySpeed.push(speed);
    enemy[enemy.length-1].addImage(img[image]);
    if (image == 0) {
        enemy[enemy.length-1].setCollider("circle", 0, 0, 10, 10);
    } else if (image == 1) {
        enemy[enemy.length-1].setCollider("circle", 0, 0, 4, 4);
    }
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
    if (isGameOver == 1) {
        text("Game Over", width/2, height/4);
    } else if (isGameOver == 2) {
        text("You win!", width/2, height/4);
    }
    textSize(20);
    text("Your score is "+ score, width/2, height/2);
    text("Press space to retry", width/2, 3*height/4);
    if (keyDown(32)) {
        gameStart()
    }
}
function gameStart() {
    isGameOver = 0;
    timer = 0;
    score = 0;
    level = 0;
    midLevel = true;
    player.position.x = width/2;
    player.position.y = height - 5;
}