import React, { Component, Fragment } from 'react';
import Favicon from 'react-favicon';
import Gameboard from './Gameboard.jsx';
import GameboardClass from './classes/Gameboard.js';

class App extends Component {

  render() {
    return (
      <Fragment>
        <Favicon url="./build/favicon.ico" />
        <Gameboard />
      </Fragment>
    );
  }

}
export default App;
