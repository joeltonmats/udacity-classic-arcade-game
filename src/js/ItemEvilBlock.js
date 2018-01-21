var ItemEvilBlock = function () {
    Item.call(this);
    this.getRandomItemEvilBlock();
};

ItemEvilBlock.prototype = Object.create(Item.prototype);
ItemEvilBlock.prototype.constructor = ItemEvilBlock;

ItemEvilBlock.prototype.getRandomItemEvilBlock = function () {
    var num = Math.floor((Math.random() * 6));

    console.log('numssssss', num);

    this.sprite = '../img/itemEvilBlock_6.png';
    //this.sprite = '../img/enemy_' + num + '.png';
}