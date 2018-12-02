const Cell = require('./Cell.js');
const Player = require('./Player.js');

class Gameboard {

    constructor({ levelString }) {
        this.makeGameboard(levelString);
        this.width;
        this.height;
        this.boardState;
    }

    getRandomStartingCell() {
        let cell;
        while (!cell) {
            const testX = Math.floor(Math.random() * this.width);
            const testY = Math.floor(Math.random() * this.height);
            const testCell = this.boardState[testX][testY];
            if (testCell && testCell.isPassable && !testCell.isOccupied) {
                cell = testCell;
            }
        }
        return cell;
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

        let neighbours = [this.boardState[playerX][playerY]];
        let dist = 0;

        while (neighbours.length > 0) {
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
            dist++;
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
                // process.stdout.write(cell.isPassable || cell.entity ? ' ' : cell.type);
                process.stdout.write(cell.entity ? (cell.entity instanceof Player ? ' H ' : ' M ') : cell.isPassable && !cell.entity ? '   ' : cell.type === 'w' ? '███' : '░░░');
                // process.stdout.write();
                // process.stdout.write('' + (cell.distToPlayer === undefined ? '' : cell.distToPlayer));
                // process.stdout.write(" ");
            }
            console.log('');
        }
    }

}

module.exports = Gameboard;
