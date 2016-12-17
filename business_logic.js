
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('space', 'pic/background.jpg');
    game.load.image('bullet', 'pic/player.jpg');
    game.load.image('ship', 'pic/player.jpg');
    game.load.image('guard', 'pic/guard.jpg');

}

var player;
var cursors;
var guards;

Guard = function (index, game, player) {
    var x = game.world.randomX;
    var y = game.world.randomY;

    this.guard.visionRegion = game.add.sprite(x, y - 20, 'guard', 'pic/guard_range.jpg');
    this.guard = game.add.sprite(x, y, 'guard', 'pic/guard.jpg');
    this.guard.name = index.toString();
    this.guard.body.collideWorldBounds = true;
}

Player = function(game, labs){

}


function create() {

    //  This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    //  We need arcade physics
    //game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A spacey background
    game.add.tileSprite(0, 0, game.width, game.height, 'space');


    //  Our player ship 
    player = game.add.sprite(300, 300, 'ship');
    player.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(player, Phaser.Physics.ARCADE);

    //player.body.drag.set(100);
    player.body.maxVelocity.set(200);

    //  Game input
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

}

function update() {

    if (cursors.up.isDown)
    {
        player.angle = 0;
        player.body.y -= 3;
    }
    if (cursors.down.isDown)
    {
        player.angle = 180;
        player.body.y += 3;
    }

    if (cursors.left.isDown)
    {
        player.angle = -90;
        player.body.x -= 3;

    }
    
    if (cursors.right.isDown)
    {
        player.angle = 90;
        player.body.x += 3;
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
