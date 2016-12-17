
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('background', 'pic/background.jpg');
    game.load.spritesheet('player', 'pic/dude.png', 32, 48);

}

var player;
var cursors;
var guards;


function create() {

    //  This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    //  We need arcade physics
    //game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A spacey background
    game.add.tileSprite(0, 0, game.width, game.height, 'background');


    //  Our player ship 
    player = game.add.sprite(32, game.world.height - 150, 'player');
    player.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(player, Phaser.Physics.ARCADE);

    //player.body.drag.set(100);
    player.body.maxVelocity.set(200);
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Game input
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    scoreText = game.add.text(16, 16, 'Score: 0', {  fontSize: '32px', fill: '#000' });
}

function update() {
    player.animations.stop();
    player.body.velocity.x = 0;
    if (cursors.up.isDown)
    {
        //player.angle = 0;
        player.body.y -= 4;

    }else 
    if (cursors.down.isDown)
    {
        //player.angle = 180;
        player.body.y += 4;
    }

    if (cursors.left.isDown)
    {
        //player.angle = -90;
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


    screenWrap(player);
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
