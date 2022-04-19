/**
 * api
 */
import * as MutationType from '../MutationType'
export default {
  namespaced: true,
  state: {
    list: [],
    // prodApiUrl: "https://api.alphavisual.cn/api/v1/",
    prodApiUrl: 'http://192.168.0.86/api/v1/',
    devApiUrl: 'http://api.alpha.test/api/v1/',
    // devApiUrl: 'http://192.168.0.86/api/v1/',
    // prodAssetUrl: "https://oss.alphavisual.cn/",
    prodAssetUrl: 'http://192.168.0.86:9000/alpha-api/',
    // devAssetUrl: 'http://192.168.0.86:9000/alpha-api/',
    devAssetUrl: 'http://192.168.10.10:9000/alpha-api/',
  },
  getters: {
    apiUrl(state) {
      if (process.env.NODE_ENV === 'production') {
        return state.prodApiUrl
      }
      return state.devApiUrl
    },
    assetUrl(state) {
      if (process.env.NODE_ENV === 'production') {
        return state.prodAssetUrl
      }
      return state.devAssetUrl
    },
    panoramaCollectionApi() {
      return {
        [MutationType.GET_LIST]: 'getPanoramaCollectionList',
        [MutationType.GET_INFO]: 'getPanoramaListByCollectionUuid',
        [MutationType.CREATE_DATA]: 'createPanoramaCollection',
        [MutationType.BIND_FILE]: 'createPanoramaByFile',
        [MutationType.BIND_ASSET]: 'createPanoramaByAsset',
        [MutationType.DETACH_DATA]: 'deletePanoramaForCollection',
      }
    },
    userApi() {
      return {
        [MutationType.AUTHENTICATION]: 'authorizations',
        [MutationType.VERIFICATION_CODES]: 'verificationCodes',
        [MutationType.VERIFICATION_CODE_AUTHENTICATION]:
          'verificationCodeAuthentication',
        [MutationType.VERIFICATION_CODE_STORE]: 'verificationCodeStore',
        [MutationType.LOGOUT]: 'authorizations/destroy',
      }
    },
  },
  modules: {},
  actions: {},
  mutations: {},
}
