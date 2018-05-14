<template>
    <div  class="app-left-tab">
      <el-menu
        id="layout"
        style="min-width:170px"
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        background-color="  #343E45"
        text-color="#fff"
        active-text-color="#00CDEC"
        :router="true">

        <el-menu-item index="/app/app-left-tab/task_list">
          <i class="el-icon-menu"></i>
          <span slot="title">任务列表</span>
        </el-menu-item>
        <el-menu-item index="/app/app-left-tab/fore_cast">
          <i class="fa fa-line-chart"></i>
          <span slot="title"> 销售预测</span>
        </el-menu-item>
        <el-menu-item index="/app/app-left-tab/intelligent_supply">
          <i class="fa fa-cube"></i>
          <span slot="title">智能补货</span>
        </el-menu-item>
        <el-menu-item  index="/app/app-left-tab/order">
          <i class="el-icon-tickets"></i>
          <span slot="title">采购单</span>
        </el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
</template>

<script>
  import taskList from './task_list';
  import foreCast from './fore_cast'
    export default {
        name: "forecast",
      components:{
          'task_list':taskList,
        'fore_cast':foreCast
      },
      data(){
        return{
          tabPosition: 'left',
          activeName:'0',
          activeIndex:'',
          // screenHeight: document.body.clientHeight,//减去header的60px
        }
      },

      created(){
        this.navActive()
      },
      watch:{
        "$route": "navActive",
        // screenHeight (val) {
        //
        //   this.screenHeight = val
        //   document.getElementById('layout').style.height=this.screenHeight+"px";//检测窗口的大小，并赋值
        // }
      },
      methods: {
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        navActive(){
          var a = (this.$route.path);
          var b = a.split("").reverse().join("");
          var c = b.substring(b.indexOf('/') + 1, b.length);
          var d = c.split("").reverse().join("");
          this.activeIndex = a;
          console.log(this.activeIndex)
        }
      }
    }
</script>

<style scoped>

  .app-left-tab>>> .el-submenu .el-menu-item{
    min-width: 0;
  }
  .app-left-tab{
    height: 100%;
    display: flex;
  }
  .app-left-tab>>> .el-menu-item i{
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
  .app-left-tab>>> .el-submenu i {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
  .app-left-tab>>> .el-table tr{
    background: #FFFFFF;
  }
  .app-left-tab>>> .bigWords {
    font-size: 18px;
    color: #333;
    margin-right: 20px;
  }
  .app-left-tab>>> .pull-left{
    float: left;
  }
  .app-left-tab>>> .pull-right{
    float: right;
  }
  .app-left-tab>>> .el-input__inner{
    height: 30px;
  }
  .app-left-tab>>> .option-words{
    font-size: 14px;
    color: #373D41;
    margin: 10px;
  }
  .app-left-tab>>> .el-button{
    height: 30px;
    line-height: 7px;
  }
  .app-left-tab>>> .search-box{
    margin-bottom: 10px;
  }
  .app-left-tab>>> .el-table__row>td .cell {
    /* text-align: center; */
    height: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    /*word-break: break-all;*/
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }
  .app-left-tab>>> .el-table thead{
    color: #333333;
    font-weight: normal;
    background: #FAFAFC;
    font-size: 12px;
  }
  .app-left-tab>>> .el-pagination{
    position: absolute;
    right: 100px;
  }

</style>
