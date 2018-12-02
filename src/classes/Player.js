const Entity = require('./Entity.js');

class Player extends Entity {

    constructor(props) {
        super(props);
        this.type = 'p';
    }

}

module.exports = Player;
