<template>
  <div>
    <!--进度条组件-->
    <transition enter-active-class="animate__fadeIn"
                leave-active-class="animate__fadeOut">
      <div class="
          fixed
          top-0
          left-0
          z-999
          bg-center 
          bg-repeat
          animate__animated
        "
           id="loading"
           v-show="percent < 100 ">
        <k-progress class="w-full"
                    :percent="percent"
                    :line-height="2"
                    type="line"
                    color="rgba(37, 99, 235, var(--tw-bg-opacity))"
                    :show-text="false"
                    :active="true"
                    :border="true">
        </k-progress>
      </div>
    </transition>
    <!--作品展示-->
    <div @mousedown="initMusic"
         @touchstart="initMusic"
         v-show="activeModuleComponent">
      <keep-alive>
        <component :is="activeModuleComponent" />
      </keep-alive>
    </div>
    <!--工具菜单展示-->
    <div class="toolMenu absolute left-0 w-10 z-998 top-2/4">
      <tool-group v-show="showToolMenu"></tool-group>
    </div>
    <!-- 二级菜单展示 -->
    <!-- <base-menu class="fixed bottom-18 z-998"
               animateEnterClass="animate__fadeInUp"
               animateLeaveClass="animate__fadeOutDown"
               :list="this.childMenuList"
               :show="!this.screenshot && this.showChildMenu"
               :defalutActive="activeWork.uuid"
               @menuItemClick="childMenuItemClick"></base-menu> -->
    <!--主菜单展示-->
    <double-arrow-menu class="fixed z-998 bottom-10-px height-46-px"
                       animateEnterClass="animate__fadeInUp"
                       animateLeaveClass="animate__fadeOutDown"
                       :list="this.menuList"
                       :defalutActive="activeModule.uuid"
                       :show="!this.screenshot && this.showMainMenu"
                       @menuItemClick="mainMenuItemClick">
    </double-arrow-menu>
  </div>
</template>
<script>
import toolGroup from "../../components/menu/tool-group.vue"
import DoubleArrowMenu from "../../components/menu/double-arrow-menu.vue"
import Panorama from "./panorama.vue"
import Design from "./design.vue";
import KProgress from "k-progress-v3";
import wx from "weixin-js-sdk";
import axios from "axios";
import { mapState } from "vuex";
import * as MutationType from "../../MutationType";
export default {
  setup () {

  },
  data () {
    return {
      isinit: true,
      isreview: false,
    }
  },
  mounted () {
    let entities = this.$store.getters['webvr/entities']
    this.$store.commit('webvr/' + [MutationType.SET_MORE], {
      type: "product",
      value: entities.product,
    })
    this.$store.commit('webvr/' + [MutationType.SET_MORE], {
      type: "asset",
      value: entities.asset,
    })
    this.$store.commit('webvr/' + [MutationType.SET_MORE], {
      type: "work",
      value: entities.work,
    })
    this.$store.commit('webvr/' + [MutationType.SET_MORE], {
      type: "project",
      value: entities.project,
    })
    this.$store.commit('webvr/' + [MutationType.SET_MORE], {
      type: "module",
      value: entities.module,
    })
    let activeModuleId = entities.product[1].modules[0];
    this.$store.commit('webvr/' + [MutationType.SET_MORE], {
      type: "activeModuleId",
      value: activeModuleId,
    })
    this.$store.commit('webvr/' + [MutationType.SET_MORE], {
      type: "activeModuleId",
      value: entities.module[activeModuleId].works[0],
    })
    this.initView()
  },
  components: { KProgress, toolGroup, DoubleArrowMenu, Panorama, Design },
  computed: mapState({
    product: (state) => state.webvr.product,
    project: (state) => state.webvr.project,
    module: (state) => state.webvr.module,
    work: (state) => state.webvr.work,
    asset: (state) => state.webvr.asset,
    percent: (state) => state.webvr.percent,
    screenshot: (state) => state.webvr.screenshot,
    showToolMenu: (state) => state.webvr.showToolMenu,
    showChildMenu: (state) => state.webvr.showChildMenu,
    showMainMenu: (state) => state.webvr.showMainMenu,
    showPanoThumbMenu: (state) => state.webvr.showPanoThumbMenu,
    activeModule: (state) => state.webvr.activeModule,
    activeWork: (state) => state.webvr.activeWork,
    activeWorkId: (state) => state.webvr.activeWorkId,
    activeModuleId: (state) => state.webvr.activeModuleId,
    activeModuleComponent () {
      return this.activeModule.type
    },
    activeModuleWork () {
      return this.activeModuleId + "/" + this.activeWorkId;
    },
    childMenuList () {
      console.log(this.activeWork)
    },
    menuList () {
      let list = [];
      for (let item in this.module) {
        list.push({
          name: this.module[item].uuid,
          alias: this.module[item].name,
          icon: this.module[item].icon,
          type: this.module[item].type,
          id: this.module[item].id,
        });
      }
      return list;
    }
  }),
  methods: {
    initMusic () {
      if (this.isPlay) return;
      this.isPlay = true;
      let that = this;
      setTimeout(function () {
        that.startMusic();
      }, 1000);
    },
    startMusic () {
      this.$store.commit('webvr/' + [MutationType.SET_MORE], {
        type: "musicIsPlay",
        value: true,
      });
    },
    mainMenuItemClick (item) {
      this.$store.commit('webvr/' + [MutationType.SET_MORE],
        {
          type: "activeModuleId",
          value: item.id,
        }
      );
      if (this.module[item.id].works.length === 1) {
        this.$store.commit('webvr/' + [MutationType.SET_MORE],
          {
            type: "activeWorkId",
            value: this.module[item.id].works[0],
          }
        );
      }
    },
    initView () {
    },
    refreshView () {
      console.log("重新渲染页面");
      if (this.module[this.activeModuleId] && this.work[this.activeWorkId]) {
        this.$store.commit('webvr/' + [MutationType.SET_MORE],
          {
            type: "activeModule",
            value: this.module[this.activeModuleId],
          }
        );
        this.$store.commit('webvr/' + [MutationType.SET_MORE],
          {
            type: "activeWork",
            value: this.work[this.activeWorkId],
          }
        );
      }
      this.isreview = false
    },
    wxConfig () {
      const url = encodeURIComponent(location.href.split("#")[0]);
      axios
        .get(`${this.jssdkApi}?url=${url}`)
        .then(function (res) {
          wx.config(res.data.data);
        })
        .catch(function (e) {
          console.log(e);
        });
    },

    wxShare () {
      wx.ready(() => {
        wx.updateTimelineShareData(this.shareData);
        wx.updateAppMessageShareData(this.shareData);
        // 分享给朋友
        // wx.onMenuShareAppMessage(this.shareData);
        // 分享到朋友圈
        // wx.onMenuShareTimeline(this.shareData);
        // 分享到QQ
        wx.onMenuShareQQ(this.shareData);
        // 分享到QQ空间
        wx.onMenuShareQZone(this.shareData);
        // 分享到腾讯微博
        wx.onMenuShareWeibo(this.shareData);
      });
    },
    wxLocation () {
      let that = this;
      wx.ready(() => {
        // 获取位置信息
        wx.getLocation({
          success: function (res) {
            that.$store.commit(MutationType.SET_MORE, {
              type: "lngLat",
              value: [res.longitude, res.latitude],
            });
          },
        });
      });
    },
  },
  watch: {
    activeModuleWork (val) {
      if (val) {
        let workId = val.split("/")[1];
        if (workId === this.activeWork.id) return;
        this.isreview = true;
      }
    },
    activeWork (val) {
      console.log(val);
    },
    isreview (val) {
      if (val) {
        console.log("状态更新, 重新渲染页面");
        this.refreshView();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bottom-18 {
  bottom: 4.25rem;
}
.z-999 {
  z-index: 9999;
}
.z-998 {
  z-index: 9998;
}
.sale {
  // animation: 0.5s linear 1s infinite alternate focusEnlarge;
  // -webkit-animation: 0.5s linear 1s infinite alternate focusEnlarge;
}
// .loading {
//   background: url("../../assets/page-loading.jpg");
//   background-size: 100% 100%;
//   background-repeat: no-repeat;
//   background-position: center;
//   color: #dfdfdf;
// }
#loading {
  .el-loading-spinner {
    top: 70%;
  }
}
.height-46-px {
  height: 46px;
}
.bottom-10-px {
  bottom: 10px;
}
#pano::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  scrollbar-arrow-color: red;
  position: relative;
  left: 2px;
}
#pano::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}
#pano::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
@keyframes focusEnlarge {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0.9, 0.9);
  }
}
</style>
