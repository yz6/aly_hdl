<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import 'babel-polyfill'
export default {
  name: 'App'
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
body{
  background: #EEF0F3;
  font-family: Microsoft YaHei;
}
  #app>>> .el-table--enable-row-transition .el-table__body td{
    padding: 3px 0;
  }
  #app>div{
    height: 100%;
  }
</style>
