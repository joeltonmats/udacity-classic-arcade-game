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
 * Validates that another item doesn't have the same position
 * if it does, new x and y coordenates are generated
 * and assign to new key.
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
    switch (Math.floor(Math.random() * 10)) {
        case 0:
            num = 12;
            break;
        case 1:
            num = 113;// 101;
            break;
        case 2:
            num = 214;// 202;
            break;
        case 3:
            num = 315; //303;
            break;
        case 4:
            num = 416; //404;
            break;
        case 5:
            num = 517;// 505;
            break;
        case 6:
            num = 618;//606;
            break;
        case 7:
            num = 7191;//707;
            break;
        case 8:
            num = 820; // 808;
            break;
        case 9:
            num = 921;//909;
            break;
    }
    return num;
};

Item.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};