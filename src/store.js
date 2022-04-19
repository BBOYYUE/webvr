import { createStore } from 'vuex'
import * as MutationType from './MutationType'
import user from './store/user'
import api from './store/api'
import webvr from "./store/webvr"

const store = createStore({
  getters: {},
  actions: {},
  mutations: {
    [MutationType.SET_FETCHING] (state, fetching) {
      state.fetching = fetching
    },
    [MutationType.SET_LOADING] (state, loading) {
      state.loading = loading
    },
  },
  state: {
    fetching: false,
    loading: false,
    isElectron:
      window &&
      window.process &&
      window.process.versions &&
      window.process.versions['electron'],
  },
  modules: {
    api: api,
    user: user,
    webvr: webvr
  },
})

export default store
