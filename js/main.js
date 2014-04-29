var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamewrap', {preload: preload, create: create, update: update, render: render});

var playerShip;
var sprite;
var graphics;
var isApply = false;
var temp = [0, 0];

function preload() {
    game.load.image('background', 'img/bg.jpeg');
    game.load.image('ship', 'img/rect.png');
}

function create() {
    game.add.sprite(0, 0, 'background');

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.world.applyDamping = false;

    playerShip = new Ship();

    graphics = game.add.graphics(0, 0);
}

function update() {
    sprite.body.toWorldFrame(temp, [sprite.body.world.pxmi(50), sprite.body.world.pxmi(-50)]);
    temp[0] = sprite.body.world.mpxi(temp[0]);
    temp[1] = sprite.body.world.mpxi(temp[1]);

    var alpha = sprite.body.rotation,
        x = sprite.position.x + 50,
        y = sprite.position.y - 50,
        x2 = x * Math.cos(alpha) + y * Math.sin(alpha),
        y2 = x * Math.sin(alpha) + y * Math.cos(alpha),
        c = Math.sqrt(225),
        dx = Math.cos(Math.PI / 4 + alpha) * c,
        dy = Math.sin(Math.PI / 4 + alpha) * c;

    if (!isApply) {
        sprite.body.applyForce([dx, dy], temp[0], temp[1]);
        // isApply = true;
    }

    graphics.clear();
    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.beginFill();
    graphics.moveTo(temp[0], temp[1]);
    graphics.lineTo(temp[0] - dx, temp[1] - dy);
    graphics.endFill();
}

function render() {
    game.debug.spriteInfo(sprite, 32, 500);
    game.debug.body(sprite);
}

/*
var renderer = PIXI.autoDetectRenderer(800, 600, false, false, true),
    stage = new PIXI.Stage(0xFFFFFF);

var shp;

function pageOnLoad() {
    var startTime = 0;
    document.getElementById('gamewrap').appendChild(renderer.view);

    shp = new Ship();
    shp.show();

    controls.init(shp);

    requestAnimationFrame(animate);
    function animate(time) {
        var duration = time - startTime;

        controls.checkPress();
        shp.update(duration);

        renderer.render(stage);

        startTime = time;
        requestAnimationFrame(animate);
    }
}*/
