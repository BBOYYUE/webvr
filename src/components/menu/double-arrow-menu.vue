<template>
  <transition :enter-active-class="animateEnterClass"
              :leave-active-class="animateLeaveClass">
    <div class="w-full flex flex-row justify-center animate__animated"
         v-show="this.list.length > 0 && this.show">
      <div class="
                    flex flex-row
                    justify-center
                    bg-black
                    bg-opacity-70
                    rounded-full
                "
           :style="{ width: menuBoxWidthTotal + 'rem' }">
        <div class="flex flex-row justify-center"
             style="width: 3.2rem">
          <div class="flex flex-col justify-center">
            <el-icon class="text-white"
                     style="width: 1rem; height: 1rem">
              <d-arrow-left class="text-white"
                            style="width: 1rem; height: 1rem" />
            </el-icon>
          </div>
        </div>
        <div class="
                        box
                        w-full
                        overflow-y-auto
                        flex flex-row
                        justify-left
                    "
             :style="{ display: showMenuList }">
          <div class="flex flex-row justify-center"
               :style="{ width: menuWidthTotal }">
            <div v-for="item in this.list"
                 :key="item"
                 class="w-16 flex flex-col justify-center mx-1">
              <div @click="goTo(item)"
                   class="text-white truncate"
                   :class="this.getActive(item)">
                <div class="text-center">
                  <component :is="item.icon"
                             class="w-5 h-5"></component>
                </div>
                <marquee-text :repeat="1"
                              :duration="3"
                              v-show="item.alias.length > 5"
                              class="text-center  text-xxs">{{ item.alias }}</marquee-text>
                <div class="text-center text-xxs"
                     v-show="item.alias.length < 6">
                  {{ item.alias }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-center"
             style="width: 3.2rem">
          <div class="flex flex-col justify-center">
            <el-icon class="text-white"
                     style="width: 1rem; height: 1rem">
              <d-arrow-right class="text-white"
                             style="width: 1rem; height: 1rem" />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { ElIcon } from "element-plus";
import { DArrowLeft, DArrowRight } from "@element-plus/icons-vue";
import PanoramaIcon from "../icon/panorama.vue";
import EarthIcon from "../icon/earth.vue";
import Housetype from "../icon/housetype.vue";
import Room from "../icon/room.vue";
import LocationIcon from "../icon/location.vue";
import MarqueeText from "vue-marquee-text-component";
export default {
  components: {
    DArrowLeft,
    DArrowRight,
    ElIcon,
    PanoramaIcon,
    EarthIcon,
    Housetype,
    Room,
    LocationIcon,
    MarqueeText,
  },
  props: {
    animateEnterClass: String,
    animateLeaveClass: String,
    list: Array,
    defalutActive: String,
    show: Boolean
  },
  data () {
    return {
      showMenu: true,
      menuBoxWidth: 0,
      showMenuList: "flex",
      active: "",
    };
  },
  setup () { },
  activated () {
    this.menuBoxWidth = this.menuBoxWidthTotal;
  },
  computed: {
    menuWidthTotal () {
      return this.list ? this.list.length * 4.25 + "rem" : "0rem";
    },
    menuBoxWidthTotal () {
      let total = this.list ? this.list.length * 4.25 : 0;
      /**
       * 这里 14.5 可以空出来一个按钮的位置
       */
      let width =
        total > window.innerWidth / 15.5
          ? window.innerWidth / 14.5
          : total + 5;
      if (!this.showMenu) width = "6.5";
      return width;
    },
  },
  methods: {
    getActive (item) {
      return this.active == item.name ? "" : "text-opacity-70";
    },
    goTo (item) {
      this.active = item.name;
      this.$emit("menuItemClick", item);
      if (item.path) {
        this.$router.push(item.path);
      }
    },
  },
  watch: {
    showMenu (val) {
      let that = this;
      if (!val) {
        setTimeout(function () {
          that.showMenuList = "none";
        }, 800);
      } else {
        that.showMenuList = "flex";
      }
    },
    defalutActive () {
      this.active = this.defalutActive;
    },
  },
};
</script>
<style   lang="scss" scoped>
// .showMenu {
//   animation: slideInLeft 1s;
//   -webkit-animation: slideInLeft 1s;
//   position: relative;
// }
.text-xxs {
  font-size: 0.5rem;
  line-height: 0.9rem;
}
.hideMenu {
  animation: slideInRight 1s;
  -webkit-animation: slideInRight 1s;
  position: relative;
}
@keyframes slideInRight {
  from {
    width: 97%;
  }
  to {
    width: 3.25rem;
  }
}
@keyframes slideInLeft {
  from {
    width: 3.25rem;
    visibility: visible;
  }
  to {
    width: 97%;
  }
}
.box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  scrollbar-arrow-color: red;
  position: relative;
  left: 2px;
}
.box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: red;
}
.box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>