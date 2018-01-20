var Character = function () {
    GameEnvironment.call(this);
};

Character.prototype = Object.create(GameEnvironment.prototype);
Character.prototype.constructor = Character;

Character.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Character.prototype.getX = function () {
    var num = 0;
    switch (app.randomNum()) {
        case 0:
            num = -150;
            break;
        case 1:
            num = -350;
            break;
        default:
            num = -550;
    }
    return num;
};

Character.prototype.getSpeed = function () {
    return Math.floor(Math.random() * (app.maxSpeed - 100 + 1)) + 100;
};