var Enemy = function () {
    Character.call(this);

    this.x = this.getX();
    this.y = this.getY();
    this.speed = this.getSpeed();
    this.sprite = '../img/enemy_0.png';

    this.getRandomCommonEnemy();

    this.increaseYCoordinate(this.y);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * Update the enemy's position, required method for game
 *
 *  @param dt - a time delta between ticks  which will ensure
 * the game runs at the same speed for all computers.
 */
Enemy.prototype.update = function (dt) {

    this.x = this.x + this.speed * dt;

    if (this.x >= 1000) {
        this.x = this.getX();
        this.y = this.getY();
        this.speed = this.getSpeed();
        this.increaseYCoordinate(this.y);
    }
};

/**
 * Increase Y coordinate for enemies. It is necessary
 * for a better  check colision.
 */
Enemy.prototype.increaseYCoordinate = function () {
    if (this.y === 60)
        this.y += 50;
    else if (this.y === 143)
        this.y += 57;
    else if (this.y === 226)
        this.y += 64;
};

/**
 * Generaates Random enemies for the game
 */
Enemy.prototype.getRandomCommonEnemy = function () {
    var num = app.getRandomNumber(0, 11);
    this.sprite = '../img/enemy_' + num + '.png';
}