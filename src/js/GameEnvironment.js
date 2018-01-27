var GameEnvironment = function () { };

GameEnvironment.prototype.getY = function () {
    var num = 0;
    switch (app.getRandomNumber(0,2)) {
        case 0:
            num = 60;
            break;
        case 1:
            num = 143;
            break;
        default:
            num = 226;
    }
    return num;
};