const state = {
  busRoutes: [],
};

const reducers = {
  loadData(state, payload) {
    return {
      ...state,
      busRoutes: payload,
    }
  }
}


const effects = {
  async loadDataAsync() {
    fetch('https://tcgbusfs.blob.core.windows.net/blobbus/GetRoute.gz').then(async res => {
      const buffer =await res.arrayBuffer();
      const data = JSON.parse(gzipHelper(buffer));
      this.loadData(data);
    });
  }
}


export default {
  state,
  reducers,
  effects,
}
