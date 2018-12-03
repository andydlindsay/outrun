const Gameboard = require('../classes/Gameboard');
const levels = require('../data/levels');

// setup new gameboard
const time = 501;
const numTurns = 20;
const numMonsters = 6;
const board = new Gameboard(levels.levelFour)
    .startGame(numTurns, time, numMonsters);
