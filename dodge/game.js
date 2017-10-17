var player;
var enemy = [];
var timer;

function setup() {
    createCanvas(500, 500);
    player = createSprite(width/2, height-25, 50, 50);
    timer = 0;
}

function draw() {
    background(0, 0, 100);
    if (timer % 20 == 0) {
        enemy.push(createSprite(random(5, width-5), 5, 10, 10))
    }
    var i;
    for (i = 0; i < enemy.length; i++) {
        enemy[i].position.y += 3;
        if (enemy[i].position.y > height + enemy[i].height/2) {
            removeEnemy(i);
        }
        if (enemy[i].overlap(player)) {
            removeAllEnemies();
        }
    }
    movePlayer();
    drawSprites();
    timer += 1;
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
    var tempEnemy;
    tempEnemy = enemy.slice(0, i);
    enemy = tempEnemy.concat(enemy.slice(i+1, enemy.length));
}