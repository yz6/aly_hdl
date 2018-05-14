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
        color:{color:'#FA102A'},
        adata:[],
        option:{},
        predict_value:[],
        target_predict_value:[],
        replenishment_num:[],
        target_replenishment_num:[],
        Temp_data:[],
        cp:"菜品",
        day_week:[]


      }
    },
    watch:{
      radio(){
        if(this.radio =="菜品"){
          this.getcpData()
          this.cp = "菜品"
        }
        if(this.radio =="标准物料"){
          this.getwlData()
          this.cp = "标准物料"
        }
      },
      radio1(){
        if(this.radio1 == "RMSE"){
          if(this.radio =="菜品"){
            this.getcpData()
          }
          if(this.radio =="标准物料"){
            this.getwlData()
          }
        }else{
          if(this.radio =="菜品"){
            this.getcpData()
          }
          if(this.radio =="标准物料"){
            this.getwlData()
          }
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
          this.rmseORmae_values = res.rmse_values
          this.predict_value = res.predict_value
          this.target_predict_value = res.target_predict_value
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
          this.generateData(res)
          this.loading=false
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
         this.generateData(res)
          this.drawLine();
          this.loading=false
        }).error(err=>{
          console.log(err)
          this.loading=false
        })
      },
      generateData(data) {
        console.log(data)
        this.Temp_data = [];
        var values = "";
        var names = "";
        if(this.radio =="菜品"){
          names = "dish_names"
        }else{
          names = "material_names"
        }
        if(this.radio1=="RMSE"){
          values = "rmse_values"
        }else{
          values = "mae_values"
        }
        this.Temp_data.push(["dts",names,values]);
        for(var i=0,length=data[values].length;i<length;i++){
          this.Temp_data.push([data["dts"][i],data[names][i],data[values][i]])
        }
        console.log(this.Temp_data)
      },
      formatterFun(params){
        if(this.radio == "菜品"){
          return this.radio1 +':' + params.value[2]+ '<br/>'
            +this.radio+':'+params.value[1]+ '<br/>'+
            "日期:"+params.value[0]+ '<br/>'
            +'店铺:'+this.shop_names[params.dataIndex]+'<br/>'
            +"实际值:"+this.predict_value[params.dataIndex]+'<br/>'+
            "预测值:"+this.target_predict_value[params.dataIndex]+ '<br/>'+
            '日期:'+this.dts[params.dataIndex]+ '<br/>'+
            '星期:'+this.day_week[params.dataIndex]
        }else{
          return this.radio1 +':' + params.value[2]+ '<br/>'
            +this.radio+':'+params.value[1]+ '<br/>'+
            "日期:"+params.value[0]+ '<br/>'
            +'店铺:'+this.shop_names[params.dataIndex]+'<br/>'
            +"实际值:"+this.replenishment_num[params.dataIndex]+'<br/>'+
            "预测值:"+this.target_replenishment_num[params.dataIndex]+ '<br/>'+
            '日期:'+this.dts[params.dataIndex]+ '<br/>'+
            '星期:'+this.day_week[params.dataIndex]
        }
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        var values = "";
        var names = "";
        if(this.radio =="菜品"){
          names = "dish_names"
        }else{
          names = "material_names"
        }
        if(this.radio1=="RMSE"){
          values = "rmse_values"
        }else{
          values = "mae_values"
        }
        this.option = {
          title: {
            text: '每日销售预测RMSE&MAE误差对比',
            subtext: '数据来自四川海底捞餐饮有限公司',
            x: 'center'
          },
          grid3D: {},
          tooltip: {formatter:this.formatterFun},
          xAxis3D: {
            type: 'category'
          },
          yAxis3D: {
            type: 'category'
          },
          zAxis3D: {},
          visualMap: {
            show: false,
            max: 60,
            inRange: {
              color: ['#313695',  '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
          },
          dataset: {
            dimensions: [
              '日期',
              this.radio,
              this.radio1,
            ],
            source: this.Temp_data
          },

          series: [
            {
              type: 'bar3D',
              // symbolSize: symbolSize,
              shading: 'lambert',
              encode: {
                x: 'dts',
                y: names,
                z: values,
              }
            }
          ]
        };
        myChart.setOption(this.option);
      }
    }
  }
</script>

<style scoped>
  #myChart{
    margin-top: 40px;

  }
</style>
