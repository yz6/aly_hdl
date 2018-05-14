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
        <el-radio-group   v-model="radio1">
          <el-radio-button label="RMSE"></el-radio-button>
          <el-radio-button label="MAE"></el-radio-button>
        </el-radio-group>
    </div>
    <div   id="myChart" :style="{width: '100%', height:'550px'}"></div>
  </div>
</template>

<script>
  export default {
    name: "day-test",
    data () {
      return {
        radio:"菜品",
        radio1:"RMSE",
        dts:[],
        mae_values:[],
        rmse_values:[],
        shop_names:[],
        dish_names:[],
        loading:true,
        rmseORmae_values:[],
        predict_value:[],
        target_predict_value:[],
        replenishment_num:[],
        target_replenishment_num:[],
        color:{color:'#FA102A'},
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
      },
      radio1(){
        if(this.radio1 == "RMSE"){
          this.rmseORmae_values = this.rmse_values
          this.color = {color:'#FA102A'}
          this.drawLine()
        }else{
          this.rmseORmae_values = this.mae_values
          this.color = {color:"#00ACCB"}
          this.drawLine()
        }
      }
    },
    created(){
      this.getcpData()
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      getcpData(){
        this.loading = true
        console.log(123)
        $.ajax({
          type:"get",
          url:"http://47.105.42.138:8080/hdl/dish/detail",
          dataType:"JSON",
          data:{},
        }).success(res=>{
          console.log(res)
          this.dts = res.dts
          this.mae_values = res.mae_values
          this.rmse_values = res.rmse_values
          this.shop_names = res.shop_names
          this.dish_names = res.dish_names
          this.material_names = res.material_names
          this.loading=false
          this.rmseORmae_values = res.rmse_values
          this.predict_value = res.predict_value
          this.target_predict_value = res.target_predict_value
          console.log(this.rmseORmae_values)
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
          this.loading=false
        })
      },
      getwlData(){
        this.loading = true
        $.ajax({
          type:"get",
          url:"http://47.105.42.138:8080/hdl/material/detail",
          dataType:"JSON",
          data:{},
        }).success(res=>{
          console.log(res)
          this.dts = res.dts
          this.mae_values = res.mae_values
          this.rmse_values = res.rmse_values
          this.shop_names = res.shop_names
          this.dish_names = res.dish_names
          this.material_names = res.material_names
          this.rmseORmae_values = res.rmse_values
          this.replenishment_num = res.replenishment_num
          this.target_replenishment_num = res. target_replenishment_num
          console.log(this.dish_names)
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
          this.loading=false
        }).error(err=>{
          console.log(err)
          this.loading=false
        })
      },
      formatterFun(params){
        console.log(params)
        if(this.radio == "菜品"){
          return this.radio1 +':' + params[0].data+ '<br/>'
            +this.radio+':'+this.dish_names[params[0].dataIndex]+ '<br/>'
            +'店铺:'+this.shop_names[params[0].dataIndex]+'<br/>'
          +"实际值:"+this.predict_value[params[0].dataIndex]+'<br/>'+
            "预测值:"+this.target_predict_value[params[0].dataIndex]+ '<br/>'+
            '日期:'+this.dts[params[0].dataIndex]+ '<br/>'+
            '星期:'+this.day_week[params[0].dataIndex]
        }else{
          return this.radio1 +':' + params[0].data+ '<br/>'
            +this.radio+':'+this.material_names[params[0].dataIndex]+ '<br/>'
            +'店铺:'+this.shop_names[params[0].dataIndex]+'<br/>'
            +"实际值:"+this.replenishment_num[params[0].dataIndex]+'<br/>'+
            "预测值:"+this.target_replenishment_num[params[0].dataIndex] +'<br/>'+
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
          xAxis: [
            {
              type : 'category',
              scale:true,
              data: this.dts,
              splitLine: {
                show: false
              }
            }
          ],
          yAxis: {name : this.radio1,type: 'value'},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            formatter:this.formatterFun
          },
          dataZoom: [
           {
             start: 0,
             end: 1,
             filterMode: 'filter',
             type: 'slider'
          }],
          series : [
            {
              itemStyle:this.color,
              data: this.rmseORmae_values,
              type:'scatter',
              symbolSize: 8,
              hoverAnimation: false,
            },
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
