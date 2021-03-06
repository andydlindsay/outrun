class Cell {

    constructor({ type, x, y }) {
        this.type = type;
        this.distToPlayer = undefined;
        this.x = x;
        this.y = y;
        this.entity = undefined;
    }

    get isPassable() {
        return this.type === 'f';
    }

    get isOccupied() {
        return this.entity !== undefined;
    }

}

// export default Cell;
module.exports = Cell;
