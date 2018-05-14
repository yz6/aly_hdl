<template>
  <div :id="id" style="max-width:1000px; margin: 0 auto;">

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
      chartData: Array,
      // 绑定div上的唯一id选择选择器
      id: String
    },
    created () {
      // this.drawChart(this.chartData)
    },
    mounted () {
      this.drawChart(this.chartData)       // 第一步想到的是创建的时候更新图表，但是这个不适用于异步请求接口获取相关数据，所以采用下面的监听的方式
    },
    watch:{
      chartData(){
        this.drawChart(this.chartData)
      }
    },
    methods: {
      drawChart (datas) {
        this.chart && this.chart.destroy()
        let data = datas
        let Stat = G2.Stat
        this.chart = new G2.Chart({
          id: this.id,
          height: 210,
          width:350,
          animate: false,

        })
        this.chart.source(data)
        this.chart.coord('theta', {
          radius: 1 ,// 设置饼图的大小
          inner:0.35,
        })
        this.chart.legend("name",{
          position: 'bottom',
          word:"#fff",
          unChecked:"#666",
          formatter (val) {
            for (let i = 0; i < data.length; i++) {
              let obj = data[i]
              if (obj.name === val) {
                return val
              }
            }
          },
        })
        this.chart.tooltip({
          title: null,
          map: {
            value: 'value'
          }
        })

        this.chart.intervalStack().position(Stat.summary.percent('value'))
          .color('name',["#FDDA5D","#03C1C7","#A3E39A","#EED387","#54BDCC",])
          .label('..percent',{
            offset:-1
          })
        this.chart.render()
        // 设置默认选中
        let geom = this.chart.getGeoms()[0]
        let items = geom.getData()
        geom.setSelected(items[1])
        console.log(datas)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
