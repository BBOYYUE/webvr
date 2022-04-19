import * as MutationType from '../MutationType'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
    code: '',
    msg: '',
    user: [],
    expired_at: '',
    expires_in: '',
    access_token: '',
    verification_key: '',
    isLogin: false,
  },
  getters: {},
  modules: {},
  actions: {
    [MutationType.AUTHENTICATION](context, data) {
      let { username, password } = data
      let apiUrl = context.rootGetters['api/apiUrl']
      let userApi = context.rootGetters['api/userApi']
      context.commit(MutationType.AUTHENTICATION, {
        apiUrl: apiUrl + userApi[MutationType.AUTHENTICATION],
        formData: {
          password,
          username,
        },
      })
    },
    [MutationType.LOGOUT](context) {
      let apiUrl = context.rootGetters['api/apiUrl']
      let userApi = context.rootGetters['api/userApi']
      context.commit(MutationType.LOGOUT, {
        apiUrl: apiUrl + userApi[MutationType.LOGOUT],
      })
    },
    [MutationType.VERIFICATION_CODES](context, data) {
      let { phone } = data
      let apiUrl = context.rootGetters['api/apiUrl']
      let userApi = context.rootGetters['api/userApi']
      context.commit(MutationType.VERIFICATION_CODES, {
        apiUrl: apiUrl + userApi[MutationType.VERIFICATION_CODES],
        formData: {
          phone,
        },
      })
    },
    [MutationType.VERIFICATION_CODE_AUTHENTICATION](context, data) {
      let { phone, verification_code, verification_key } = data
      let apiUrl = context.rootGetters['api/apiUrl']
      let userApi = context.rootGetters['api/userApi']
      context.commit(MutationType.VERIFICATION_CODE_AUTHENTICATION, {
        apiUrl: apiUrl + userApi[MutationType.VERIFICATION_CODE_AUTHENTICATION],
        formData: {
          phone,
          verification_code,
          verification_key,
        },
      })
    },
    [MutationType.VERIFICATION_CODE_STORE](context, data) {
      let {
        name,
        password,
        phone,
        invitation_code,
        verification_code,
        verification_key,
      } = data
      let apiUrl = context.rootGetters['api/apiUrl']
      let userApi = context.rootGetters['api/userApi']
      context.commit(MutationType.VERIFICATION_CODE_STORE, {
        apiUrl: apiUrl + userApi[MutationType.VERIFICATION_CODE_STORE],
        formData: {
          name,
          password,
          phone,
          invitation_code,
          verification_code,
          verification_key,
        },
      })
    },
  },
  mutations: {
    [MutationType.LOGIN](state, data) {
      state.user = data.user
      state.access_token = data.access_token
      state.isLogin = true
    },
    [MutationType.LOGOUT](state, data) {
      let { apiUrl } = data
      state.isLogin = false
      axios
        .post(apiUrl)
        .then(() => {
          state.user = undefined
          state.access_token = undefined
        })
        .catch((err) => {
          state.code = 400
          if (err.response.data.errors) {
            for (let item in err.response.data.errors) {
              state.msg = err.response.data.errors[item][0]
            }
          } else {
            state.msg = '连接超时'
          }
        })
    },
    [MutationType.SET_MSG](state, data) {
      let { code, msg } = data
      state.code = code
      state.msg = msg
    },
    [MutationType.AUTHENTICATION](state, data) {
      let { apiUrl, formData } = data
      axios
        .post(apiUrl, formData)
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            state.code = res.data.code
            state.msg = res.data.msg
            state.user = res.data.data.user
            state.access_token = res.data.data.access_token
            state.expires_in = res.data.data.expires_in
            if (localStorage.setItem) {
              localStorage.setItem(
                'user',
                JSON.stringify({
                  accessToken: state.accessToken,
                  user: state.user,
                })
              )
            }
            state.isLogin = true
          } else if (res.data.code) {
            state.code = res.data.code
            state.msg = res.data.msg
          } else {
            state.msg = res.data.message
          }
        })
        .catch((err) => {
          state.code = 400
          if (err.response.data.errors) {
            for (let item in err.response.data.errors) {
              state.msg = err.response.data.errors[item][0]
            }
          } else {
            state.msg = '连接超时'
          }
        })
    },
    [MutationType.VERIFICATION_CODES](state, data) {
      let { apiUrl, formData } = data
      axios
        .post(apiUrl, formData)
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            state.code = res.data.code
            state.msg = res.data.msg
            state.verification_key = res.data.data.verification_key
            state.expired_at = res.data.data.expired_at
            console.log(state)
          } else {
            state.code = res.data.code
            state.msg = res.data.msg
          }
        })
        .catch((err) => {
          state.code = 400
          if (err.response.data.errors) {
            for (let item in err.response.data.errors) {
              state.msg = err.response.data.errors[item][0]
            }
          } else {
            state.msg = '连接超时'
          }
        })
    },
    [MutationType.VERIFICATION_CODE_AUTHENTICATION](state, data) {
      let { apiUrl, formData } = data
      axios
        .post(apiUrl, formData)
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            state.code = res.data.code
            state.msg = res.data.msg
            state.user = res.data.data.user
            state.access_token = res.data.data.access_token
            state.expires_in = res.data.data.expires_in
            state.isLogin = true
            if (localStorage.setItem) {
              localStorage.setItem(
                'user',
                JSON.stringify({
                  accessToken: state.accessToken,
                  user: state.user,
                })
              )
            }
          } else {
            state.code = res.data.code
            state.msg = res.data.msg
          }
        })
        .catch((err) => {
          state.code = 400
          if (err.response.data.errors) {
            for (let item in err.response.data.errors) {
              state.msg = err.response.data.errors[item][0]
            }
          } else {
            state.msg = '连接超时'
          }
        })
    },
    [MutationType.VERIFICATION_CODE_STORE](state, data) {
      let { apiUrl, formData } = data
      axios
        .post(apiUrl, formData)
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            state.code = res.data.code
            state.msg = res.data.msg
            state.user = res.data.data.user
            state.access_token = res.data.data.access_token
            state.expires_in = res.data.data.expires_in
            state.isLogin = true
            if (localStorage.setItem) {
              localStorage.setItem(
                'user',
                JSON.stringify({
                  accessToken: state.accessToken,
                  user: state.user,
                })
              )
            }
          } else {
            state.code = res.data.code
            state.msg = res.data.msg
          }
        })
        .catch((err) => {
          state.code = 400
          if (err.response.data.errors) {
            for (let item in err.response.data.errors) {
              state.msg = err.response.data.errors[item][0]
            }
          } else {
            state.msg = '连接超时'
          }
        })
    },
  },
}
