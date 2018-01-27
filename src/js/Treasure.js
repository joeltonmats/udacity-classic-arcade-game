var Treasure = function () {
    Item.call(this);
    this.randomColor();
};

Treasure.prototype = Object.create(Item.prototype);
Treasure.prototype.constructor = Treasure;

/**
 * Randomly generates a different color treasure.
 */
Treasure.prototype.randomColor = function () {
    var num = app.getRandomNumber(0,2);
    this.sprite = '../img/treasure_' + num + '.png';
    this.TREASURE_VALUE = num === 0 ? 100 : num * 200;
};