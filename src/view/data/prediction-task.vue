<template>
  <div class="predictionTask">
    <div class="title_words">基础数据配置</div>
    <div class="basic_data_box">
      <div class="xCard-box">
        <div class="basic_data_list">
          <div class="card-title">门店信息(个)</div>
          <div class="card-body">
            <span class="pull-left orangeNum">68</span>
            <span class="pull-right"><i class="fa fa-upload"></i></span>
          </div>
        </div>
        <div class="basic_data_list">
          <div class="card-title">商品信息(个)</div>
          <div class="card-body">
            <span class="pull-left orangeNum">65568</span>
            <span class="pull-right"><i class="fa fa-upload"></i></span>
          </div>
        </div>
        <div class="basic_data_list">
          <div class="card-title">供应商(个)</div>
          <div class="card-body">
            <span class="pull-left orangeNum">48</span>
            <span class="pull-right"><i class="fa fa-upload"></i></span>
          </div>
        </div>
        <div class="basic_data_list">
          <div class="card-title">促销数据(行)</div>
          <div class="card-body">
            <span class="pull-left orangeNum">82212</span>
            <span class="pull-right"><i class="fa fa-upload"></i></span>
          </div>
        </div>
        <div class="basic_data_list">
          <div class="card-title">补货参数(行)</div>
          <div class="card-body">
            <span class="pull-left orangeNum">562455</span>
            <span class="pull-right"><i class="fa fa-upload"></i></span>
          </div>
        </div>
        <div class="basic_data_list">
          <div class="card-title">日结数据(行)</div>
          <div class="card-body">
            <span class="pull-left orangeNum">2.69</span>
            <span class="pull-right"><i class="fa fa-upload"></i></span>
          </div>
        </div>
        <div class="basic_data_list">
          <div class="card-title">历史采购单(个)</div>
          <div class="card-body">
            <span class="pull-left orangeNum">6</span>
            <span class="pull-right"><i class="fa fa-upload"></i></span>
          </div>
        </div>
      </div>
    </div>
    <div class="prediction-option">
      <div class="prediction-time">
        <div class="title_words">销售预测开始时间</div>
        <div class="option-box">
          <el-date-picker
            v-model="preBenDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div class="prediction-cycle">
        <div class="title_words">销售预测周期</div>
        <div class="option-box">
          <ul>
            <li class="pull-left">预测一天</li>
            <li class="pull-left">预测一周</li>
            <li class="pull-left prediction-active">预测两周</li>
            <li class="pull-left">预测一月</li>
          </ul>
        </div>
      </div>

    </div>
    <div v-show="startShow" class="start-prediction-box">
      <div @click="beginpre" class="start-btn">
        开始预测
      </div>
    </div>
    <div v-show="beginShow" class="being-predicted-box ">
      <div v-show="bHide" class="begin-box">
        <div class="BGimg"></div>
        <div  class="again_btn">正在预测</div>
      </div>
      <router-link to="/app/app-left-tab/order"><div style="text-align: center;margin-bottom: 10px" v-show="bShow" ><el-button type="primary" >查看结果</el-button></div></router-link>
      <p v-show="bHide" class="time_consuming">智能分析中...</p>
      <p v-show="bShow" class="time_consuming">预测成功！</p>
      <div class="predicten-progress">

        <div class="predicted-box-list pull-left">
          <div class="progress-btn" v-if="num"  v-loading="loading">1</div>
          <div class="progress-over" v-if="isDone"><span  class="el-icon-check"></span></div>
          <p v-if="isHide">启动预测</p>
        </div>

        <div class="progerss-bar progerss-bar1"></div>

        <div class="predicted-box-list pull-left">
            <div class="progress-btn" v-if="num1"  v-loading="loading1">2</div>
          <div class="progress-over" v-if="isDone1"><span class="el-icon-check"></span></div>
          <p v-if="isHide1">生成预测任务</p>
          <div v-if="showFlag" class="seeResult-btn"><router-link v-show="weixinBtnShow" to="/app/app-left-tab/task_list"  target="_blank">查看任务列表</router-link></div>
        </div>

        <div class="progerss-bar progerss-bar2"></div>

        <div class="predicted-box-list pull-left">
          <div class="progress-btn" v-if="num2"  v-loading="loading2" >3</div>
          <div class="progress-over" v-if="isDone2"><span class="el-icon-check"></span></div>
          <p v-show="isHide2">生成销售预测</p>
          <div v-if="showFlag1" class="seeResult-btn"><router-link v-show="weixinBtnShow" to="/app/app-left-tab/fore_cast" target="_blank">查看销售预测</router-link></div>
        </div>

        <div class="progerss-bar progerss-bar3"></div>

        <div class="predicted-box-list pull-left">
            <div class="progress-btn" v-if="num3"  v-loading="loading3">4</div>
          <div class="progress-over" v-if="isDone3"><span class="el-icon-check"></span></div>
            <p v-show="isHide3">生成智能补货</p>
          <div v-if="showFlag2" class="seeResult-btn"><router-link v-show="weixinBtnShow" to="/app/app-left-tab/intelligent_supply" target="_blank">查看智能补货</router-link></div>
        </div>

        <div class="progerss-bar progerss-bar4"></div>

        <div class="predicted-box-list pull-left">
          <div class="progress-btn" v-if="num4"  v-loading="loading4">5</div>
          <div class="progress-over" v-if="isDone4"><span class="el-icon-check"></span></div>
          <p v-show="isHide4">生成采购单</p>
          <div v-if="showFlag3" class="seeResult-btn"><router-link v-show="weixinBtnShow" to="/app/app-left-tab/order" target="_blank">查看采购单</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import  Raphael from '../../../static/js/raphael.min'
  export default {
    name: "prediction-task",
    data() {
      return {
        value1: '',
        beginShow: false,
        startShow: true,
        preBenDate:'2017-11-14',
        taskId:'',
        loading:true,
        loading1:false,
        loading2:false,
        loading3:false,
        loading4:false,
        showFlag:false,
        showFlag2:false,
        showFlag1:false,
        showFlag3:false,
        bShow:false,
        bHide:true,
        waitBtn:true,
        overBtn:true,
        waitBtn1:true,
        overBtn1:true,
        isDone:null,
        isDone1:null,
        isDone2:null,
        isDone3:null,
        isDone4:null,
        isHide:true,
        isHide1:true,
        isHide2:true,
        isHide3:true,
        isHide4:true,
        num:true,
        num1:true,
        num2:true,
        num3:true,
        num4:true,
        weixinBtnShow:true
      }
    },
    watch:{
      preBenDate(){
        this.beginShow=false
        this.startShow= true
      }
    },
    created(){
    },
    mounted(){

    },
    methods: {
      disabledDate(time) {
        let timeSpace = time.getTime() >= Date.now() ;
        return timeSpace;
      },
      beginpre() {
          if (this.preBenDate){
            this.beginShow = true;
            this.startShow = false;
            this.loading = true;
            this.waitBtn=true;
            this.waitBtn1=true;
            this.isHide=true;
            var self = this
            setTimeout(function () {
              self.num=false
              self.loading=false
              self.loading1=true
              self.isDone=true
            },2000)
            console.log("创建任务成功")
            var self1 = this
            setTimeout(function () {
              self1.num1=false
              self1.loading1=false
              self1.isDone1=true
              self1.loading2=true
            },8000)
            setTimeout(function () {
              self1.loading2=false
              self1.isDone2=true
              self1.loading3=true
              self1.num2=false
              console.log("销售预测成功")
            },30000)

          }else{
            this.$message({
              message: '当前日期暂时不可选择',
              type: 'warning'
            });
          }
          console.log(123)
        $.ajax({
          type:"post",
          url:"http://supply.lovedabai.com/business/api/run"+'/'+this.preBenDate,
          data:{},
          dataType:"json"
        }).success(res=>{
          this.taskId = res.result
          console.log(res)
          if(res.code!=1000){
            setTimeout(function () {
              self1.loading4=false
              self1.isDone4=true
              self1.num4=false
              self1.bShow=true
              self1.bHide=false
              self1.num3=false
              self1.loading3=false
              self1.isDone3=true
              self1.loading4=true
            },1000)
          }else{
            this.beginShow = false;
            this.startShow = true;
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }

        }).error(res=>{
          console.log(res)
          // alert(res.result.code)
          self1.loading4=false
          self1.isDone4=true
          self1.num4=false
          self1.bShow=true
          self1.bHide=false
          self1.num3=false
          self1.loading3=false
          self1.isDone3=true
          self1.loading4=true
        })


      },
    }
  }
</script>

<style scoped>
  .predictionTask {
    width: 100%;
    padding: 10px 15px;
  }

  .xCard-box {
    display: flex;
    width: 100%;
  }

  .title_words {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .basic_data_box .basic_data_list {
    float: left;
    width: 15%;
    height: 60px;
    margin: 0.3%;
    background: #fff;
    padding: 10px;
  }

  .basic_data_list .card-title {
    font-size: 14px;
    height: 20px;
    margin-bottom: 10px;
  }

  .pull-left {
    float: left;
  }

  .pull-right {
    float: right;
  }

  .basic_data_list .orangeNum {
    color: #F4B400;
    font-size: 20px;
  }

  .basic_data_list i {
    color: #00CDEC;
    font-size: 18px;
    margin-top: 6px;
    margin-right: 5px;
    font-weight: lighter;
  }

  .prediction-option {
    display: flex;
    width: 100%;
    margin-top: 25px;
    margin-bottom: 10px;
    padding: 0 4px;
  }

  .title_words {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .prediction-option .option-box {
    height: 30px;
    background: #fff;
    padding: 25px 5px;
  }

  .option-box li {
    width: 20%;
    margin: 0 2%;
    border: 1px solid #ddd;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 4px;
  }

  .option-box .prediction-active {
    color: deepskyblue;
    border-color: deepskyblue;
  }

  .prediction-cycle {
    width: 49%;
  }

  .option-box {
    width: 100%;
  }

  .prediction-time {

    width: 48.5%;
    margin-right: 1.5%;
  }

  ul, li {
    list-style: none;
  }

  .displayNone {
    display: none;
  }

  .start-prediction-box {
    width: 100%;
    height: 280px;
    background: #fff;
    padding-top: 25px
  }

  .start-btn {
    position: relative;
    width: 50px;
    height: 50px;
    padding: 20px 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    line-height: 20px;
    font-size: 18px;
    color: #fff;
    background: deepskyblue;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .start-prediction-box p {
    text-align: center;
  }

  .time_consuming {
    color: #000;
    font-size: 14px;
  }

  .being-predicted-box {
    width: 100%;
    height: 280px;
    background: #fff;
    padding-top: 25px;
  }

  .begin-box {
    position: relative;
    width: 50px;
    height: 50px;
    padding: 20px 20px;
    display: flex;
    text-align: center;
    align-items: center;
    line-height: 20px;
    font-size: 18px;
    color: #fff;
    background: deepskyblue;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .being-predicted-box p {
    text-align: center;
  }

  .predicten-progress {
    width: 100%;
    margin: 0 auto;
    height: 200px;
    position: relative;
    display: flex;
  }

  .predicted-box-list {
    width: 17.5%;
    height: 100px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
  }

  .predicted-box-list .progress-btn {
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #BBBBBB;
    line-height: 30px;
    color: #bbbbbb;
  }
  .predicted-box-list .progress-over{
    width: 30px;
    height: 30px;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #00CDEC;
    line-height: 30px;
    color: #00CDEC;
  }
  .option-box >>> .el-date-editor.el-input {
    margin-left: 20px;
  }
  .option-box >>> .el-input__prefix, .el-input__suffix{
    top: -5px;
  }
  .predicted-box-list>>> .el-loading-spinner .el-loading-text{
    font-size: 13px;
  }
  .predicted-box-list>>> .el-loading-mask{
    border-radius: 50%;
  }
  .seeResult-btn{
    position: absolute;
    bottom: 6px;
    left: 30px;
    font-size: 12px
  }
  .predicted-box-list p{
    text-indent: 10px;
    font-size: 14px;
  }
  .predicted-box-list>>> .el-loading-spinner{
    right: 6px;
  }
  .progerss-bar{
    margin-top: 50px;
    border-radius: 20px;
    width: 10%;
    height: 3px;
    background: #00CDEC;
  }
  .predictionTask>>>.el-input__suffix{
    display: none;
  }
  .predictionTask>>>.el-loading-mask{
    background-color: rgba(255,255,255,.3); ;
  }
</style>
