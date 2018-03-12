import * as R from 'ramda';

import { gzipHelper } from '../helper';

const state = {
  current: {},
};

const reducers = {
  setActive(state, payload) {
    return {
      ...state,
      current: payload,
    }
  },
  loadRealtime(state, payload) {
    return {
      ...state,
      realtime: payload,
    }
  },
  init() {
    return {
      current: {},
    }
  },
}

const effects = {
  async loadRealtimeAsync(payload, rootState) {
    fetch('https://tcgbusfs.blob.core.windows.net/blobbus/GetBusData.gz').then(async res => {
      const buffer =await res.arrayBuffer();
      const data = JSON.parse(gzipHelper(buffer));
      const current = rootState.busRouteInfo.current;
      this.loadRealtime(data.BusInfo.filter(d => (
        d.ProviderID === current.providerId && d.RouteID === current.pathAttributeId.toString()
      )));
    });
  }
}

export default {
  state,
  reducers,
  effects,
}
