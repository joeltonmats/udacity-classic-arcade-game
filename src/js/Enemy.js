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

var EnemyCommon = function () {
    Enemy.call(this);
    this.x = this.getX();
    this.y = this.getY();
    this.speed = this.getSpeed();
    this.getRandomCommonEnemy();
    // = this.getRandomNumberToGenerateEnemy(); //'../img/kraken (1).png';
};

EnemyCommon.prototype = Object.create(Enemy.prototype);
EnemyCommon.prototype.constructor = EnemyCommon;


/**
 * Update the enemy's position, required method for game
 *
 *  @param dt - a time delta between ticks  which will ensure
 * the game runs at the same speed for all computers.
 */
EnemyCommon.prototype.update = function (dt) {

    this.x = this.x + this.speed * dt;

    if (this.x >= 1000) {
        this.x = this.getX();
        this.y = this.getY();
        this.speed = this.getSpeed();
    }
};


EnemyCommon.prototype.getRandomCommonEnemy = function () {
    var num = Math.floor((Math.random() * 6));

    console.log('num', num);

    this.sprite = '../img/enemy_' + num + '.png';
}