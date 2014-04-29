var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamewrap', {preload: preload, create: create, update: update, render: render});

var playerShip;
var sprite;

function preload() {
    game.load.image('background', 'img/bg.jpeg');
    game.load.image('ship', 'img/rect.png');
}

function create() {
    game.add.sprite(0, 0, 'background');

    game.physics.startSystem(Phaser.Physics.P2JS);

    playerShip = new Ship();
}

function update() {
    var alpha = -sprite.angle,
        a = 50,
    /*  b = Math.tan(alpha) * a,
     y = Math.cos(alpha) * (a + b),
     x = Math.sqrt(a * a + b * b) - y * Math.tan(alpha);*/
        x = a * Math.cos(alpha) - a * Math.sin(alpha),
        y = - a * Math.sin(alpha) + a * Math.cos(alpha);

    sprite.body.applyForce([Math.cos(alpha) - Math.sin(alpha), Math.sin(alpha) + Math.cos(alpha)], x, y);
    s = 5;
}

function render() {
    game.debug.spriteInfo(sprite, 32, 32);
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
