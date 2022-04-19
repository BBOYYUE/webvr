<template>
  <div class="h-screen w-screen ">
    <div class="w-full h-14 flex flex-row justify-between">
      <div class="w-16 flex flex-col justify-center">
        <div class="flex flex-row justify-center space-x-1"
             @click="this.$router.go(-1)">
          <el-icon>
            <arrow-left />
          </el-icon>
          <div>返回</div>
        </div>
      </div>
      <div class="flex flex-col justify-center text-center ">
        <div class="text-xl font-semibold">房贷计算器</div>
      </div>
      <div class="w-16"></div>
    </div>

    <div class="shadow-inner">
      <div class="p-2 text-left flex flex-col space-y-2">
        <el-tabs v-model="activeName"
                 class="demo-tabs"
                 stretch
                 @tab-click="handleClick">
          <el-tab-pane label="商业贷"
                       name="first">
            <accumulation></accumulation>
          </el-tab-pane>
          <el-tab-pane label="公基金贷"
                       name="second">
            <commerce></commerce>
          </el-tab-pane>
          <el-tab-pane label="组合贷"
                       name="third">
            <combination></combination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Accumulation from "./accumulation.vue";
import Combination from "./combination.vue";
import Commerce from "./commerce.vue";
import { ElIcon } from "element-plus";
import {
  ArrowLeft
} from '@element-plus/icons-vue'
export default {
  components: {
    ElIcon, ArrowLeft, Accumulation, Combination, Commerce
  },
  setup () {

  },
  data () {
    return {
      activeName: "first"
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: white;
    border: none;
  }
}
</style>