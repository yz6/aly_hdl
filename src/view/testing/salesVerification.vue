<template>
  <div class="bodyContent">


    <div class="bodyLeft">
     <div style="float: left;width: 18%;margin-right: 2%;padding-top: 20px">
       <div >
         <el-select v-model="value" placeholder="请选择">
           <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
       </div>
       <el-table
         border
         ref="singleTable"
         :data="tableData"
         highlight-current-row
         @current-change="handleCurrentChange"
         style="margin-right: 3%;cursor: pointer;height:500px;overflow-y: scroll">
         <el-table-column
           type="index"
           label="序号"
           width="50">
         </el-table-column>
         <el-table-column
           label="标准原料名称"
           property="cp"
           show-overflow-tooltip
         >
         </el-table-column>
       </el-table>
     </div>
      <div id="myChart" :style="{width: '77%', height:'600px',float:'right'}"></div>
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
            dish_names:[],
            predict_value:[],
            target_predict_value:[],
            daily_dish_material_basic_num:[],
            replenishment_num:[],
            stock_start:[],
            target_daily_dish_material_basic_num:[],
            stock_end:[],
            target_replenishment_num:[],
            tableData:null,
            options: [{
              value: " ",
              label: ''
            }],
            timeData: [],
            day_week:[]
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
            url:"http://47.105.42.138:8080/sale/material/list/"+this.value,
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
              self.setCurrent(self.tableData[0])
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
            url:"http://47.105.42.138:8080/sale/material/detail/"+val.cpid,
            dataType:"JSON",
            data:{},
          }).success(res=>{
            console.log(res)
            this.dts = res.dts
            this.target_predict_value = res.target_predict_value
            this.predict_value=res.predict_value
            this.daily_dish_material_basic_num = res.daily_dish_material_basic_num
            this.replenishment_num = res.replenishment_num
            this.stock_end = res.stock_end
            this.stock_start=res.stock_start
            this.target_daily_dish_material_basic_num = res.target_daily_dish_material_basic_num
            this.target_replenishment_num = res.target_replenishment_num
            this.drawLine()
          }).error(err=>{
            console.log(err)
          })
        },
        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            title: {
              text: '门店标准原料实际和预测进销存对比',
              subtext: '数据来自四川海底捞餐饮股份有限公司',
              x: 'center'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                animation: false
              }
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
                xAxisIndex: [0, 1]
              },
              {
                type: 'inside',
                realtime: true,
                xAxisIndex: [0, 1]
              },
              {
                type: 'inside',
                realtime: true,
                xAxisIndex: [0, 2]
              }
            ],
            grid: [{
              left: 50,
              right: 30,
              height: '20%'
            }, {
              left: 50,
              right: 30,
              top: '34%',
              height: '20%'
            }, {
              left: 50,
              right: 30,
              top: '65%',
              height: '20%'
            }],
            xAxis : [
              {
                type : 'category',
                axisLine: {onZero: true},
                data: this.dts
              },
              {
                gridIndex: 1,
                type : 'category',
                axisLine: {onZero: true},
                data:  this.dts,
                show:false
              },
              {
                gridIndex: 2,
                type : 'category',
                axisLine: {onZero: true},
                data:  this.dts
              }
            ],
            yAxis : [
              {
                name : '进-标准原料',
                type : 'value',
             },
              {
                gridIndex: 1,
                name : '销-标准原料',
                type : 'value',
                inverse: true,
              },
              {
                gridIndex: 2,
                name : '存-标准原料',
                type : 'value',
              }
            ],
            series : [
              {
                name:'实际补货量',
                itemStyle:{color:'#FA102A'},
                type:'bar',
                stack: '库存',
                barMinHeight:5,
                data:this.replenishment_num
              },
              {
                name:'营业前库存',
                itemStyle:{color:'#353F42'},
                type:'bar',
                stack: '库存',
                data:this.stock_start
              },
              {
                name:'建议补货量',
                itemStyle:{color:'#00ACCB'},
                type:'bar',
                data:this.target_replenishment_num
              },
              {
                name:'实际标准原料消耗',
                itemStyle:{color:'#FA102A'},
                type:'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 8,
                hoverAnimation: false,
                data:this.daily_dish_material_basic_num

              },
              {
                name:'预测标准原料消耗',
                itemStyle:{color:'#00ACCB'},
                type:'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 8,
                hoverAnimation: false,
                data:this.target_daily_dish_material_basic_num
              },
              {
                name:'结业后库存',
                itemStyle:{color:'#353F42'},
                type:'bar',
                xAxisIndex: 2,
                yAxisIndex: 2,
                data:this.stock_end
              },
            ]
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
    width: 100%;
    display: flex;
  }
  #myChart{
    margin-right: 2%;
    padding-left:10px;
  }
</style>
