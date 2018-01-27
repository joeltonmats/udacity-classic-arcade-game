"use strict";

var app = app || {};
app.level = 1;
app.lifes = 3;
app.pause = false;
app.points = 0;
app.maxSpeed = 400;
app.allItems = new Map();
app.LEVEL_UP_POINTS = 100;
app.modalOptions = { backdrop: 'static', keyboard: false, show: true };
app.allEnemies = [];
app.player = new Player();


/**
 * Generates random numbers between a interval
 *  @param min - Minimum value(inclusive)
 *  @param max - Maximum value(incluvise)
 */
app.getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * DOM Control  to add/remove heart icon
 */
app.toggleLife = function (up, qtdLife) {
    var heartElements = $('.life-wrapper').children();
    var heartElement = heartElements[qtdLife];

    if (up) {
        $(heartElement).children().removeClass('fa fa-heart-o');
        $(heartElement).children().addClass('fa fa-heart');
    } else {
        $(heartElement).children().removeClass('fa fa-heart');
        $(heartElement).children().addClass('fa fa-heart-o');
    }

};

/**
 * Load modal to start game
 */
app.loadModalStartFame = function () {
    $("#startGameModal").modal(app.modalOptions);
}

/**
 * Delete all treasure and hearts don't got.
 */
app.deleteTreasureAndLifeRemaning = function () {
    this.allItems.forEach(function (item) {
        if (item instanceof Treasure || item instanceof Life) {
            this.allItems.delete(item.key);
        }
    }, this);
};

app.addLife = function (up) {
    var outsideThis = this;

    if (up) {
        if (this.lifes < 3) {
            this.toggleLife(up, this.lifes);
            this.lifes++;
        }
    } else {
        this.lifes--;
        this.toggleLife(up, this.lifes);

        if (this.lifes === 0) {
            this.pause = true;
            this.gameOverImg();
            $('#gameOverModal').modal(app.modalOptions);
            $('.restart').click(function () {
                outsideThis.restartGame();
            });
        }
    }
};

app.levelUp = function () {
    var outsideThis = this;
    this.level++;
    this.points += this.LEVEL_UP_POINTS;

    //update DOM
    $('#level').text('Level ' + this.level);
    $('#points').text(outsideThis.points + ' points');

    //when delete all treasure and lifes didn't get
    this.deleteTreasureAndLifeRemaning();

    //when to create lifes
    var life = new Life();
    if (life.getXCoord() % 5 === 0)
        this.allItems.set(life.key, life);
    else
        life = null;

    // when to create commons enemies
    if (this.level <= 8 || (this.level >= 25 && this.level % 5 === 0))
        this.createEnemies();

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

    //if max level came, so the Win Modal is displayed. Player can must choose between start or new game.
    if (this.level === 40) {
        this.pause = true;
        $("#winModal").modal(app.modalOptions);
        $("#playAgain").click(function () {
            outsideThis.gameWin();
            outsideThis.restartGame();
        });
    }

};

/**
 * Add new enemy instances
 * in allEnemies array;
 */
app.createEnemies = function () {
    this.allEnemies.push(new Enemy());
}

/**
 * When game over, a random gif is sorted
 * 
 */
app.gameOverImg = function () {
    var imageGameOver = $("#game-over-img");
    var number = this.getRandomNumber(0, 3);

    switch (number) {
        case 0:
            $(imageGameOver).attr('src', '../img/game-over-1.gif');
            break;
        case 1:
            $(imageGameOver).attr('src', '../img/game-over-2.gif');
            break;
        case 2:
            $(imageGameOver).attr('src', '../img/game-over-3.gif');
            break;
        default:
            $(imageGameOver).attr('src', '../img/game-over.gif');
    }
}


/**
 * When player win, a random gif is sorted to congratulations.
 *
 */
app.gameWin = function () {
    var imageGameWin = $("#game-win-img");
    var number = this.getRandomNumber(0, 3);

    switch (number) {
        case 0:
            $(imageGameWin).attr('src', '../img/end-game-1.gif');
            break;
        case 1:
            $(imageGameWin).attr('src', '../img/end-game-2.gif');
            break;
        case 2:
            $(imageGameWin).attr('src', '../img/end-game-3.gif');
            break;
        default:
            $(imageGameWin).attr('src', '../img/end-game.gif');
    }
}

/**
 * Begin function to start a game.
 */
app.startGame = function () {

    var outsideThis = this;
    var playerSelected = null;

    outsideThis.loadModalStartFame();

    $('.player-option').click(function () {

        // to allow only a player selected at moment.
        if (playerSelected != null)
            $(playerSelected).removeClass('player-selected');

        outsideThis.player.sprite = ($(this).attr('src')).replace('img', '../img');
        $(this).addClass('player-selected');
        playerSelected = $(this);
    });

    $('#startButton').off('click').on('click', function () {
        console.log('entrou');
        outsideThis.createEnemies();
        outsideThis.pause = false;
    });

    $('#restartButton').click(function () {
        outsideThis.loadModalStartFame();
    });
};

app.restartGame = function () {
    var outsideThis = this;
    this.level = 1;
    this.lifes = 3;
    this.points = 0;
    this.maxSpeed = 400;
    this.allItems.clear();
    this.allEnemies = [];
    this.player.x = 416;
    this.player.y = 470;

    //DOM Properties
    //update DOM
    $('#level').text('Level ' + outsideThis.level);
    $('#points').text(outsideThis.points + ' points');
    var heartElements = $('.life-wrapper').children();

    for (var i = 0; i < 3; i++) {
        var heartElement = heartElements[i];
        //when used toggleClass found a bug
        $(heartElement).children().removeClass('fa fa-heart-o');
        $(heartElement).children().addClass('fa fa-heart');

    }

    this.startGame();

}

/**
 *
 * Listen user click to play again any moment.
 */
$('#btn-player').click(function () {
    app.restartGame();
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    //show or hide pause game modal
    if (e.keyCode === 32) {
        app.pause = !app.pause;
        if (app.pause === false) {
            $("#pauseModal").modal('hide');
        } else {
            $("#pauseModal").modal(app.modalOptions);
        }
    }

    if (!app.pause) {
        app.player.handleInput(allowedKeys[e.keyCode]);
    }
});

