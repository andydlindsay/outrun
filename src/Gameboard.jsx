import React, { Component, Fragment } from 'react';
import Cell from './Cell.jsx';

class Gameboard extends Component {

    render() {
        return (
            <Fragment>
                <h2>Gameboard</h2>
                <Cell />
            </Fragment>
        );
    }

}

export default Gameboard;
