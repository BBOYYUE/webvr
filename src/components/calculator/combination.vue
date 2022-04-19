<!-- 组合贷 -->
<template>
  <div class="flex flex-col space-y-6  divide-y divide-solid divide-opacity-10 divide-black justify-start">
    <div class="flex flex-col space-y-2">
      <el-input v-model="accumulationLoanTotal"
                placeholder="请输入">
        <template #prepend
                  class="bg-white">
          商业贷款额度
        </template>
        <template #append>万元</template>
      </el-input>
      <el-input v-model="accumulationYears"
                placeholder="请输入">
        <template #prepend> 商业贷按揭年数</template>
        <template #append>年</template>
      </el-input>
      <el-input v-model="accumulationInterestRate"
                placeholder="请输入">
        <template #prepend
                  class="bg-white">
          商业贷款利率
        </template>
        <template #append>%</template>
      </el-input>
      <el-input v-model="commerceLoanTotal"
                placeholder="请输入">
        <template #prepend>公积金贷款额度</template>
        <template #append>万元</template>
      </el-input>
      <el-input v-model="commerceYears"
                placeholder="请输入">
        <template #prepend>公积金贷按揭年数</template>
        <template #append>年</template>
      </el-input>
      <el-input v-model="commerceInterestRate"
                placeholder="请输入">
        <template #prepend>公积金贷款利率</template>
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
                     @click="this.type = 'equalPrincipalAndInterest'">等额本息</el-button>
          <el-button :type="this.type == 'equalPrincipal'?'primary':'default'"
                     size="small"
                     @click="this.type = 'equalPrincipal'">等额本金</el-button>
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
      accumulationLoanTotal: undefined,
      accumulationYears: undefined,
      accumulationInterestRate: undefined,
      commerceLoanTotal: undefined,
      commerceYears: undefined,
      commerceInterestRate: undefined,
      interest: undefined,
      supply: undefined,
      type: 'equalPrincipalAndInterest'
    }
  },
  methods: {
    caculateLoan (type) {
      // 等额本息法：计算公式：每月还款额=贷款本金×月利率×(1+月利率) ^ 还款月数÷{[(1+月利率) ^ 还款月数]-1}。总利息=月还款额*贷款月数-本金
      // 等额本金法：计算公式：月还款额=本金/n+剩余本金*月利率。总利息=本金*月利率*（贷款月数/2+0.5）
      let totalS = this.accumulationLoanTotal
      let monthsS = this.accumulationYears * 12
      // 商业贷-月利率
      let lilvMonthS = this.accumulationInterestRate / 12 / 100
      // 商业贷-等额本息-每月（元）
      let everyMonthPayS1 = parseFloat((totalS * lilvMonthS * Math.pow((1 + lilvMonthS), monthsS) / (Math.pow((1 + lilvMonthS), monthsS) - 1) * 10000).toFixed(2))
      // 商业贷-等额本息-总利息（万元）
      let lixiS1 = parseFloat(((everyMonthPayS1 * monthsS - totalS * 10000) / 10000).toFixed(2))
      // 商业贷-等额本金-每月（元）
      let everyMonthPayS2 = parseFloat((((totalS / monthsS) + (totalS * lilvMonthS)) * 10000).toFixed(2))
      // 商业贷-等额本金-总利息（万元）
      let lixiS2 = parseFloat((totalS * lilvMonthS * (monthsS + 1) / 2).toFixed(2))

      let totalG = this.commerceLoanTotal
      let monthsG = this.commerceYears * 12
      // 公积金贷-月利率
      let lilvMonthG = this.commerceInterestRate / 12 / 100
      // 公积金贷-等额本息-每月（元）
      let everyMonthPayG1 = parseFloat((totalG * lilvMonthG * Math.pow((1 + lilvMonthG), monthsG) / (Math.pow((1 + lilvMonthG), monthsG) - 1) * 10000).toFixed(2))
      // 公积金贷-等额本息-总利息（万元）
      let lixiG1 = parseFloat(((everyMonthPayG1 * monthsG - totalG * 10000) / 10000).toFixed(2))
      // 公积金贷-等额本金-每月（元）
      let everyMonthPayG2 = parseFloat((((totalG / monthsG) + (totalG * lilvMonthG)) * 10000).toFixed(2))
      // 公积金贷-等额本金-总利息（万元）
      let lixiG2 = parseFloat((totalG * lilvMonthG * (monthsG + 1) / 2).toFixed(2))


      if (type == 'equalPrincipalAndInterest') {
        // 等额本息-每月（元）
        this.supply = parseFloat((everyMonthPayS1 + everyMonthPayG1).toFixed(2))
        // 等额本息-总利息（万元）
        this.interest = parseFloat((lixiS1 + lixiG1).toFixed(2))
      } else if (type === 'equalPrincipal') {
        // 等额本金-每月（元）
        this.supply = parseFloat((everyMonthPayS2 + everyMonthPayG2).toFixed(2))
        // 等额本金-总利息（万元）
        this.interest = parseFloat((lixiS2 + lixiG2).toFixed(2))
      }
    }
  }
}
</script>