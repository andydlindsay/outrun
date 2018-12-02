const Entity = require('./Entity.js');

class Monster extends Entity {

    monsterMove(nodeNeighbours) {

        const possibleMoves = [];
        nodeNeighbours = nodeNeighbours.filter(cell => cell.isPassable);
        nodeNeighbours.forEach((cell) => {
            if (cell.distToPlayer < this.cell.distToPlayer) {
                possibleMoves.push(cell);
            }
        });
        return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    }

}

module.exports = Monster;
