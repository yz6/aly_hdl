<template>
  <div class="top-nav">
    <div class="top-left">
      <div id="logo-group">
        <span id="logo"><a> <img style="width: 50px;margin-right: 20px" src='../assets/al-logo.png' alt="阿里云·海底捞智能要货系统"></a></span>
        <span class="logoWords">阿里云·海底捞智能要货系统</span>
      </div>
    </div>
    <div class="top-right" >
      <div>
        <el-input
        placeholder="全局搜索"
        prefix-icon="el-icon-search"
        v-model="inputAll">
      </el-input>
        <span class="el-icon-circle-plus top-icon"></span>
        <span class="el-icon-tickets top-icon"></span>
        <span class="top-userHead">
          <img src="../assets/user-head.jpg" alt="">
        </span>
      </div>
    </div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#1B2125"
      text-color="#fff"
      active-text-color="#00CDEC"
      :router="true">
      <!--<el-menu-item index="/command">指挥舱</el-menu-item>-->
      <!--<el-menu-item index="/data/data-left-tab">数据舱</el-menu-item>-->
      <!--<el-menu-item index="/app/app-left-tab">应用舱</el-menu-item>-->
      <el-menu-item>指挥舱</el-menu-item>
      <el-menu-item >数据舱</el-menu-item>
      <el-menu-item >应用舱</el-menu-item>
      <el-menu-item index="/testing/testing-left-tab">检测舱</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>

</template>

<script>
  // import dataTab from './data/data-left-tab'
  import appTab from './application/app-left-tab'
  import command from './command/command'
    export default {
        name: "tabbar",
      components:{
          'appTab':appTab,
          // 'dataTab':dataTab,
          'command':command
  },
      data() {
        return {
          activeName: 'first',
          inputAll: '',
          activeIndex2: '/app/app-left-tab',
          routerPath:''
        };
      },
      created(){
          this.navActive()
      },
      watch:{
        "$route": "navActive"
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        navActive(){
          var a = (this.$route.path);
          console.log(a)
          var b = a.split("").reverse().join("");
         if( b.split('/').length-1>1){
           var c = b.substring(b.indexOf('/') + 1, b.length);
         }else{
           var c = b
         }
          var d = c.split("").reverse().join("");
          console.log(d)
          this.activeIndex2 = d;
          this.routerPath=this.$route.path;
          console.log(this.activeIndex2)
        }
      },
    }
</script>

<style scoped >
  .top-nav{
    position: relative;
    height: 100%;
  }
  .top-left{
    position: absolute;
    left: 0;
    margin-left: 20px;
    margin-right: 150px;
    line-height: 60px;
    height: 60px;
    z-index: 1;
  }
  .top-left img{
   vertical-align: middle;
  }
  .top-right{
    position: absolute;
    right: 0;
    z-index: 1;
    height: 60px;
    margin-right: 50px;
    line-height: 60px;
  }
  .top-right>>> .el-input__icon{
    line-height: 30px;
  }
  .top-right>>> .el-input--prefix .el-input__inner{
    height: 30px;

  }
  .top-right>>> .el-input{
    width: 40%;
  }
  .top-icon{
    font-size: 20px;
    margin: 0 20px;
    color: #fff;

  }

  .top-userHead img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-top: 15px;
  }
  .top-nav>>> .el-tabs__item {
    height: 50px;
  }
  .top-userHead{
    display: block;
    float: right;
  }
  .top-nav>>> .el-tabs__nav-wrap::after{
    background: #fff;
  }
  .top-nav>>> .el-tabs__nav-wrap.is-scrollable{
  }
  .top-nav>>> .el-tabs__item{
    color: #fff;
    font-size: 14px;
    line-height: 50px;
    padding: 0 35px;
  }

  .logoWords{
    display: inline-block;
    color: #fff;
    font-size: 16px;
    vertical-align: middle;
  }
  .top-nav>>> .el-tabs--top .el-tabs__item.is-top:nth-child(2){
    padding-left:12px;
  }
  .top-nav>>> .el-tabs--top .el-tabs__item.is-top:last-child{
    padding-right: 18px;
  }
  .top-nav>>> .el-tabs__header{
    margin:0;
    background: #FAFAFC;
  }
  .top-nav>>> .el-menu--horizontal{
    padding-left: 25%;
  }
  .top-nav>>> .el-menu--horizontal{
    border-bottom: none;
  }
  .top-right>>> .el-input__prefix{
    top: 0;
  }

</style>
