<!-- 公积金贷 -->
<template>
  <div class="flex flex-col space-y-6  divide-y divide-solid divide-opacity-10 divide-black justify-start">
    <div class="flex flex-col space-y-2">
      <el-input v-model="loanTotal"
                placeholder="请输入">
        <template #prepend
                  class="bg-white">
          <div>贷款总额</div>
        </template>
        <template #append>万元</template>
      </el-input>
      <el-input v-model="years"
                placeholder="请输入">
        <template #prepend>按揭年数</template>
        <template #append>年</template>
      </el-input>
      <el-input v-model="interestRate"
                placeholder="请输入">
        <template #prepend>利率</template>
        <template #append>%</template>
      </el-input>
      <el-button type="primary"
                 class="w-full"
                 @click="this.caculateLoan(this.type)">开始计算</el-button>
    </div>
    <div class="flex flex-col pt-6">
      <div class="flex flex-row justify-center">
        <el-button-group>
          <el-button :type="this.type == 'equalPrincipalAndInterest'?'primary':'default'"
                     size="small"
                     @click="this.type = 'equalPrincipalAndInterest', this.caculateLoan(this.type)">等额本息</el-button>
          <el-button :type="this.type == 'equalPrincipal'?'primary':'default'"
                     size="small"
                     @click="this.type = 'equalPrincipal', this.caculateLoan(this.type)">等额本金</el-button>
        </el-button-group>
      </div>
      <div class="tip flex flex-row justify-center text-center mt-2">
        <div class=" w-48 text-xs text-gray-400"
             v-show="this.type == 'equalPrincipalAndInterest'">
          每月还款额固定, 所还总利息较多, 适合收入稳定者.
        </div>
        <div class=" w-48 text-xs text-gray-400"
             v-show="this.type == 'equalPrincipal'">
          每月还款额递减, 所还总利息较低, 前期还款额较大.
        </div>
      </div>

      <div class="tip flex flex-row justify-center text-center">
        <div class="flex flex-col w-48 mt-6 text-base text-gray-400">
          <div class="flex flex-row justify-between">
            <div>支付利息:</div>
            <div>{{interest}}</div>
            <div> 万元</div>
          </div>
          <div class="flex flex-row justify-between">
            <div>首月月供:</div>
            <div>{{supply}}</div>
            <div> 元</div>
          </div>
          <div class="flex flex-row justify-center  mt-4">
            <div class="text-xs">* 以上结果仅供参考 *</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loanTotal: undefined,
      years: undefined,
      interestRate: undefined,
      interest: undefined,
      supply: undefined,
      type: 'equalPrincipalAndInterest'
    }
  },
  methods: {
    caculateLoan (type) {
      // 等额本息法：计算公式：每月还款额=贷款本金×月利率×(1+月利率) ^ 还款月数÷{[(1+月利率) ^ 还款月数]-1}。总利息=月还款额*贷款月数-本金
      // 等额本金法：计算公式：月还款额=本金/n+剩余本金*月利率。总利息=本金*月利率*（贷款月数/2+0.5）
      let total = this.loanTotal
      let months = this.years * 12
      // 月利率
      let lilvMonth = this.interestRate / 12 / 100

      if (type == 'equalPrincipalAndInterest') {
        // 等额本息-每月（元）
        this.supply = parseFloat((total * lilvMonth * Math.pow((1 + lilvMonth), months) / (Math.pow((1 + lilvMonth), months) - 1) * 10000).toFixed(2))
        // 等额本息-总利息（万元）
        this.interest = parseFloat(((this.supply * months - total * 10000) / 10000).toFixed(2))
      } else if (type === 'equalPrincipal') {
        // 等额本金-每月（元）
        this.supply = parseFloat((((this.loanTotal / months) + (this.loanTotal * lilvMonth)) * 10000).toFixed(2))
        // 等额本金-总利息（万元）
        this.interest = parseFloat((this.loanTotal * lilvMonth * (months + 1) / 2).toFixed(2))
      }
    }
  }
}
</script>