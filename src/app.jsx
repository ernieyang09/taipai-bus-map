import React, { Component } from 'react';
import { Provider, connect } from 'react-redux'
import { init } from '@rematch/core';

import * as models from './models';

import { BusRouteTable } from './components';

const store = init({
  models,
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BusRouteTable />
       </Provider>
    );
  }
}

export default App;
