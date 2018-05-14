<template>
  <div class="bodyContent">
    <div class="bodyLeft">
     <div style="width: 18%;padding-top: 20px">
       <el-select v-model="value" placeholder="请选择">
         <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>

       <el-table
         border
         ref="singleTable"
         :data="tableData"
         highlight-current-row
         @current-change="handleCurrentChange"
         style="float: left;margin-right: 3%;cursor: pointer;height:500px;overflow-y: scroll">
         <el-table-column
           type="index"
           label="序号"
           width="50">
         </el-table-column>
         <el-table-column
           label="菜品名称"
           property="cp"
           show-overflow-tooltip>
         </el-table-column>
       </el-table>
     </div>
      <div id="myChart" :style="{width: '77%', height:'550px',float:'right'}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sales-verification",
    data(){
      return{
        value:"",
        dts:[],
        day_week:[],
        dish_names:[],
        predict_value:[],
        target_predict_value:[],
        tableData:null,
        options: [{
          value: " ",
          label: ''
        },],

      }
    },
    created(){
      this.getMDList()
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      //门店信息
      getMDList(){
        $.ajax({
          type:"get",
          url:"http://47.105.42.138:8080/sale/shop/list",
          dataType:"JSON",
          data:{},
        }).success(res=>{

          this.value=Object.keys(res)[0]
          this.options[0].value=Object.keys(res)[0]
          this.options[0].label=res[Object.keys(res)[0]]
          this.getDishList()
        }).error(err=>{
          console.log(err)
        })
      },
      //菜品信息
      getDishList(){
        $.ajax({
          type:"get",
          url:"http://47.105.42.138:8080/sale/dish/list/"+this.value,
          dataType:"JSON",
          data:{},
        }).success(res=>{
          console.log(res)
          var values = Object.values(res)
          var id = Object.keys(res)
          var ARR= []
          values.forEach((v,i)=>{
            ARR.push({cp:v,cpid:id[i]})
          })
          this.tableData = ARR
          console.log(ARR[0].cpid)
          var self = this
          setTimeout(function () {
            self.setCurrent(self.tableData[1])
          },500)
        }).error(err=>{
          console.log(err)
        })
      },
      //默认选择第X行
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      //选择行
      handleCurrentChange(val) {
        $.ajax({
          type:"get",
          url:"http://47.105.42.138:8080/sale/dish/detail/"+val.cpid,
          dataType:"JSON",
          data:{},
        }).success(res=>{
          console.log(res)
          this.dts = res.dts
          this.target_predict_value = res.target_predict_value
          this.predict_value=res.predict_value
          res.day_week.forEach((v,i)=>{
            if(v=="MONDAY"){
              res.day_week[i]="周一"
            }
            if(v=="TUESDAY"){
              res.day_week[i]="周二"
            }
            if(v=="WEDNESDAY"){
              res.day_week[i]="周三"
            }
            if(v=="THURSDAY"){
              res.day_week[i]="周四"
            }
            if(v=="FRIDAY"){
              res.day_week[i]="周五"
            }
            if(v=="SATURDAY"){
              res.day_week[i]="周六"
            }
            if(v=="SUNDAY"){
              res.day_week[i]="周日"
            }
          })
          this.day_week = res.day_week
          this.drawLine()
        }).error(err=>{
          console.log(err)
        })
      },
      formatterFun(params){
        console.log(params)

        return  '预测销售:'+this.predict_value[params[0].dataIndex]+ '<br/>'+
          '实际销售:'+this.target_predict_value[params[0].dataIndex]+'<br/>'+
          '日期:'+this.dts[params[0].dataIndex]+ '<br/>'+
          '星期:'+this.day_week[params[0].dataIndex]
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '菜品实际销售和预测销售对比'
          },
          tooltip: {
            trigger: 'axis',
            formatter:this.formatterFun
          },
          legend: {
            data:['预测销售','实际销售']
          },

          toolbox: {
            feature: {
              saveAsImage: {}
            }

          },
          xAxis: {
            type: 'category',
            data: this.dts
          },
          yAxis: {
            type: 'value',
          },
          dataZoom: [{

          }],
          series: [{
            name:'实际销售',
            type:'line',
            stack: '总量',
            data:this.target_predict_value
          },
            {
              name:'预测销售',
              type:'line',
              stack: '总量',
              data:this.predict_value
            },]
        });
      }
    }
  }
</script>

<style scoped>
  .bodyContent{
    width: 100%;
  }
  .bodyLeft{
    display: flex;
    width: 100%;
  }
  #myChart{
    margin-right: 2%;
    margin-top: 30px;
  }
</style>
