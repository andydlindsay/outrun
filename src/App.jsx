import React, { Component, Fragment } from 'react';
import Favicon from 'react-favicon';

class App extends Component {

  render() {
    return (
      <Fragment>
        <Favicon url="./build/favicon.ico" />
      </Fragment>
    );
  }
  
}
export default App;
