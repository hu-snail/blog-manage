<template>
  <div class="dashboard-container">
    <el-container class="container-content">
      <el-aside width="260px" class="aside">
        <div class="aside-item">
          最近编辑：vue笔记
        </div>
      </el-aside>
      <el-main class="echarts-container">
        <VeLine :data="chartData" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VeLine from 'v-charts/lib/line.common'
export default {
  name: 'Dashboard',
  components: { VeLine },
  data() {
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: fixed;
  top: 62px;
  width: 100%;
  .container-content {
    height: 100vh;
  }
  .aside{
    background-color: #fff;
    padding: 20px;
  }
  .echarts-container{
    margin: 10px 20px;
    padding: 10px 20px;
    background-color: #fff;
  }
}
</style>
