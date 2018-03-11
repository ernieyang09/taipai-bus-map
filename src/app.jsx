import React, { Component } from 'react';
import { gzipHelper } from './helper';

class App extends Component {
  componentDidMount() {
    fetch('https://tcgbusfs.blob.core.windows.net/blobbus/GetRoute.gz').then(async res => {
      const buffer =await res.arrayBuffer();
      const data = JSON.parse(gzipHelper(buffer));
      console.log(data)
    })
  }
  render() {
    return (
      <div>
        asdgjasdjgkl
      </div>
    );
  }
}

export default App;
