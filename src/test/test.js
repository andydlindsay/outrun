const Gameboard = require('../classes/Gameboard');
const Player = require('../classes/Player');
const Monster = require('../classes/Monster');
const levels = require('../data/levels');

// setup new gameboard
const b2 = new Gameboard({ levelString: levels.levelOne });

// setup starting player position
const startingCell = b2.getRandomStartingCell();
const playerOne = new Player({ x: startingCell.x, y: startingCell.y, cell: startingCell });
startingCell.entity = playerOne;

// setup starting monstesr position(s)
const monsters = [];
const numMonsters = 2;
for (let i = 0; i < numMonsters; i++) {
    const cell = b2.getRandomStartingCell();
    const newMonster = new Monster({ x: cell.x, y: cell.y, cell });
    cell.entity = newMonster;
    monsters.push(newMonster);
}

// start monsters pathing
const moves = [ 'up', 'down', 'left', 'right', 'upAndLeft', 'upAndRight', 'downAndLeft', 'downAndRight' ];
const time = 501;
function randomMovePlayer() {
    playerOne.move(b2.boardState, moves[Math.floor(Math.random() * moves.length)]);
    b2.generatePathingValues(playerOne.x, playerOne.y);
    monsters.forEach((monster) => {
        const monsterMove = monster.monsterMove(b2.getNodeNeighbours(monster.x, monster.y));
        if (monsterMove) {
            b2.boardState[monster.x][monster.y].entity = undefined;
            b2.boardState[monsterMove.x][monsterMove.y].entity = monster;
            monster.x = monsterMove.x;
            monster.y = monsterMove.y;
            monster.cell = monsterMove;
        }
    });
    console.clear();
    b2.print();
}
setTimeoutLoop(15, time, randomMovePlayer);

function setTimeoutLoop(numLoops, waitTime, callback) {
    let i = 1;
    while (i <= numLoops) {
        setTimeout(callback, waitTime * i);
        i++;
    }
}
