import React, { Component } from 'react';
import { Provider, connect } from 'react-redux'
import { init } from '@rematch/core';

import { gzipHelper } from './helper';
import * as models from './models';

const store = init({
  models,
});

class App extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <Provider store={store}>
        <div>
          asdgjasdjgkl
        </div>
       </Provider>
    );
  }
}

export default App;
