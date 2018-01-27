var ItemEvilBlock = function () {
    Item.call(this);
    this.getRandomItemEvilBlock();
};

ItemEvilBlock.prototype = Object.create(Item.prototype);
ItemEvilBlock.prototype.constructor = ItemEvilBlock;

ItemEvilBlock.prototype.getRandomItemEvilBlock = function () {
    var num = app.getRandomNumber(0, 4);
    this.sprite = '../img/itemEvilBlock_' + num + '.png';
}