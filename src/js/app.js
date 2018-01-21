"use strict";

var app = app || {};
app.level = 1;
app.lifes = 3;
app.pause = false;
app.points = 0;
app.maxSpeed = 400;
app.allItems = new Map();
app.LEVEL_UP_POINTS = 100;


//function to choose randomly between three numbers
app.randomNum = function () {
    var num = Math.floor((Math.random() * 10) / 3);
    return num;
};

app.levelUp = function () {
    var outsideThis = this;
    this.level++;

    // when create commons enemies
    if (this.level <= 8 || (this.level >= 25 && this.level % 5 === 0))
        this.createEnemies('common');
 var itemEvilBlock = new ItemEvilBlock();
        this.allItems.set(itemEvilBlock.key, itemEvilBlock);
        

    // when it is necessary generate blocks
    if ((this.level >= 10 && this.level < 26) && this.level % 2 === 0) {
        var itemEvilBlock = new ItemEvilBlock();
        this.allItems.set(itemEvilBlock.key, itemEvilBlock);
    }

    if(this.level > 30) {
        this.maxSpeed = 500;
    }

}

app.allEnemies = [];
app.player = new Player();

/**
 * Add new enemy instances
 * in allEnemies array;
 */
app.createEnemies = function (whichEnemy) {

    if (whichEnemy == 'common')
        this.allEnemies.push(new EnemyCommon());
    else
        this.allEnemies.push(new EnemyCommon());
}



/**
 * Load modal to start game
 */
app.loadModalStartFame = function () {
    $("#startGameModal").modal('show');
}

app.startGame = function () {

    var outsideThis = this;

    /**
     * Listen to btn-player click
     */
    $('#btn-player').click(function () {
        outsideThis.loadModalStartFame();
    });

    outsideThis.createEnemies();
    outsideThis.pause = false;

}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    app.player.handleInput(allowedKeys[e.keyCode]);
});