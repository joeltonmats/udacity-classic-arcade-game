"use strict";

var app = app || {};
app.level = 1;
app.lifes = 3;
app.pause = false;
app.points = 0;
app.maxSpeed = 400;
app.allItems = new Map();
app.LEVEL_UP_POINTS = 100;


//function that generate between choose randomly between 0 - 3
app.randomNum = function () {
    var num = Math.floor((Math.random() * 10) / 3);
    return num;
};

/**
 * Delete all treasure and hearts don't got.
 */
app.deleteTreasureAndLifeReaming = function () {
    this.allItems.forEach(function (item) {
        if (item instanceof Treasure || item instanceof Life) {
            this.allItems.delete(item.key);
        }
    }, this);
};

app.addLife = function (up) {
    /*  var outsideThis = this;
  
      if (up) {
          if (this.lifes < 3) {
              this.lifes++;
          }
      } else {
          this.lifes--;
      }*/
}

app.levelUp = function () {
    var outsideThis = this;
    this.level++;
    this.points += this.LEVEL_UP_POINTS;

    //update DOM
    $('#level').text('Level ' + this.level);
    $('#points').text(outsideThis.points + ' points');

    //when delete all treasure and lifes didn't get
    this.deleteTreasureAndLifeReaming();

    //when to create lifes
    var life = new Life();
    if (life.getXCoord() % 5 === 0)
        this.allItems.set(life.key, life);
    else
        life = null;

    // when to create commons enemies
    if (this.level <= 8 || (this.level >= 25 && this.level % 5 === 0))
        this.createEnemies('common');

    // when it is necessary generate blocks
    if ((this.level >= 10 && this.level < 26) && this.level % 2 === 0) {
        var itemEvilBlock = new ItemEvilBlock();
        this.allItems.set(itemEvilBlock.key, itemEvilBlock);
    }

    // when generates treasures
    if (this.level >= 10 && this.level % 2 === 1) {
        var treasure = new Treasure();
        this.allItems.set(treasure.key, treasure);
    }

    // Increase enemies velocity
    if (this.level > 30) {
        this.maxSpeed = 500;
    }

    //if max level reached, won Modal is displayed. Player can
    //choose to start a new game
    if (this.level === 40) {
        this.pause = true;
        /*$("#wonModal").modal('show');
        $(".restart").click(function () {
            that.restart();
        });*/
    }

};

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
    console.log('chegueii');
    $("#startGameModal").modal('show');
}

app.startGame = function () {

    var outsideThis = this;
    var playerSelected = null;

    /**
     * Listen to btn-player click
     */
    $('#btn-player').click(function () {
        outsideThis.loadModalStartFame();
    });

    $('.player-option').click(function () {

        // to allow only a player selected at moment.
        if (playerSelected != null)
            $(playerSelected).removeClass('player-selected');

        outsideThis.player.sprite = ($(this).attr('src')).replace('img', '../img');
        $(this).addClass('player-selected');
        playerSelected = $(this);
    });

    $('#startButton').off('click').on('click', function () {
        outsideThis.createEnemies();
        outsideThis.pause = false;
    });
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

