class Entity {

    constructor({ cell }) {
        this.x = cell.x;
        this.y = cell.y;
        this.cell = cell;
    }

    move(boardState, direction) {
        switch(direction) {
            case 'up':
                if (boardState[this.x] && boardState[this.x][this.y - 1] && boardState[this.x][this.y - 1].isPassable) {
                    boardState[this.x][this.y].entity = undefined;
                    this.y--;
                    boardState[this.x][this.y].entity = this;
                    this.cell = boardState[this.x][this.y];
                }
                break;
            case 'down':
                if (boardState[this.x] && boardState[this.x][this.y + 1] && boardState[this.x][this.y + 1].isPassable) {
                    boardState[this.x][this.y].entity = undefined;
                    this.y++;
                    boardState[this.x][this.y].entity = this;
                    this.cell = boardState[this.x][this.y];
                }
                break;
            case 'left':
                if (boardState[this.x - 1] && boardState[this.x - 1][this.y] && boardState[this.x - 1][this.y].isPassable) {
                    boardState[this.x][this.y].entity = undefined;
                    this.x--;
                    boardState[this.x][this.y].entity = this;
                    this.cell = boardState[this.x][this.y];
                }
                break;
            case 'right':
                if (boardState[this.x + 1] && boardState[this.x + 1][this.y] && boardState[this.x + 1][this.y].isPassable) {
                    boardState[this.x][this.y].entity = undefined;
                    this.x++;
                    boardState[this.x][this.y].entity = this;
                    this.cell = boardState[this.x][this.y];
                }
                break;
            case 'upAndLeft':
                if (boardState[this.x - 1] && boardState[this.x - 1][this.y - 1] && boardState[this.x - 1][this.y - 1].isPassable) {
                    boardState[this.x][this.y].entity = undefined;
                    this.x--;
                    this.y--;
                    boardState[this.x][this.y].entity = this;
                    this.cell = boardState[this.x][this.y];
                }
                break;
            case 'upAndRight':
                if (boardState[this.x + 1] && boardState[this.x + 1][this.y - 1] && boardState[this.x + 1][this.y - 1].isPassable) {
                    boardState[this.x][this.y].entity = undefined;
                    this.x++;
                    this.y--;
                    boardState[this.x][this.y].entity = this;
                    this.cell = boardState[this.x][this.y];
                }
                break;
            case 'downAndLeft':
                if (boardState[this.x - 1] && boardState[this.x - 1][this.y + 1] && boardState[this.x - 1][this.y + 1].isPassable) {
                    boardState[this.x][this.y].entity = undefined;
                    this.x--;
                    this.y++;
                    boardState[this.x][this.y].entity = this;
                    this.cell = boardState[this.x][this.y];
                }
                break;
            case 'downAndRight':
                if (boardState[this.x + 1] && boardState[this.x + 1][this.y + 1] && boardState[this.x + 1][this.y + 1].isPassable) {
                    boardState[this.x][this.y].entity = undefined;
                    this.x++;
                    this.y++;
                    boardState[this.x][this.y].entity = this;
                    this.cell = boardState[this.x][this.y];
                }
                break;
        }
    }

    wander(boardState) {

        const moves = [ 'up', 'down', 'left', 'right', 'upAndLeft', 'upAndRight', 'downAndLeft', 'downAndRight' ];
        this.move(boardState, moves[Math.floor(Math.random() * moves.length)]);

    }

}

module.exports = Entity;
