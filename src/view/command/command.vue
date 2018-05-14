<template>
  <div id="commandAll" class="command"
       v-loading="loading2"
       element-loading-text="数据加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="command-top">
      <div class="top-left">
        <h2>全球门店销售预测及智能补货</h2>
        <p style="font-size: 12px;margin-top: 8px">{{startDate}}</p>
      </div>
      <div class="top-right">
        <span style="color: #fff;font-size: 16px;" >￥</span> <span style="  letter-spacing: 2px;color: #F4B400;font-size: 35px;">{{saleAmt}}</span> <span style="color: #fff;font-size: 16px;">元</span>
        <p style="font-size: 12px;letter-spacing: 1px">未来14天预测销售额</p>
      </div>
      <div style="position: absolute; right: 20px; color: #bbb">
        任务：
        <el-select v-model="taskId" placeholder="请选择">
          <el-option
            v-for="item in taskIdSelect"
            :key="item.id"
            :label="item.fcsDate + '/两周/'  +item.id "
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="command-body">
        <div class="bodyBox">


          <div class="ring-box">
           <div class="box-top">
             <div class="chartTitle" ><i class="ctIcon"></i>TOP5门店销售比</div>
             <g2-ring :id="c1" :chartData="ringData"></g2-ring>
           </div>
           <div class="box-bottom">
             <div class="chartT" ><i class="ctIcon"></i>缺货商品总额</div>
             <div class="allPrice-box" style="margin-top: 30px">
               <span style="color: #bbb;font-size: 14px;margin-top: -10px; display: block" v-if="shortAmt==0">暂无缺货商品</span>
               <span v-if="shortAmt!=0"><span style="font-size: 50px;color: #F4B400;">{{shortAmt}}</span>元</span>
             </div>
           </div>
          </div>


          <div class="z-box">
            <div class="box-top">
              <div class="chartTitle" > <i class="ctIcon"></i>未来14天销售预测</div>
              <g2-histogram
                :id="c2"
                :chartData="zData"
                :rowName="'预  测  销  售  额'"
                :columnName="'预测日期  '+startDate+'——'+endDate"
              ></g2-histogram>

            </div>
            <div class="box-bottom" style="margin-top: 30px">
              <div class="chartT" ><i class="ctIcon"></i>缺货商品门店TOP5</div>
              <div class="allPrice-box">
                <div style="color: #bbb;font-size: 14px;" v-if="qhShop.length<=0">暂无缺货门店</div>
                <div style="font-size: 8px" v-for="(val,index) in qhShop"><span class="topIcon">{{index+1}}</span>&nbsp;&nbsp;&nbsp;{{val}}</div>
              </div>
            </div>
          </div>


          <div class="pie-box">
           <div class="box-top">
             <div class="chartTitle" > <i class="ctIcon"></i>未来14天利润率</div>
             <g2-pie :id="c3"  :chartData="pieData"></g2-pie>
           </div>
            <div class="box-bottom" style="margin-top: 20px">
              <div class="chartT" ><i class="ctIcon"></i>缺货商品供应商TOP5</div>

              <div class="allPrice-box">
                <div style="color: #bbb;font-size: 14px;" v-if="qhSuppliers.length<=0">暂无缺货商品供应商</div>
                <div style="font-size: 8px" v-for="(val,index) in qhSuppliers"><span class="topIcon2">{{index+1}}</span>&nbsp;&nbsp;&nbsp;{{val}}</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import G2Pie from '@/components/G2Pie'
  import G2Histogram from '@/components/G2Histogram'
  import G2Ring from "@/components/G2Ring"
  export default {
    components: {
      G2Pie,
      G2Histogram,
      G2Ring
    },
    data() {
      return {
        loading2:true,
        //
        saleAmt:null,
        c1: 'c1',
        serverData: [],
        shortAmt:null,
        c2:"c2",
        c3:"c3",
        date:"2018/2/14——2018/2/27",
        endDate:null,
        startDate:null,
        lr:null,
        ringData : [],
        zData : [],
        pieData : [],
        qhShop:[],
        qhSuppliers:[],
        taskId:"",
        taskIdSelect:[]
      }
    },
    created () {
      this.getAllShop()
    },
    watch:{
      taskId(){
        this.getData()
      }
    },
    mounted(){

    },
    computed:{
    },
    methods:{
      getAllShop(){
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/queryFinishTask",
          data:  {},
          dataType: "json"
        }).success(res => {
          console.log(res)
          this.taskIdSelect = res.result
          if(this.$route.query.taskId){
            this.taskId= this.$route.query.taskId
          }else{
            if(res.result[0].id){
              this.taskId = res.result[0].id
            }

          }
          this.getData()
        })
      },
        getData(){
        this.loading2=true
        $.ajax({
          type:"post",
          url:"http://supply.lovedabai.com/business/api/queryBiData",
          data:{"taskId":this.taskId},
          dataType:"json"
        }).success(res=>{
          this.loading2=false
          console.log(res)
          this.saleAmt = res.result.saleAmt;
          this.startDate = res.result.startDate
          this.endDate = res.result.endDate;
          this.ringData = res.result.shopSales;
          this.zData= res.result.saleQty;
          this.shortAmt = res.result.shortAmt
          this.qhShop=res.result.shortShops
          this.qhSuppliers =res.result.shortSuppliers
          console.log(this.shortAmt)
          var a = this.lr
          this.lr =  (res.result.saleAmt*100-res.result.shortAmt*100)/100
          this.pieData =  [{name:"成本",value:this.shortAmt},
            {name:"毛利润",value:this.lr}]
          for(var i =0;i<this.ringData.length;i++){
            this.ringData[i].name=this.ringData[i].name.replace(/[ ]/g,"");
          }
          console.log(this.ringData)
        }).error(res=>{
          this.loading2=false
        })
        }
    }
  }
</script>
<style scoped>
  .command{
    padding: 20px 20px;
    background: #00356B;
    background-image: url("../../../src/assets/mapBg.png");
    background-size: 85% 90% ;
    background-position: center;
    background-repeat: no-repeat;
  }
  .command-top{

    height: 50px;
    display: flex;
    flex: 1;
    padding: 20px 30px;
    margin-left: -20px;

  }
  .command-top .top-left{
    color: #fff;
    padding: 20px;
    padding-left: 50px;
    margin-left: -30px;
    letter-spacing: 1px;
    margin-top: -40px;
    background:  linear-gradient(to right, rgba(0,159,188,.6), rgba(0,0,0,0));
  }
  .top-left h2{

    font-weight: lighter;
  }
  .top-right{
    color: #fff;
    margin-left: 10%;
    margin-top: -10px;
  }
  .command-body{
    width: 100%;

  }
  .bodyBox{
    width: 80%;
    margin: 40px auto 0px;
    display: flex;
  }
  .pie-box{
    width: 33%;
    margin-left: 20px;
  }
  .z-box{
    width:30%;
  }
  .ring-box{
    width:33%;
  }
  .chartTitle{
    text-indent: 70px;
    color: #fff;
  }
  .ctIcon{
    display: inline-block;
    margin-right: 10px;
    width: 14px;
    height: 14px;
    background: #00C0DD;
    border-radius: 3px;
  }
  .box-bottom{
    margin-top: 20px;
    padding-left: 70px;
  }
  .allPrice-box{
    margin-top: 20px;
    color: #fff;
  }
  .topIcon{
    width: 14px;
    height: 14px;
    background: #F4B400;
    display: inline-block;
    border-radius: 50%;
    text-indent: 3px;
    font-size: 12px;
    line-height: 14px;
    margin: 3px 0;
  }
  .topIcon2{
    width: 14px;
    height: 14px;
    background: #6790D3;
    display: inline-block;
    border-radius: 50%;
    text-indent: 4px;
    font-size: 12px;
    line-height: 14px;
    margin: 3px 0;
  }
  .chartT{
    color: #fff;
  }
  .command >>> .el-input__inner{
    background: #00356B;
    border: 1px solid #6790D3 ;
    color: #bbbbbb;
  }
  #commandAll{
    height: 100%;
  }
</style>
