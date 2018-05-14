<template>
  <div class="data-left-tab">
    <el-menu
      style="min-width:170px"
      id="layout"
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      @close="handleClose"
      background-color="  #343E45"
      text-color="#fff"
      active-text-color="#00CDEC"
      :router=true>
      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-map-o "></i>
          <span>算法验证</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/testing/testing-left-tab/dayTest">按天验证</el-menu-item>
          <el-menu-item index="/testing/testing-left-tab/detailedMessage">明细信息</el-menu-item>
          <el-menu-item index="/testing/testing-left-tab/3dDetailed">3D明细</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-database "></i>
          <span>业务验证</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/testing/testing-left-tab/materialVerification">销售验证</el-menu-item>
          <el-menu-item index="/testing/testing-left-tab/salesVerification">标准原料验证</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "left-tab",
    data(){
      return{
        activeIndex : ''
      }
    },
    created(){
      this.navActive()
    },
    watch:{
      "$route": "navActive"
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
  .data-left-tab>>> .el-submenu .el-menu-item{
    min-width: 0;
  }
  .data-left-tab{
    height: 100%;
    display: flex;
  }
  .data-left-tab>>> .el-menu-item i{
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
  .data-left-tab>>> .el-submenu i {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
  .data-left-tab>>> .el-table tr{
    background: #FFFFFF;
  }
  .data-left-tab>>> .bigWords {
    font-size: 18px;
    color: #333;
    margin-right: 20px;
  }
  .data-left-tab>>> .pull-left{
    float: left;
  }
  .data-left-tab>>> .pull-right{
    float: right;
  }
  .data-left-tab>>> .el-input__inner{
    height: 30px;
  }
  .data-left-tab>>> .option-words{
    font-size: 14px;
    color: #373D41;
    margin: 10px;
  }
  .data-left-tab>>> .el-button{
    height: 30px;
    line-height: 7px;
  }
  .data-left-tab>>> .search-box{
    margin-bottom: 10px;
  }
  .data-left-tab>>> .el-table__row>td .cell {
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
  .data-left-tab>>> .el-table thead{
    color: #333333;
    font-weight: normal;
    background: #FAFAFC;
    font-size: 12px;
  }
  .data-left-tab>>> .el-pagination{
    position: absolute;
    right: 100px;
  }
  .data-left-tab>>>#layout{
    min-height: 620px;
  }
</style>
