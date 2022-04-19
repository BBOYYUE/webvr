<template>
  <div>
    <transition name="menu-animate"
                enter-active-class="animate__fadeInRight"
                leave-active-class="animate__fadeOutRight">

      <div class="
        w-full
        flex flex-col
        bg-black bg-opacity-70
        rounded-r-lg
        animate__animated
      "
           :class="menuShow">

        <div class="flex justify-center">
          <div class="w-6 h-6 mx-1 my-1.5">
            <transition name="menu-button-animate">
              <menuIcon class="w-full h-full"
                        v-show="!showAll"
                        iconColor="text-white"
                        @click="toggleShowAll()" />
            </transition>
            <transition name="menu-button-animate">
              <close class="w-full h-full"
                     v-show="showAll"
                     iconColor="text-white"
                     @click="toggleShowAll()" />
            </transition>
          </div>
        </div>
        <transition name="menu-list-animate">
          <div class="flex justify-center"
               @click="toggleMusic()"
               v-show="showAll">
            <div class="w-6 h-6 mx-1 my-1.5">
              <music class="w-full h-full"
                     :class="musicPalyAnimate"
                     iconColor="text-white" />
            </div>
          </div>
        </transition>
        <transition name="menu-list-animate">
          <div class="flex justify-center"
               @click="this.$router.push('/map')"
               v-show="showAll">
            <div class="w-6 h-6 mx-1 my-1.5">
              <navigation class="w-full h-full"
                          iconColor="text-white" />
            </div>
          </div>
        </transition>

        <transition name="menu-list-animate">
          <div class="flex justify-center"
               v-show="showAll"
               @click="this.$router.push('/caculator')">
            <div class="w-6 h-6 mx-1 my-1.5">
              <calculator class="w-full h-full"
                          iconColor="text-white" />
            </div>
          </div>
        </transition>
        <transition name="menu-list-animate">
          <div class="flex justify-center"
               v-show="showAll"
               @click="this.$store.commit('webvr/setScreenshot', !this.$store.state.webvr.screenshot)">
            <div class="w-6 h-6 mx-1 my-1.5">
              <screenshot class="w-full h-full"
                          v-show="this.$store.state.webvr.screenshot"
                          iconColor="text-white" />
              <unscreenshot class="w-full h-full"
                            v-show="!this.$store.state.webvr.screenshot"
                            iconColor="text-white" />
            </div>
          </div>
        </transition>
        <transition name="menu-list-animate">

          <div class="flex justify-center"
               v-show="showAll"
               @click="this.$store.commit('webvr/setFullscreen', !this.$store.state.webvr.fullscreen)">
            <div class="w-6 h-6 mx-1 my-1.5">
              <fullscreen class="w-full h-full"
                          v-show="this.$store.state.webvr.fullscreen"
                          iconColor="text-white" />
              <unfullscreen class="w-full h-full"
                            v-show="!this.$store.state.webvr.fullscreen"
                            iconColor="text-white" />
            </div>
          </div>
        </transition>

      </div>
    </transition>
    <audio class="invisible h-0 w-0"
           :src="bgmUrl"
           id="bgm"
           type="audio/mp3"
           controls
           loop
           @ended="ended"></audio>
  </div>
</template>
<script>
import music from "../../components/icon/music.vue";
import navigation from "../../components/icon/navigation.vue";
import calculator from "../../components/icon/calculator.vue";
import menuIcon from "../../components/icon/menu.vue";
import fullscreen from "../../components/icon/fullscreen.vue";
import unfullscreen from "../../components/icon/unfullscreen.vue";
import screenshot from "../../components/icon/screenshot.vue";
import unscreenshot from "../../components/icon/unScreenshot.vue";
import close from "../../components/icon/close.vue";
import * as MutationType from "../../MutationType";
export default {
  name: "ToolGroup",
  components: { music, navigation, calculator, menuIcon, close, fullscreen, unfullscreen, screenshot, unscreenshot },
  watch: {
    music (music) {
      let audio = document.getElementById("bgm");
      if (music) {
        audio.load();
        setTimeout(function () {
          audio.play();
        }, 200);
      } else {
        audio.pause();
      }
    },
    fullscreen (val) {
      if (val) {
        this.setFullScreen();
      } else {
        this.clearFullScreen();
      }
    }
  },
  methods: {
    setFullScreen () {
      let el = document.getElementById('app');
      if (el.requestFullScreen) {
        console.log(1)
        el.requestFullScreen();
      } else if (el.webkitRequestFullScreen) {
        console.log(2)
        el.webkitRequestFullScreen();
      } else if (el.mozRequestFullScreen) {
        console.log(3)
        el.mozRequestFullScreen();
      } else if (el.msRequestFullscreen) {
        console.log(4)
        el.msRequestFullscreen();
      } else if (el.webkitEnterFullscreen) {
        console.log(5)
        el.webkitEnterFullscreen(); //for iphone this code worked
      }
    },
    clearFullScreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    toggleMusic () {
      this.$store.commit(MutationType.SET_MORE, {
        type: 'musicIsPlay',
        value: !this.music
      })
    },
    toggleShowAll () {
      this.showAll = !this.showAll;
    },
    goTo (path) {
      this.$router.push(path);
    },
    ended () {
    },
  },

  computed: {
    music () {
      return this.$store.state.musicIsPlay;
    },
    menuShow () {
      return this.showAll ? "showAll" : "hideAll";
    },
    musicPalyAnimate () {
      return this.music ? "animate-spin" : "";
    },
    bgmUrl () {
      return "https://oss.alphavisual.cn/zjrc/music/bgm.mp3";
    },
    fullscreen () {
      return this.$store.state.webvr.fullscreen
    }
  },
  activated () {

  },
  data () {
    return {
      showAll: false,
    };
  },
};
</script>
<style scoped>
.menu-list-animate-enter-active {
  animation: bounceIn 1s;
}
.menu-list-animate-leave-active {
  animation: bounceOut 1s;
}
.menu-button-animate-enter-active {
  animation: rotateIn 1s;
}
.showAll {
  animation: show 0.2s linear infinite;
  animation-iteration-count: 1;
}
.hideAll {
  /* animation: hide 0.2s linear infinite;
  animation-iteration-count: 1;
  animation-delay: 1s; */
}
@keyframes hide {
  from {
    height: 10rem;
  }
  to {
    height: 2.5rem;
  }
}
@keyframes show {
  from {
    height: 2.5rem;
  }
  to {
    height: 10rem;
  }
}
</style>
