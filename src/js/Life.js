var Life = function () {
    Item.call(this);
    this.sprite = '../img/life.png';
};

Life.prototype = Object.create(Item.prototype);
Life.prototype.constructor = Life;