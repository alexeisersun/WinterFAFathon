var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var enemy;
var player;
var cursors;
var guards;
var spaceKey;
var teacher;

function preload() {
    game.load.image('background', 'pic/background.jpg');
    game.load.spritesheet('player', 'pic/dude.png', 32, 48);
    game.load.spritesheet('enemy', 'pic/enemy.png', 32, 48);
    game.load.spritesheet('teacher', 'pic/teacher.png', 32, 48);
}

function create() {

    //  This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    //  We need arcade physics
    //game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A spacey background
    game.add.tileSprite(0, 0, game.width, game.height, 'background');

    //  Our player ship 
    player = game.add.sprite(32, 60, 'player');
    player.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(player, Phaser.Physics.ARCADE);

    //player.body.drag.set(100);
    player.body.maxVelocity.set(200);
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);


    enemy = game.add.sprite(100, 100, 'enemy');
    enemy.anchor.set(0.5);

    game.physics.enable(enemy, Phaser.Physics.ARCADE);

    enemy.body.maxVelocity.set(200);
    enemy.body.collideWorldBounds = true;
    enemy.animations.add('left', [0, 1, 2, 3], 10, true);
    enemy.animations.add('right', [5, 6, 7, 8], 10, true);

   teacher = game.add.sprite(200, 200, 'teacher');
    teacher.anchor.set(0.5);

    game.physics.enable(teacher, Phaser.Physics.ARCADE);

    teacher.body.maxVelocity.set(200);
    teacher.body.collideWorldBounds = true;
    teacher.animations.add('left', [0, 1, 2, 3], 10, true);
    teacher.animations.add('right', [5, 6, 7, 8], 10, true);


    //  Game input
    cursors = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

    score = 0;
    scoreText = game.add.text(16, 16, 'Lab done: ' + score.toString(), {  fontSize: '32px', fill: '#000' });
}

function update() {

    player.animations.stop();
    player.body.velocity.x = 0;
    if (cursors.up.isDown)
    {
        player.body.y -= 4;
    }
    else 
    if (cursors.down.isDown)
    {
        player.body.y += 4;
    }

    if (cursors.left.isDown)
    {
        player.body.x -= 4;
        player.animations.play('left');
    }
    else
    if (cursors.right.isDown)
    {
        //player.angle = 90;
        player.body.x += 4;
        player.animations.play('right');
    }else{
        player.animations.stop();
        player.frame = 4;
    }

    if(spaceKey.isDown && areNearby(player, enemy)) {
        score += 0.05;
        scoreText.text = 'Lab done: ' + Math.round(score * 100) / 100 ;
    }

    if(Math.pow((player.body.x - teacher.body.x), 2) + Math.pow((player.body.y - teacher.body.y), 2) < 1000){
        score -= 0.15;
        scoreText.text = 'Lab done: ' + Math.round(score * 100) / 100 ;
    }
    if (score < 0){
        gameOver(player, teacher, enemy);
    }
    screenWrap(player);
    moveEnemy(enemy);
    moveTeacher(teacher, player);
}


function gameOver(player, teacher, enemy) {
    player.kill();
    teacher.kill();
    enemy.kill();
    scoreText.text = 'Game Over!';
    if(spaceKey.downDuration(50)){
        create();
    }
}

function moveTeacher(teacher, player) {
    if(player.body.x > teacher.body.x){
        teacher.body.x += 1;
    }
    else
    {
        teacher.body.x -= 1;
    }

    if(player.body.y > teacher.body.y){
        teacher.body.y += 1;
    }else{
        teacher.body.y -= 1;
    }
}

function areNearby(player, enemy){
    return Math.pow((player.body.x - enemy.body.x), 2) + Math.pow((player.body.y - enemy.body.y), 2) < 1000
}

function moveEnemy(enemy){
    enemy.body.x += 7 - Math.random() * 14;
    enemy.body.y += 7 - Math.random() * 14;
}

function screenWrap (player) {

    if (player.x < 0)
    {

        player.x = game.width;
    }
    else if (player.x > game.width)
    {
        player.x = 0;
    }

    if (player.y < 0)
    {
        player.y = game.height;
    }
    else if (player.y > game.height)
    {
        player.y = 0;
    }

}

function render() {
}

game.state('start');
