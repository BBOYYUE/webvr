import { createRouter, createWebHashHistory } from 'vue-router'
import v1 from "../src/pages/v1/index.vue"
import Map from "../src/components/tool/map.vue"
import Caculator from "../src/components/calculator/calculator.vue";
const isWeChat = /MicroMessenger/i.test(window.navigator.userAgent)
const routes = [
  {
    path: '/v1/:productId?',
    name: 'v1',
    component: v1,
    props: true,
    meta: {
      auth: isWeChat,
    },
  },
  {
    path: '/caculator',
    name: 'caculator',
    component: Caculator,
    props: true,
    meta: {
      auth: isWeChat,
    },
  },
  {
    path: '/map',
    name: 'map',
    component: Map,
    props: true,
    meta: {
      auth: isWeChat,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory('/webvr/'),
  routes,
  scrollBehavior (to, from, savedPosition) {
    to, from, savedPosition
    return {
      x: 0,
      y: 0,
    }
  },
})

export default router
