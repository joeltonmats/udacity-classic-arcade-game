var Enemy = function () {
    Character.call(this);

    this.x = this.getX();
    this.y = this.getY();
    this.speed = this.getSpeed();
    this.sprite = '../img/kraken (1).png';
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Update the enemy's position, required method for game
 *
 *  @param dt - a time delta between ticks
 */
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    if (this.x >= 1000) {
        this.x = this.getX();
        this.y = this.getY();
        this.speed = this.getSpeed();
    }
};
