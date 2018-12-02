const Cell = require('./Cell.js');
const Player = require('./Player.js');
const Monster = require('./Monster.js');

class Gameboard {

    constructor(levelString) {
        this.makeGameboard(levelString);
        this.width;
        this.height;
        this.boardState;
        this.player;
        this.monsters = [];
        return this;
    }

    getRandomStartingCell(isFarFromPlayer) {
        let cell;
        while (!cell) {
            const testX = Math.floor(Math.random() * this.width);
            const testY = Math.floor(Math.random() * this.height);
            const testCell = this.boardState[testX][testY];
            if (testCell && testCell.isPassable && !testCell.isOccupied) {
                if (isFarFromPlayer) {
                    if (testCell.distToPlayer >= this.width / 3) {
                        cell = testCell
                    }
                } else {
                    cell = testCell;
                }
            }
        }
        return cell;
    }

    moveMonsters() {

        this.monsters.forEach((monster) => {
            const monsterMove = monster.monsterMove(this.getNodeNeighbours(monster.cell.x, monster.cell.y));
            if (monsterMove) {
                this.boardState[monster.x][monster.y].entity = undefined;
                this.boardState[monsterMove.x][monsterMove.y].entity = monster;
                monster.x = monsterMove.x;
                monster.y = monsterMove.y;
                monster.cell = monsterMove;
            }
        });
        return this;

    }

    generatePlayerStart() {

        const cell = this.getRandomStartingCell();
        this.player = new Player({ cell });
        cell.entity = this.player;
        return this;

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

        return this;
        
    }

    generateMonsters(numMonsters, isFarFromPlayer = false) {

        for (let i = 0; i < numMonsters; i++) {
            const cell = this.getRandomStartingCell(isFarFromPlayer);
            const newMonster = new Monster({ cell });
            cell.entity = newMonster;
            this.monsters.push(newMonster);
        }
        return this;

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

        return this;

    }

    resetPathingValues() {

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                this.boardState[col][row].distToPlayer = undefined;
            }
        }
        return this;

    }

    print() {
        console.clear();
        console.log();
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                const cell = this.boardState[x][y];
                // process.stdout.write(cell.isPassable || cell.entity ? ' ' : cell.type);
                process.stdout.write(cell.entity ? (cell.entity instanceof Player ? ' 😀 ' : ' 👹 ') : cell.isPassable && !cell.entity ? '   ' : cell.type === 'w' ? '███' : '░░░');
                // process.stdout.write();
                // process.stdout.write('' + (cell.distToPlayer === undefined ? '' : cell.distToPlayer));
                // process.stdout.write(" ");
            }
            console.log('');
        }
        return this;
    }

}

module.exports = Gameboard;
