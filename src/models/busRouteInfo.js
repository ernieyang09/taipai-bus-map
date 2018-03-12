const state = {
  current: {},
};

const reducers = {
  setActive(state, payload) {
    return {
      ...state,
      current: payload,
    }
  }
}

export default {
  state,
  reducers,
}
