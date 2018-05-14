<template>
  <div  v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.6)" style="width: 100%;position: relative" >
      <div style="float: right;margin-right:30px;margin-top: 20px;">
        <el-radio-group   v-model="radio">
          <el-radio-button label="菜品"></el-radio-button>
          <el-radio-button label="标准物料"></el-radio-button>
        </el-radio-group>
      </div>
    <div id="myChart" :style="{width: '100%', height:'550px'}"></div>
  </div>
</template>

<script>
    export default {
        name: "day-test",
      data () {
        return {
          radio:"菜品",
          dts:[],
          mae_values:[],
          rmse_values:[],
          loading:true,
          predict_value:[],
          target_predict_value:[],
          replenishment_num:[],
          target_replenishment_num:[],
          day_week:[]
        }
      },
      watch:{
        radio(){
          if(this.radio =="菜品"){
            this.getcpData()
          }
          if(this.radio =="标准物料"){
            this.getwlData()
          }
        }
      },
      created(){
        this.getcpData()
      },
      mounted(){


      },
      methods: {

          getcpData(){
            this.loading = true
            $.ajax({
              type:"get",
              url:"http://47.105.42.138:8080/hdl/dish/day",
              dataType:"JSON",
              data:{},
            }).success(res=>{
              this.loading = false
              console.log(res)
              this.dts = res.dts
              this.mae_values = res.mae_values
              this.rmse_values = res.rmse_values
              this.predict_value = res.predict_value
              this.target_predict_value=res.target_predict_value
              res.day_week.forEach((v,i)=>{
                if(v=="Monday"){
                  res.day_week[i]="星期一"
                }
                if(v=="Tuesday"){
                  res.day_week[i]="星期二"
                }
                if(v=="Wednesday"){
                  res.day_week[i]="星期三"
                }
                if(v=="Thursday"){
                  res.day_week[i]="星期四"
                }
                if(v=="Friday"){
                  res.day_week[i]="星期五"
                }
                if(v=="Saturday"){
                  res.day_week[i]="星期六"
                }
                if(v=="Sunday"){
                  res.day_week[i]="星期日"
                }
              })
              this.day_week = res.day_week
              this.drawLine();
            }).error(err=>{
              console.log(err)
              this.loading = false
            })
          },
        getwlData(){
          this.loading = true
          $.ajax({
            type:"get",
            url:"http://47.105.42.138:8080/hdl/material/day",
            dataType:"JSON",
            data:{},
          }).success(res=>{
            console.log(res)
            this.dts = res.dts
            this.mae_values = res.mae_values
            this.rmse_values = res.rmse_values
            res.day_week.forEach((v,i)=>{
              if(v=="Monday"){
                res.day_week[i]="星期一"
              }
              if(v=="Tuesday"){
                res.day_week[i]="星期二"
              }
              if(v=="Wednesday"){
                res.day_week[i]="星期三"
              }
              if(v=="Thursday"){
                res.day_week[i]="星期四"
              }
              if(v=="Friday"){
                res.day_week[i]="星期五"
              }
              if(v=="Saturday"){
                res.day_week[i]="星期六"
              }
              if(v=="Sunday"){
                res.day_week[i]="星期日"
              }
            })
            this.day_week = res.day_week
            this.drawLine();
            this.replenishment_num = res.replenishment_num
            this.target_replenishment_num=res.target_replenishment_num
            this.loading = false
          }).error(err=>{
            console.log(err)
            this.loading = false
          })
        },
        formatterFun(params){
            if(this.radio == "菜品"){
              return '均方误差:'+this.rmse_values[params[0].dataIndex]+ '<br/>'
                +'平均绝对误差:'+this.mae_values[params[0].dataIndex]+ '<br/>'+
                "实际值:"+this.predict_value[params[0].dataIndex]+ '<br/>'+
                '预测值:'+this.target_predict_value[params[0].dataIndex]+ '<br/>'+
                '日期:'+this.dts[params[0].dataIndex]+ '<br/>'+
                '星期:'+this.day_week[params[0].dataIndex]

            }else{
              return '均方误差:'+this.rmse_values[params[0].dataIndex]+ '<br/>'
                +'平均绝对误差:'+this.mae_values[params[0].dataIndex]+ '<br/>'+
                "实际值:"+this.replenishment_num[params[0].dataIndex]+ '<br/>'+
                '预测值:'+this.target_replenishment_num[params[0].dataIndex]+ '<br/>'+
                '日期:'+this.dts[params[0].dataIndex]+ '<br/>'+
                '星期:'+this.day_week[params[0].dataIndex]
            }

        },
        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))

          // 绘制图表
          myChart.setOption({
            title: {
              text: '每日销售预测RMSE&MAE误差对比',
              subtext: '数据来自四川海底捞餐饮有限公司',
              x: 'center'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // type: 'cross'
              },
              formatter:this.formatterFun
            },
            legend: {
              data:['平均绝对误差','均方误差'],
              x: 'left'
            },
            toolbox: {
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },

                restore: {},
                saveAsImage: {}
              }
            },
            axisPointer: {
              link: {xAxisIndex: 'all'}
            },
            dataZoom: [
              {
                show: true,
                realtime: true,
                start: 30,
                end: 70,
                xAxisIndex: [0, 1]
              },
              {
                type: 'inside',
                realtime: true,
                start: 30,
                end: 70,
                xAxisIndex: [0, 1]
              }
            ],
            grid: [{
              left: 50,
              right: 50,
              height: '30%'
            }, {
              left: 50,
              right: 50,
              top: '55%',
              height: '30%'
            }],
            xAxis : [
              {
                type : 'category',
                boundaryGap : false,
                axisLine: {onZero: true},
                data: this.dts
              },
              {
                gridIndex: 1,
                type : 'category',
                boundaryGap : false,
                axisLine: {onZero: true},
                data: this.dts,
              }
            ],
            yAxis : [
              {
                name : '均方误差',
                type : 'value',
              },
              {
                gridIndex: 1,

                name : '平均绝对误差',
                type : 'value',
                inverse: false
              }
            ],
            series : [
              {
                  name:'均方误差',
                  type:'line',
                  symbolSize: 8,
                  hoverAnimation: false,
                  data:this.rmse_values
              },
              {
                name:'平均绝对误差',
                symbolSize: 8,
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: this.mae_values,
                hoverAnimation: false,
                type: 'line'
              }
            ]
          });
        }
      }
    }
</script>

<style scoped>
  #myChart{
    margin-top: 40px;
  }
</style>
