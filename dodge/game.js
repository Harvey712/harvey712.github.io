var player;
var enemy = [];
var enemyDir = [];
var timer;
var isGameOver;

function setup() {
    createCanvas(500, 500);
    player = createSprite(width/2, height-25, 50, 50);
    timer = 0;
    fill("white");
    isGameOver = false;
}

function draw() {
    if (isGameOver) {
        gameOver();
    } else {
        background(0, 0, 100);
        if (timer % 20 == 0) {
            enemy.push(createSprite(random(5, width-5), 5, 10, 10))
            enemyDir.push(random(Math.PI/4, 3*Math.PI/4));
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
                break;
            }
        }
        movePlayer();
        drawSprites();
        text(timer, 10, 20);
        timer += 1;
    }
}

function moveEnemy(i) {
    var theta = enemyDir[i];
    enemy[i].position.x += 3*Math.cos(theta);
    enemy[i].position.y += 3*Math.sin(theta);
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
}
function removeEnemy(i) {
    enemy[i].remove();
    enemy.splice(i, 1);
    enemyDir.splice(i, 1);
}
function gameOver() {
    removeAllEnemies();
    background(0);
    textSize(50);
    textAlign(CENTER);
    text("Game Over", width/2, height/4)
    textSize(20);
    text("Your score is "+timer, width/2, height/2);
    text("Press space to retry", width/2, 3*height/4);
    if (keyDown(32)) {
        isGameOver = false;
        timer = 0;
    }
}