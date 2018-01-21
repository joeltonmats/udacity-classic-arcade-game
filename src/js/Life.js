var Life = function () {
    this.sprite = '../img/life.png';
    Item.call(this);
};

Life.prototype = Object.create(Item.prototype);
Life.prototype.constructor = Life;