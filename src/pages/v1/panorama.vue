<!--
  全景模块
-->
<template>
  <div>
    <div v-for="item in this.activeWork.assets"
         :key="item">
      {{this.asset[item]}}
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  setup () {

  },
  computed: mapState({
    activeModule: (state) => state.webvr.activeModule,
    activeWork: (state) => state.webvr.activeWork,
    asset: (state) => state.webvr.asset,
  })
}
</script>