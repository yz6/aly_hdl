<template>
  <div :id="id" style="max-width:1000px; margin: 0 auto">

  </div>
</template>

<script>
  import G2 from '../../static/js/_g2@2.3.13@g2/index'
export default {
  data () {
    return {
      chart: null
    }
  },
  props: {
    chartData: {
      type: Array,
      default () {
        return {
          // G2官网上的模拟数据
        }
      }
    },
    // 绑定div上的唯一id选择选择器
    id: String
  },
  // watch: {
  //   chartData (val, oldVal) {
  //     console.log('new: %s, old: %s', val, oldVal)
  //     this.drawChart(val)
  //   }
  // },
  created () {
    // this.drawChart(this.chartData)
  },
  mounted () {
    this.drawChart(this.chartData)
  },
  watch: {
    chartData() {
      this.drawChart(this.chartData)
    },
  },
  methods: {
    drawChart (datas) {
      this.chart && this.chart.destroy()
      let data = datas
      this.chart = new G2.Chart({
        id: this.id,
        forceFit: true,
        height: 120
      })
      this.chart.source(data, {
        name: {
          alias: '日期',
          type: 'cat',
          range: [0, 1]
        },
        value: {
          alias: '销量'
        }
      })
      this.chart.line().position('name*value').size(1).color("#FF7101")
      this.chart.point().position('name*value').color('#FF7101')
      this.chart.animate(false)
      this.chart.render()
      console.log(datas)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
