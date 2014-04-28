function Ship(param) {
    this._color = 0xffffff;
    this._size = 50;
    this._weight = 100;
    this._force = 1;

    this._acceleration = false;
    this._angle = 0;
    this._speed = {
        x: 0,
        y: 0
    };
    this._position = {
        x: 100,
        y: 100
    };

    this._sprite = game.add.sprite(this._position.x, this._position.y, 'ship');
    this._sprite.inputEnabled = true;
    sprite = this._sprite;
    game.physics.p2.enable(this._sprite);

    this._sprite.body.mass = 10;
//    this._sprite.body.applyForce(7, 5, 5);
}

Ship.prototype.rotate = function (deg) {

    return this;
}

/*
Ship.prototype.pullOn = function () {
    this._acceleration = true;

    return this;
}

Ship.prototype.update = function (time) {
    if (this._acceleration) {
        this._speed.x += this._force * Math.cos(this._angle) * time / (this._weight * 2);
        this._speed.y += this._force * Math.sin(this._angle) * time / (this._weight * 2);
    }

    this._position.x += this._speed.x * time;
    this._position.y -= this._speed.y * time;

    this._graphics.position.x = this._position.x;
    this._graphics.position.y = this._position.y;

    this._acceleration = false;

    return this;
}*/
