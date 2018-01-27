var Item = function () {
    GameEnvironment.call(this);

    this.x = this.getXCoord();
    this.y = this.getY();

    //generates a key to work with map's item
    this.key = this.x.toString() + this.y.toString();
    this.checkCoords();
};

Item.prototype = Object.create(GameEnvironment.prototype);
Item.prototype.constructor = Item;

/**
 * Validates that one item does not the same position another item
 * if it does,then it is generate a  new x and y coordenates to
 * assign to new key.
 */
Item.prototype.checkCoords = function () {
    while (app.allItems.has(this.key)) {
        this.x = this.getXCoord();
        this.y = this.getY();
        this.key = this.x.toString() + this.y.toString();
    }
};

/**
 * Generates the X coordenate to
 * itens positions in game area.
 */
Item.prototype.getXCoord = function () {
    var num = 0;
    switch (app.getRandomNumber(0,9)) {
        case 0:
            num = 12;
            break;
        case 1:
            num = 113;
            break;
        case 2:
            num = 214;
            break;
        case 3:
            num = 315;
            break;
        case 4:
            num = 416;
            break;
        case 5:
            num = 517;
            break;
        case 6:
            num = 618;
            break;
        case 7:
            num = 7191;
            break;
        case 8:
            num = 820;
            break;
        case 9:
            num = 921;
            break;
    }
    return num;
};

Item.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};