const Gameboard = require('../classes/Gameboard');
const levels = require('../data/levels');

// setup new gameboard
const board = new Gameboard(levels.levelOne);

// setup starting player position
board.generatePlayerStart();
board.generatePathingValues(board.player.cell.x, board.player.cell.y);

// setup starting monster position(s)
const numMonsters = 2;
board.generateMonsters(numMonsters, true);

// start monsters pathing
const time = 501;
function randomMovePlayer() {
    board.player.wander(board.boardState);
    board.generatePathingValues(board.player.cell.x, board.player.cell.y)
        .moveMonsters()
        .print();
}
setTimeoutLoop(20, time, randomMovePlayer);

function setTimeoutLoop(numLoops, waitTime, callback) {
    let i = 1;
    while (i <= numLoops) {
        setTimeout(callback, waitTime * i);
        i++;
    }
}
