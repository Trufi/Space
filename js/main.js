var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamewrap', {preload: preload, create: create, update: update, render: render});

var playerShip;
var sprite;
var graphics;
var cursors;

function preload() {
    game.load.image('background', 'img/bg.jpeg');
    game.load.image('ship', 'img/ship2.png');
}

function create() {
    game.world.setBounds(0, 0, 1920, 1200);
    game.add.sprite(0, 0, 'background');

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.world.applyDamping = false;

    game.time.advancedTiming = true;

    graphics = game.add.graphics(0, 0);
    cursors = game.input.keyboard.createCursorKeys();

    playerShip = new Ship();
    game.camera.follow(playerShip.sprite);

}

function update() {
    graphics.clear();

    if (cursors.left.isDown) {
        playerShip.left();
    }

    if (cursors.right.isDown) {
        playerShip.right();
    }

    if (cursors.up.isDown) {
        playerShip.thrust();
    }
}

function render() {
    game.debug.spriteInfo(sprite, 32, 500);
    game.debug.text(game.time.fps, 32, 400);
}