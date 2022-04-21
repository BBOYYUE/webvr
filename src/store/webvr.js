// import * as MutationType from '../MutationType'
import axios from 'axios'
import { normalize, schema } from 'normalizr'
import * as MutationType from "../MutationType"
let http = {}
let axiosConfig = (context) => {
  let instance = axios.create({
    timeout: 1000 * 12,
  })

  instance.interceptors.request.use((req) => {
    // if (Object.keys(this.loadingAPI).length === 0) {
    //   store.commit('SHOW_LOADING')
    // }
    req.headers.Authorization = 'Bearer ' + context.rootState.user.access_token
    return req
  })
  instance.interceptors.response.use((res) => {
    // if (Object.keys[this.loadingAPI].length === 0) {
    //   store.commit('HIDE_LOADING')
    // }
    return res
  })
  http = instance
}

const adviser = new schema.Entity('adviser')
const file = new schema.Entity('file')
const option = new schema.Entity('option')
const user = new schema.Entity('user')
const project = new schema.Entity('project')
const asset = new schema.Entity('asset', {
  files: [file],
  options: [option]
})
const work = new schema.Entity('work', {
  files: [file],
  options: [option],
  assets: [asset]
})

const module = new schema.Entity('module', {
  files: [file],
  options: [option],
  works: [work],
})

const product = new schema.Entity('product', {
  files: [file],
  options: [option],
  modules: [module],
  user: user,
  project: project,
  advisers: [adviser]
})

const dataSchema = new schema.Array(product)
const mock = [
  {
    "id": 1,
    "name": "微沙盘",
    "files": [],
    "option": {},
    "modules": [
      {
        "id": 1,
        "uuid": "a1122334",
        "name": "全景模块",
        "files": [],
        "type": "panorama",
        "option": {},
        "works": [
          {
            "id": 1,
            "name": "125户型",
            "option": {
              "maps": {
                "url": "",
                "spots": []
              }
            },
            "files": [],
            "assets": [
              {
                "id": 1,
                "name": "厨房",
                "option": {
                  "hotspot": [],
                  "hotspotGroup": [],
                  "views": {}
                },
                "files": [
                  {
                    "name": "厨房.jpg"
                  },
                  {
                    "name": "厨房.xml"
                  },
                  {
                    "name": "厨房_thumb.jpg"
                  },
                  {
                    "name": "厨房_thumb.tile"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "name": "平面模块",
        "type": "design",
        "uuid": "b4332211",
        "option": {},
        "works": [
          {
            "id": 2,
            "name": "户型鉴赏",
            "option": {
              "background": ""
            },
            "files": [],
            "assets": [
              {
                "id": 2,
                "name": "图层a",
                "option": {
                  "position": [],
                  "class": [],
                  "onClick": [],
                  "size": []
                },
                "files": []
              }
            ]
          }
        ]
      }
    ],
    "project": {
      "id": 1,
    },
    "user": {
      "id": 1,
      "name": "",
      "chat_room": "",
      "chat_messages": [],
      "adviser_id": 2
    },
    "advisers": [
      {
        "id": 2,
        "name": "",
        "chat_room": "",
        "chat_messages": []
      },
    ],
    "authors": [],
    "customers": []
  }
]


export default {
  namespaced: true,
  state: {
    code: '',
    msg: '',
    // 音乐是否在播放
    musicIsPlay: false,
    // 工具栏菜单是否展示
    showToolMenu: false,
    // 二级菜单是否展示
    showChildMenu: false,
    // 主菜单是否展示
    showMainMenu: true,
    // 全景图缩略图是否展示
    showPanoThumbMenu: false,
    // 是否全屏
    fullscreen: false,
    // 是否截屏模式
    screenshot: false,
    // 加载进度
    percent: 0,
    // 项目信息
    product: [],
    project: [],
    module: [],
    work: [],
    asset: {},
    activeModule: {},
    activeModuleId: 0,
    activeWork: {},
    activeWorkId: 0
  },
  getters: {
    entities () {
      return normalize(mock, dataSchema).entities
    },
  },
  modules: {},
  actions: {
    getProject (context, formData) {
      axiosConfig(context)
      let apiUrl = context.rootGetters['api/apiUrl']
      let panoramaApi = context.rootGetters['api/productApi']
      context.commit('getProject', {
        apiUrl: apiUrl + panoramaApi['getProject'],
        formData,
      })
    },
  },
  mutations: {
    getProject (state, data) {
      let { apiUrl, formData } = data
      http
        .post(apiUrl, formData)
        .then((res) => {
          if (res.data.code != 200) return
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
    [MutationType.SET_MORE] (state, data) {
      state[data.type] = data.value
    },
  },
}
