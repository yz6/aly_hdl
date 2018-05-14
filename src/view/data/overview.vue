<template>
  <div class="overView">
    <div class="top-box">
      <div class="pull-left data-sheet">
        <div class="pull-left dataTable-box">
          <div class="titile-box">
            底层数据表
          </div>
          <div class="bar-box">
            <ul>
              <li class="bar-list" style="height: 20px"></li>
              <li class="bar-list orangeBgColor" style="height: 27px"></li>
              <li class="bar-list" style="height: 32px"></li>
              <li class="bar-list orangeBgColor"></li>
              <li class="bar-list" style="height: 37px"></li>
              <li class="bar-list orangeBgColor" style="height: 18px"></li>
            </ul>

          </div>

        </div>
        <div class="pull-right dataNum-box">
          <div class="pull-left ">
            <p>数据(个)</p>
            <p class="dataNum">6</p>
          </div>
          <div class="pull-left">
            <p>昨日日数据(GB)</p>
            <p class="dataNum">1.3</p>
          </div>
          <div class="pull-left">
            <p>总数据(GB)</p>
            <p class="dataNum">17.5</p>
          </div>
        </div>
      </div>
      <div class="pull-right data-sheet">
        <div class="pull-left dataTable-box">
          <div class="titile-box">
            业务数据表
          </div>
          <div class="bar-box">
            <ul>
              <li class="bar-list"></li>
              <li class="bar-list orangeBgColor" style="height: 18px"></li>
              <li class="bar-list" style="height: 30px"></li>
              <li class="bar-list orangeBgColor" style="height: 25px"></li>
              <li class="bar-list" style="height: 27px"></li>
              <li class="bar-list orangeBgColor" style="height: 12px"></li>
            </ul>
          </div>
        </div>
        <div class="pull-right dataNum-box">
          <div class="pull-left ">
            <p>数据(个)</p>
            <p class="dataNum">6</p>
          </div>
          <div class="pull-left">
            <p>昨日日数据(GB)</p>
            <p class="dataNum">0.8</p>
          </div>
          <div class="pull-left">
            <p>总数据(GB)</p>
            <p class="dataNum">13.6</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <el-tabs v-model="activeName">
        <el-tab-pane label="所有数据" name="first">
          <div class="data-card">
            <div class="card_top">
              <div class="Ctitle">
                <span class="card_title pull-left">商品信息</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                商品的基础资料，商品编号，品名，店铺编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.43</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
          <div class="data-card">
            <div class="card_top">
              <div class="Ctitle">
                <span class="card_title pull-left">门店信息</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                门店的基础资料，门店编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.28</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
          <div class="data-card">
            <div class="card_top">
              <div class="Ctitle">
                <span class="card_title pull-left">供应商信息</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                供应商的基础资料，供应商编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.12</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
          <div class="data-card">
            <div class="card_top">
              <div class="Ctitle">
                <span class="card_title pull-left">门店补货参数</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                门店的基础资料，门店编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.84</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
          <div class="data-card blueBorder">
            <div class="card_top" style="background: #83EEFF">
              <div class="Ctitle">
                <span class="card_title pull-left">进销存日结数据</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                商品的基础资料，商品编号，品名，店铺编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.33</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
          <div class="data-card blueBorder">
            <div class="card_top" style="background: #83EEFF">
              <div class="Ctitle">
                <span class="card_title pull-left">历史采购单</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                商品的基础资料，商品编号，品名，店铺编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.81</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
          <div class="data-card">
            <div class="card_top">
              <div class="Ctitle">
                <span class="card_title pull-left">促销数据</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                商品的基础资料，商品编号，品名，店铺编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.23</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="底层数据" name="second">  <div class="data-card">
          <div class="card_top">
            <div class="Ctitle">
              <span class="card_title pull-left">商品信息</span>
              <span class="data pull-right">2018-01-11</span>
            </div>
            <div class="card_intro">
              商品的基础资料，商品编号，品名，店铺编号必填。
            </div>
          </div>
          <div class="card_bottom">
            <div class="pull-left">
              <p class="smFont">数据(MB)</p>
              <p class="colorFont">0.43</p>
            </div>
            <div class="pull-right loadBox">
              <p class="smFont marginB">数据上传</p>
              <p><i class="fa fa-upload"></i></p>
            </div>
            <div class="pull-right loadBox">
              <p class="smFont marginB">模板下载</p>
              <p><i class="fa fa-download"></i></p>
            </div>
          </div>
        </div>
          <div class="data-card">
            <div class="card_top">
              <div class="Ctitle">
                <span class="card_title pull-left">门店信息</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                门店的基础资料，门店编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.28</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
          <div class="data-card">
            <div class="card_top">
              <div class="Ctitle">
                <span class="card_title pull-left">供应商信息</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                供应商的基础资料，供应商编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.12</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
          <div class="data-card">
            <div class="card_top">
              <div class="Ctitle">
                <span class="card_title pull-left">门店补货参数</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                门店的基础资料，门店编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.84</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
          <div class="data-card">
            <div class="card_top">
              <div class="Ctitle">
                <span class="card_title pull-left">促销数据</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                商品的基础资料，商品编号，品名，店铺编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.23</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="业务数据" name="third">
          <div class="data-card blueBorder">
            <div class="card_top" style="background: #83EEFF">
              <div class="Ctitle">
                <span class="card_title pull-left">进销存日结数据</span>
                <span class="data pull-right">2018-01-11</span>
              </div>
              <div class="card_intro">
                商品的基础资料，商品编号，品名，店铺编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.33</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
          <div class="data-card blueBorder">
            <div class="card_top" style="background: #83EEFF">
              <div class="Ctitle">
                <span class="card_title pull-left">历史采购单</span>
                <span class="data pull-right">2018-01-12</span>
              </div>
              <div class="card_intro">
                商品的基础资料，商品编号，品名，店铺编号必填。
              </div>
            </div>
            <div class="card_bottom">
              <div class="pull-left">
                <p class="smFont">数据(MB)</p>
                <p class="colorFont">0.81</p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">数据上传</p>
                <p><i class="fa fa-upload"></i></p>
              </div>
              <div class="pull-right loadBox">
                <p class="smFont marginB">模板下载</p>
                <p><i class="fa fa-download"></i></p>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "overview",
    data() {
      return {
        activeName: 'first'
      };
    },
    created(){
      // this.banWeixin()
    },
    methods: {
      beginpre() {
        $.ajax({
          type:"post",
          url:"http://supply.lovedabai.com/business/api/createTask"+'/'+this.preBenDate,
          data:{},
          dataType:"json"
        }).success(res=>{
          this.taskId = res.result
          if(res.code == 0 ){
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
              },3000)
              console.log(res,"创建任务成功")
              var self1 = this
              setTimeout(function () {
                self1.num1=false
                self1.loading1=false
                self1.isDone1=true
                self1.loading2=true
                self1.showFlag=true
              },8000)
              $.ajax({
                type:"post",
                url:"http://supply.lovedabai.com/business/api/forecast"+'/'+this.taskId,
                contentType : "application/x-www-form-urlencoded; charset=UTF-8",
                data:{},
                dataType:"json"
              }).success(res=>{
                this.loading2=false
                this.isDone2=true
                this.showFlag1=true
                this.loading3=true
                this.num2=false
                console.log(res,"销售预测成功")
                $.ajax({
                  type:"post",
                  url:"http://supply.lovedabai.com/business/api/replenish"+'/'+this.taskId,
                  contentType : "application/x-www-form-urlencoded; charset=UTF-8",
                  data:{},
                  dataType:"json",
                }).success(res=>{
                  console.log(res,"智能补货成功")
                  this.num3=false
                  this.loading3=false
                  this.isDone3=true
                  this.showFlag2=true
                  this.loading4=true

                  $.ajax({
                    type: 'post',
                    url: "http://supply.lovedabai.com/business/api/purchase/"+this.taskId,
                    contentType : "application/x-www-form-urlencoded; charset=UTF-8",
                    data:{},
                    dataType: "json"
                  }).success(res=>{
                    console.log(res,"采购单已生成")
                    this.loading4=false
                    this.showFlag3=true
                    this.isDone4=true
                    this.num4=false
                    this.bShow=true
                    this.bHide=false
                  })
                })
              })

            }else{
              this.$message({
                message: '请选择预测开始时间',
                type: 'warning'
              });
            }
          }else{
            this.$message({
              showClose: true,
              message: res.msg+" ，请重新选择",
              type: 'error'
            });
          }
          console.log()

        })


      },
    }
  }
</script>

<style scoped>
  .overView {
    width: 100%;
    padding-top: 10px;
    padding-left: 5px;
  }

  .top-box {
    display: flex;
    margin-bottom: 10px;
    height: 100px;
  }

  .data-sheet {
    width: 47%;
    height: 80px;
    background: #fff;
    padding: 10px;
    float: left;
    margin: 0 5px;
  }

  .data-sheet:first-child {
    margin-left: 10px;
  }

  .dataTable-box {
    width: 42%;
    float: left;
  }

  .titile-box {
    font-size: 16px;
    text-align: left;
    height: 50px;
  }

  .bar-box {
    height: 40px;
    margin-top: -3px;
  }

  .bar-box ul {
    display: flex;
    align-items: flex-end;
    padding-bottom: 2px;
  }

  .bar-box .bar-list:first-child {
    margin-left: 0px;
  }

  .bar-box .bar-list {
    width: 12%;
    height: 40px;
    margin: 0 3%;
    background: skyblue;
    float: left;
    list-style: none;
    border-radius: 2px 2px 0px 0px;
  }

  .dataNum-box {
    width: 55%;
    padding-left: 2%;
    float: right;
  }

  .dataNum-box > div {
    width: 31%;
    margin: 0 1%;
    float: left;
  }

  .dataNum-box p {
    height: 30px;
    font-size: 14px;
    color: #4A494A;
  }

  .dataNum-box .dataNum {
    margin-top: 15px;
    font-size: 24px;
    color: #F4B400;
  }

  .bar-box .orangeBgColor {
    background-color: #FDDA5D;

  }

  .bottom-box {
    background: #fff;
    width: 98.2%;
    margin-left: 10px;
  }

  .bottom-box>>> .el-tabs__item {
    color: #000;
  }

  .bottom-box>>> .el-tabs__active-bar {
    background: #00CDEC;
  }

  .bottom-box>>> .el-tabs__content {
    padding: 10px 15px;
    height: 380px;
  }

  .data-card {
    float: left;
    width: 23.4%;
    margin: 0.7%;
    height: 160px;
    border: 0.5px solid #FFE1BE;
  }

  .card_top {
    height: 80px;
    padding: 10px;
    background: rgba(255, 165, 0, 0.6);
  }

  .card_top .Ctitle {
    height: 20px;
    margin-bottom: 10px;
    font-size: 14px;
  }

  .card_top .data {
    font-size: 12px;
    color: #666;
    float: right;
  }

  .card_top .card_intro {
    font-size: 14px;
    color: #66665e;
  }

  .card_bottom {
    padding: 10px;
  }

  .loadBox {
    float: right;
    font-size: 18px;
    text-align: center;
    color: #00CDEC;
    cursor: pointer;
    margin-left: 10px;
  }

  .loadBox:first-child {
    margin-right: 10px;
  }

  .card_bottom .smFont {
    font-size: 12px;
  }

  .loadBox p {
    margin: 0;
  }

  .colorFont {
    color: #F4B400;
    font-size: 18px;
  }

  .pull-left {
    float: left;
  }

  .pull-right {
    float: right;
  }

  .blueBorder {
    border: 1px solid #83EEFF;
  }


</style>
