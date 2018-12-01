// import Cell from './Cell.js';
const Cell = require('./Cell.js');
const { levelString, betterLevel } = require('../data/levels.js');

class Gameboard {

    constructor({ levelString }) {
        this.makeGameboard(levelString);
        this.width;
        this.height;
        this.boardState;
    }

    makeGameboard(levelString) {

        let levelStringArray = levelString.trim().split('\n');
        this.height = levelStringArray.length;

        levelStringArray = levelStringArray.map((row) => {
            row = row.replace(/ /g, '').split('');
            return row;
        });

        this.width = levelStringArray[0].length;
        this.boardState = Array(this.width);

        // set up array of arrays
        let width = 0;
        while (width < this.boardState.length) {
            this.boardState[width] = [];
            width++;
        }

        levelStringArray.forEach((row, y) => {
            row.forEach((node, x) => {
                this.boardState[x].push(new Cell({ type: node, x, y }));
            });
        });
        
    }

    getNodeNeighbours(nodeX, nodeY) {

        const neighbours = [];

        if (nodeX - 1 >= 0) {
            neighbours.push(this.boardState[nodeX - 1][nodeY]);
        }
        if (nodeX + 1 < this.width) {
            neighbours.push(this.boardState[nodeX + 1][nodeY]);
        }
        if (nodeY - 1 >= 0) {
            neighbours.push(this.boardState[nodeX][nodeY - 1]);
        }
        if (nodeY + 1 < this.height) {
            neighbours.push(this.boardState[nodeX][nodeY + 1]);
        }
        if (nodeX - 1 >= 0 && nodeY - 1 >= 0) {
            neighbours.push(this.boardState[nodeX - 1][nodeY - 1]);
        }
        if (nodeX - 1 >= 0 && nodeY + 1 < this.height) {
            neighbours.push(this.boardState[nodeX - 1][nodeY + 1]);
        }
        if (nodeX + 1 < this.width && nodeY - 1 >= 0) {
            neighbours.push(this.boardState[nodeX + 1][nodeY - 1]);
        }
        if (nodeX + 1 < this.width && nodeY + 1 < this.height) {
            neighbours.push(this.boardState[nodeX + 1][nodeY + 1]);
        }

        return neighbours;

    }

    generatePathingValues(playerX, playerY) {

        this.resetPathingValues();

        let neighbours = [];
        let dist = 0;
        this.boardState[playerX][playerY].distToPlayer = dist;
        neighbours = neighbours.concat(this.getNodeNeighbours(playerX, playerY));

        while (neighbours.length > 0) {
            dist++;
            let newNeighbours = [];
            neighbours.forEach((cell) => {
                if (cell.isPassable && cell.distToPlayer === undefined) {
                    let cellNeighbours = this.getNodeNeighbours(cell.x, cell.y);
                    cellNeighbours = cellNeighbours.filter((neighbour) => {
                        return neighbour.isPassable && neighbour.distToPlayer === undefined;
                    });
                    newNeighbours = newNeighbours.concat(cellNeighbours);
                    cell.distToPlayer = dist;
                }
                return cell;
            });
            neighbours = newNeighbours;
        }

    }

    resetPathingValues() {

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                this.boardState[col][row].distToPlayer = undefined;
            }
        }

    }

    print() {
        console.log();
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                const cell = this.boardState[x][y];
                process.stdout.write(cell.type);
                process.stdout.write('' + (cell.distToPlayer === undefined ? '' : cell.distToPlayer));
                process.stdout.write((cell.distToPlayer === undefined ? "  " : " "));
            }
            console.log('\n')
        }
    }

}

const board = new Gameboard({ levelString });
board.generatePathingValues(9, 10);
board.print();

const b2 = new Gameboard({ levelString: betterLevel });
b2.generatePathingValues(4, 4);
b2.print();
b2.generatePathingValues(2, 1);
b2.print();
