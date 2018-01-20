var Player = function () {
    Character.call(this);

    //img for player
    this.sprite = '../img/char-boy.png';

    //start coordinates positions
    this.init_position_x = 404;
    this.init_position_y = 390;

    // coordinates moves
    this.x = this.init_position_x;
    this.y = this.init_position_y;

    //xplus and y plus used to manage rock interactivity
    //this.xplus = 0;
    //this.yplus = 0;

    // max limits to move player right and left
    this.limit_right = 909;
    this.limit_left = 0;

    // jump coordinates for player movement
    this.jump_move_y = 85;
    this.jump_move_x = 105;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {

    //player arrives on water
    console.log('this.y', this.y);
    if (this.y <= -25) {
        this.x = this.init_position_x;
        this.y = this.init_position_y;
        //app.levelUp();
    }

    /* flux control to player limits in game area */

    if (this.y >= this.init_position_y)
        this.y = this.init_position_y;

    if (this.x <= this.limit_left)
        this.x = this.limit_left;

    if (this.x >= this.limit_right)
        this.x = this.limit_right;
};

Player.prototype.handleInput = function (key) {
    //this.xplus = 0;
    //this.yplus = 0;

    switch (key) {
        case 'left':
            this.x = this.x - this.jump_move_x;
            //this.xplus = - this.PLAYER_X_MOVE;
            break;
        case 'up':
            this.y = this.y - this.jump_move_y;
            //this.yplus = - this.PLAYER_Y_MOVE;
            break;
        case 'right':
            this.x = this.x + this.jump_move_x;
            //this.xplus = this.PLAYER_X_MOVE;
            break;
        case 'down':
            this.y = this.y + this.jump_move_y;
            //this.yplus = this.PLAYER_Y_MOVE;
            break;
    }
};
