function Ship (param) {
    this.color = 0xffffff;

    // 40x60
    this.size = 50;
    this.weight = 100;
    this.forceThrust = 1000;
    this.forceSide = 10;

    this.speed = {
        x: 0,
        y: 0
    };

    this.position = {
        x: 100,
        y: 100
    };

    this.initPhysics();

    // debug
    sprite = this.sprite;
}

Ship.prototype.initPhysics = function () {
    this.sprite = game.add.sprite(this.position.x, this.position.y, 'ship');
    this.sprite.anchor.setTo(0.5, 0.5);

    game.physics.p2.enable(this.sprite);
    this.body = this.sprite.body;

    this.body.mass = 10;
}

Ship.prototype.thrust = function () {
    var point1 = this.worldPoint([0, 30]),
        point2 = this.worldPoint([0, 40]);

    this.body.thrust(this.forceThrust);

    graphics.lineStyle(15, 0xFFFFFF, 1);
    graphics.beginFill();
    graphics.moveTo(point1[0], point1[1]);
    graphics.lineTo(point2[0], point2[1]);
    graphics.endFill();
}

Ship.prototype.left = function () {
    var angle = this.body.rotation/* + Math.PI / 2*/,
        point = this.worldPoint([20, -20]),
        point2 = this.worldPoint([30, -20]),
        pointBack = this.worldPoint([-20, 20]),
        pointBack2 = this.worldPoint([-30, 20]),
        force = [this.forceSide * Math.cos(angle), this.forceSide * Math.sin(angle)],
        forceBack = [-force[0], -force[1]];

    this.body.applyForce(force, point[0], point[1]);
    this.body.applyForce(forceBack, pointBack[0], pointBack[1]);

    graphics.lineStyle(5, 0xFFFFFF, 1);
    graphics.beginFill();

    graphics.moveTo(point[0], point[1]);
    graphics.lineTo(point2[0], point2[1]);

    graphics.moveTo(pointBack[0], pointBack[1]);
    graphics.lineTo(pointBack2[0], pointBack2[1]);

    graphics.endFill();
}

Ship.prototype.right = function () {
    var angle = this.body.rotation + Math.PI,
        point = this.worldPoint([-20, -20]),
        point2 = this.worldPoint([-30, -20]),
        pointBack = this.worldPoint([20, 20]),
        pointBack2 = this.worldPoint([30, 20]),
        force = [this.forceSide * Math.cos(angle), this.forceSide * Math.sin(angle)],
        forceBack = [-force[0], -force[1]];

    this.body.applyForce(force, point[0], point[1]);
    this.body.applyForce(forceBack, pointBack[0], pointBack[1]);

    graphics.lineStyle(5, 0xFFFFFF, 1);
    graphics.beginFill();

    graphics.moveTo(point[0], point[1]);
    graphics.lineTo(point2[0], point2[1]);

    graphics.moveTo(pointBack[0], pointBack[1]);
    graphics.lineTo(pointBack2[0], pointBack2[1]);

    graphics.endFill();
}

Ship.prototype.worldPoint = function (point) {
    var wPoint = [];

    this.body.toWorldFrame(wPoint, [this.body.world.pxmi(point[0]), this.body.world.pxmi(point[1])]);
    wPoint[0] = this.body.world.mpxi(wPoint[0]);
    wPoint[1] = this.body.world.mpxi(wPoint[1]);

    return wPoint;
}

Ship.prototype.getX = function () {
    return this.sprite.position.x;
}

Ship.prototype.getY = function () {
    return this.sprite.position.y;
}

Ship.prototype.setX = function (val) {
    this.sprite.position.x = val;
    return this;
}

Ship.prototype.setY = function (val) {
    this.sprite.position.y = val;
    return this;
}

Ship.prototype.rotate = function (deg) {
    this.sprite.body.rotation += deg;

    return this;
}