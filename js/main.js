var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamewrap', {preload: preload, create: create, update: update, render: render});

var playerShip;
var graphics;
var cursors;
var keyboard;
var worldSize = [5000, 5000];
var background;
var asteroid,
    asteroid2;
var collisionGroup;
var blackhole;

var bodyArray = [];

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function preload() {
    game.load.image('background', 'img/bg2.png');
    game.load.image('ship', 'img/ship2.png');
    game.load.image('blackhole', 'img/blackhole.png');
    game.load.image('asteroid', 'img/asteroid.png');
    game.load.image('asteroid2', 'img/asteroid2.png');
    game.load.physics('physicsData', 'js/asteroid_polygon.json');
}

function create() {
    var i;

    game.world.setBounds(0, 0, worldSize[0], worldSize[1]);
    background = game.add.tileSprite(0, 0, worldSize[0], worldSize[1], 'background');

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.world.applyDamping = false;
    game.physics.p2.useElapsedTime = true;
    //game.physics.p2.setBounds(0, 0, worldSize[0], worldSize[1], false, false, false, false, false);

    game.time.advancedTiming = true;

    graphics = game.add.graphics(0, 0);
    cursors = game.input.keyboard.createCursorKeys();
    keyboard = game.input.keyboard;

    collisionGroup = game.physics.p2.createCollisionGroup();

    // create player ship
    playerShip = new Ship();
    game.camera.follow(playerShip.sprite);

    // asteroids
    for (i = 0; i < 30; i++) {
        bodyArray.push(createAsteroid([Math.random() * worldSize[0], Math.random() * worldSize[1]]));
    }
    for (i = 0; i < 30; i++) {
        bodyArray.push(createAsteroid2([Math.random() * worldSize[0], Math.random() * worldSize[1]]));
    }

    // blackhole
    blackhole = game.add.sprite(2500, 2500, 'blackhole');
    game.physics.p2.enable(blackhole);
    blackhole.body.data.mass = 0;
}

function update() {
    graphics.clear();

    if (cursors.left.isDown || keyboard.isDown(Phaser.Keyboard.A)) {
        playerShip.left();
    }

    if (cursors.right.isDown || keyboard.isDown(Phaser.Keyboard.D)) {
        playerShip.right();
    }

    if (cursors.up.isDown || keyboard.isDown(Phaser.Keyboard.W)) {
        playerShip.thrust();
    }

    if (cursors.down.isDown || keyboard.isDown(Phaser.Keyboard.S)) {
        playerShip.reverse();
    }

    if (keyboard.isDown(Phaser.Keyboard.Q)) {
        playerShip.strafeLeft();
    }

    if (keyboard.isDown(Phaser.Keyboard.E)) {
        playerShip.strafeRight();
    }

    // TODO: если идет стрейф, то его регулировать
    if (!cursors.left.isDown && !cursors.right.isDown && !keyboard.isDown(Phaser.Keyboard.A) && !keyboard.isDown(Phaser.Keyboard.D)) {
        playerShip.brakingAngularVelocity(keyboard.isDown(Phaser.Keyboard.CONTROL));
    }

    // проверка на выход за границы
/*    (function() {
        var max = bodyArray.length,
            i = 0,
            el;

        function changeCoord(x) {
            var pixelX = -20 * x;

            if (pixelX > worldSize[0]) {
                pixelX = pixelX % worldSize[0];
                x = pixelX / (-20);
            } else if (pixelX < 0) {
                pixelX = worldSize[0] + pixelX;
                x = pixelX / (-20);
            }

            return x;
        }

        for (i = 0; i < max; i++) {
            el = bodyArray[i];

            el.body.data.position[0] = changeCoord(el.body.data.position[0]);
            el.body.data.position[1] = changeCoord(el.body.data.position[1]);
        }
    })();*/

    // Имитация черной дыры
    (function() {
        var max = bodyArray.length,
            i = 0,
            el;

        var df = game.time.physicsElapsed * 5000000,
            d, force;


        for (i = 0; i < max; i++) {
            el = bodyArray[i];
            d = dist(blackhole.position.x, blackhole.position.y, el.position.x, el.position.y);
            force = [(el.position.x - blackhole.position.x) * df / d / d, (el.position.y - blackhole.position.y) * df / d / d];
            el.body.applyForce(force, el.position.x, el.position.y);
        }
    })();

}

function render() {
    game.debug.spriteInfo(playerShip.sprite, 32, 500);
    game.debug.text('fps:' + game.time.fps, 32, 400);
    /*game.debug.text('physicsElapsed:' + game.time.physicsElapsed, 32, 450);*/
}