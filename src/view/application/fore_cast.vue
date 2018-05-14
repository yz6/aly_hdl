<template>
  <div class="fore_cast">
    <div class="search-box">
      <span class="bigWords">销售预测</span>
      <span style="font-size: 14px">任务</span>
      <span class="storeclass-option longClass">
          <el-select v-model="taskId" placeholder="任务ID">
    <el-option
      v-for="item in taskIdSelect"
      :key="item.id"
      :label="item.fcsDate + '/' + '两周' + '/' +item.id "
      :value="item.id">
    </el-option>
  </el-select>
        </span>
      <span style="font-size: 14px">选择门店</span>
      <span class="storeclass-option">
        <el-select v-model="shopId" placeholder="所有门店">
     <el-option
       v-for="item in shopNameSelect"
       :key="item.shopId"
       :label="item.shopName"
       :value="item.shopId">
    </el-option>
          </el-select>
        </span>
      <span style="font-size: 14px">商品分类</span>
      <span  class="storeclass-option shopClass">
         <div v-show="classShow1" class="class-box class1">
          <ul>
            <li  class="class-list class1-list" @click="getClassValue(v)"  v-on:mouseover='getClassId(v);getClass2();'  v-for="(v,i) in class1">{{v.className}} <i style="float: right" class="el-icon-arrow-right"></i></li>
            </ul>
       </div>
        <div v-show="classShow2" class="class-box  class2">
          <ul>
            <li class="class-list class2-list" @click="getClassValue(v)" v-on:mouseover='getClassId(v);getClass3();' v-for="(v,i) in class2">{{v.className}}<i  style="float: right" class="el-icon-arrow-right"></i></li>
            </ul>
       </div>
         <div v-show="classShow3" class="class-box class3">
          <ul>
            <li class="class-list class2-list" @click="getClassValue(v)"   v-on:mouseover='getClassId(v);getClass4();'v-for="(v,i) in class3">{{v.className}}<i  style="float: right" class="el-icon-arrow-right"></i></li>
            </ul>
       </div>

         <div v-show="classShow4" class="class-box class4">
          <ul>
            <li class="class-list class2-list" @click="getClassValue(v)"  v-on:mouseover='getClassId(v);getClass5();' v-for="(v,i) in class4">{{v.className}}<i  style="float: right" class="el-icon-arrow-right"></i></li>
            </ul>
       </div>
        <div v-show="classShow5" class="class-box class5">
          <ul>
            <li class="class-list class2-list" @click="getClassValue(v)"  v-for="(v,i) in class5">{{v.className}}</li>
            </ul>
       </div>
        <div  style="display: inline-block"  @click="getClass1">
          <el-input
            placeholder="全部分类"
            v-model="classValue"
            @blur="removeClass()"

            :readonly="true"
            clearable>
</el-input>
          <span v-show="!classValue" style="position: absolute;right: 10px;top: 0px; color: #ccc;" class="fa fa-angle-down"></span>
        </div>

      </span>

      <span class="input-search-box">
           <el-input
             placeholder="搜索商品"
             v-model="goodsName">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
         <el-button v-if='this.goodsName' type="primary" style="height: 26px" @click="getGoodsData()" size="mini"><span class="el-icon-search"></span></el-button>
        </span>
      <div class="pull-right">
        <a id="downlink"></a>
        <el-button v-if="this.total" type="primary" @click="getExclDate()">导出Excel</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table
        id="foreCast"
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="goodsInfor"
        @select="toggleSelection"
        @select-all="toggleSelection"
        style="width: 100%"
        height="570">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="30">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="shopName"
          label="门店名称"
        width="100">
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="商品名称"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fsQty"
          label="预测销量"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="供应商"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="商品类别"
          prop="class5"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="预测开始时间"
          prop="startDate"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="cycle"
          width="90"
          label="预测周期"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="qtyDirection"
          label="销量趋势"
          width="265">
        <template slot-scope="scope">
          <div style="width: 350px;position: relative;left: -60px">
            <!--<g2-line id="22"  :chartData="serverData"></g2-line>-->
            <g2-line :id="scope.row.id"  :chartData="scope.row.direction"></g2-line>
            <!--<schart :canvasId="scope.row.itemName"-->
                    <!--:type="type"-->
                    <!--:width="width"-->
                    <!--:height="height"-->
                    <!--:data="scope.row.direction"-->
            <!--&gt;</schart>-->
          </div>
          <!--<div style="margin-bottom: 10px; height: 40px;display: flex;align-items: flex-end;">-->
            <!--<div :title="val.qty"  v-for="val in scope.row.direction" style="height: 40px;display: flex;align-items: flex-end">-->
              <!--<div-->
                   <!--style="  position:relative; height:40px;display: inline-block; width:4.5px; border-radius: 5px 5px 0 0 ; background: #FF7101;margin: 0 4px"-->
                   <!--v-bind:style="{height:val.qty*5+3 + 'px'}"-->
                  <!--&gt;-->
                <!--<span style="position: absolute; bottom: 20px; ">{{noneNum}}</span>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--fixed="right"-->
          <!--label="操作"-->
          <!--width="100">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button-->
              <!--type="text"-->
              <!--size="small"-->
              <!--@click.native.prevent="deleteRow(scope.$index, goodsInfor)">-->
              <!--删除-->
            <!--</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </div>
    <div class="bottom-box">
      <div  class="removeBtn">
        <!--<el-button @click="batchRemove" type="primary">批量删除</el-button>-->
      </div>
      <div class="pagination-box">
      </div>
      <el-pagination
        @current-change="pagingSearch"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
        :current-page="page"
      >
      </el-pagination>
    </div>
    <!--<g2-histogram :id="c1"  :chartData="goodsInfor.data[0].direction"></g2-histogram>-->
  </div>
</template>

<script>
  // import Schart from 'vue-schart';
  import G2Line from '@/components/G2Line'
  import G2Histogram from "@/components/G2Histogram"
  export default {
    components: {
      G2Line,
      G2Histogram,

    },
    name: "store-infor",
    data() {
      return {
        c1: 'c1',
        shopName:'',
        shopId:'000157',
        shopNameSelect:[],
        taskIdSelect:[],
        goodsName:"",
        goodsInfor: [],
        canvasId: 'myCanvas',
        type: 'line',
        legendColor:"#fff",
        fillColor:"#72f6ff",
        width: 300,
        height: 150,
        taskCely:null,
        taskStatus:null,
        parentId:null,
        class1:[],
        class2:[],
        class3:[],
        class4:[],
        class5:[],
        classId1:" ",
        classId2:" ",
        classId3:" ",
        classId4:" ",
        classId5:" ",
        classShow1:null,
        classShow2: null,
        classShow3:null,
        classShow4:null,
        classShow5:null,
        classValue:null,
        classFlag:false,
        goodsClassOption:[],
        selectionArr:[],
        multipleSelection: [],
        //分頁
        total: null,
        currentPage:1,
        pageSize: 10,
        activityDate:'',
        showFlag:false,
        loading:null,
        taskId:'',
        errorMsg: '', // 错误信息内容
        exclDate:[],// 导出的exsl数据
        imFile: '', // 导入文件el
        outFile: '',  // 导出文件el
        canvasData:[],
        noneNum:'',
        page:1,
       serverData : [
        { 'name': '2016-06-06', 'value': 1},
        { 'name': '2016-06-07', 'value': 0},
        { 'name': '2016-06-08', 'value': 0},
        {  'name': '2016-06-09', 'value': 3},
        { 'name': '2016-06-10', 'value': 2},
        {  'name': '2016-06-11', 'value': 4},
        {  'name': '2016-06-12', 'value': 1},
        {  'name': '2016-06-13', 'value': 2},
        {  'name': '2016-06-14', 'value': 3},
        {  'name': '2016-06-15', 'value': 4},
        {  'name': '2016-06-16', 'value': 5},
        {  'name': '2016-06-17', 'value': 1},
        {  'name': '2016-06-18', 'value': 0},
        {'name': '2016-06-19', 'value': 3}
      ]
      }
    },

    mounted (){
      this.outFile = document.getElementById('downlink')
    },
    created() {
      // this.getGoodsData()
      // this.getExclDate()
      this.getAllShop1()
      this.getAllShop()
      this.getNowPage()
      // this.getGoodsData(this.currentPage)
    },
    watch:{
      classValue(){
        if(this.classValue.length==0){
          this.classId1=" "
          this.classId2=" "
          this.classId3=" "
          this.classId4=" "
          this.classId5=" "
          this.getGoodsData(this.page)
          // this.getExclDate(this.page)
        }
        this.getGoodsData(this.page)
        // this.getExclDate(this.page)
        console.log(this.class1)
      },
      shopId(){
        console.log("shopId")
        this.getGoodsData(this.page)
        // this.getExclDate(this.page)
      },
      taskId(){
        this.goodsName=""
        this.classValue=''
        this.classId1=" "
        this.classId2=" "
        this.classId3= " "
        this.classId4=" "
        this.classId5=""
        this.getGoodsData(this.page)
        // this.getExclDate(this.page)

        console.log(this.class1,this.class2,this.class3,this.class4,this.class5)
      },
      activityDate(){
        this.getGoodsData(this.page)
        // this.getExclDate(this.page)
      },
      goodsName(){
        if(!this.goodsName){
          this.getGoodsData(this.page)
          // this.getExclDate(this.page)
        }
      },
    },
    methods: {
      getNowPage(){
        if(this.page)
        this.$router.push({
          path: '',
          query: {
            page:1
          }
        })
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      getAllShop(){
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/findAllTask",
          data:  {},
          dataType: "json"
        }).success(res => {
          console.log(res)
          this.taskIdSelect = res.result
          if(this.$route.query.taskId){
            this.taskId= this.$route.query.taskId
          }else{
            this.taskId = res.result[0].id
          }
          this.getGoodsData()
        })
      },
      getExclDate() {
        window.location.href="http://supply.lovedabai.com/business/api/exportForecast"+"?taskId="+this.taskId+"&"+"class1Id="+this.classId1+"&"+"class2Id="+this.classId2+"&"+"class3Id="+this.classId3+"&"+"class4Id="+this.classId4+"&"+"class5Id="+this.classId5+"&"+"shopId="+this.shopId+"&"+"itemName="+this.goodsName
      },
      getAllShop1(){
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/findAllShop",
          data:  {},
          dataType: "json"
        }).success(res => {
          console.log(res.result)
          this.shopNameSelect = res.result
        })
      },
      // goForecast(){
      //   this.loading= true;
      //   $.ajax({
      //     type: 'post',
      //     url: "http://supply.lovedabai.com/business/api/forecast" + '/' + this.taskId,
      //     data:{},
      //     dataType: "json"
      //   }).success(res => {
      //     this.loading= false;
      //     console.log(res)
      //     this.getGoodsData(this.currentPage)
      //   }).error(()=>{
      //     this.loading=false;
      //   })
      // },
      getGoodsData() {
        this.loading= true;
        var str=location.href; //取得整个地址栏
        var i = str.lastIndexOf('=')
        var strr = str.substr(i+1)
        this.page = strr
        console.log(strr,"结果")
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/pageQueryForecast",
          contentType : "application/x-www-form-urlencoded; charset=UTF-8",
          data:{pageNo:this.page,
            pageSize: this.pageSize,
            taskId:this.taskId,
            shopId:this.shopId,
            itemName:this.goodsName,
            class1Id:this.classId1,
            class2Id:this.classId2,
            class3Id:this.classId3,
            class4Id:this.classId4,
            class5Id:this.classId5,
          },
          dataType: "json"
        }).success(res => {
          console.log(res,"数据")
          this.loading= false;
          this.goodsInfor = []
          var self = this
          setTimeout(function () {
            self.goodsInfor = res.result.data
          },100)

          console.log(this.goodsInfor)
          this.total = res.result.totalCount;
          console.log(res.result.data,"改变前")
          console.log(this.goodsInfor)
        }).error(()=>{
          this.loading= false;
        })
      },
      pagingSearch(currentPage) {
        this.$router.push({
          path: '',
          query: {
              page:currentPage
          }
        })
        this.getGoodsData(this.page)
      },
      toggleSelection(selection,row) {
        this.selectionArr = selection;
      },
      batchRemove(){
        this.$confirm('是否进行批量删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(var i=this.goodsInfor.length-1;i>=0;i--){
            for(let j = 0,len = this.selectionArr.length;j<len;j++){
              console.log(i)
              if(this.goodsInfor[i].id === this.selectionArr[j].id){
                this.goodsInfor.splice(i,1);
                break
              }
            }
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteRow(index, rows) {
        this.$confirm('确认删除当前行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            rows.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          },
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      goCreateTask(){
        this.$router.push({path: '/data/data-left-tab/prediction-task'});
      },
      getClassId(v){
        this.parentId=v.classId
      },
      getClass1(){
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/findCategoryByPartent ",
          data:  {},
          dataType: "json"
        }).success(res => {
          console.log(res.result)
          this.classShow1=true
          this.classShow2=false
          this.classShow3=false
          this.classShow4=false
          this.classShow5=false
          this.class1=res.result
          this.class2=null
          this.class3=null
          this.class4=null
          this.class5=null
        })
      },
      getClass2(){
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/findCategoryByPartent ",
          data:  {parentId: this.parentId},
          dataType: "json"
        }).success(res => {
          this.classShow2=true
          this.classShow3=false
          this.classShow4=false
          this.classShow5=false
          console.log(res.result)
          this.class2=res.result
          this.class3=null
          this.class4=null
          this.class5=null
        })
      },
      getClass3(){
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/findCategoryByPartent ",
          data:  {parentId: this.parentId},
          dataType: "json"
        }).success(res => {
          this.classShow3=true
          this.classShow4=false
          this.classShow5=false
          console.log(res.result)
          this.class3=res.result
          this.class4=null
          this.class5=null
        })
      },
      getClass4(){
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/findCategoryByPartent ",
          data:  {parentId: this.parentId},
          dataType: "json"
        }).success(res => {
          this.classShow4=true
          this.classShow5=false
          console.log(res.result)
          this.class4=res.result
          this.class5=null
        })
      },
      getClass5(){
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/findCategoryByPartent ",
          data:  {parentId: this.parentId},
          dataType: "json"
        }).success(res => {
          this.classShow5=true
          console.log(res.result)
          this.class5=res.result
        })
      },
      getClassValue(v){
        this.classId = v.classId
        this.classValue = v.className
        this.class1=null
        this.class2=null
        this.class3=null
        this.class4=null
        this.class5=null
        console.log(this.calssValue)
        console.log(v.classId.length)
        if (v.classId.length == 1){
          this.classId1 = v.classId
          this.classId2 = ""
          this.classId3 = ""
          this.classId4 = ''
          this.classId5 = ''

        }
        if (v.classId.length == 3){
          this.classId2 = v.classId
          this.classId1 = ''
          this.classId3 = ''
          this.classId4 = ""
          this.classId5 = ""
        }
        if (v.classId.length == 4){
          this.classId3 = v.classId
          this.classId2 = ""
          this.classId1 = ""
          this.classId4 = ""
          this.classId5 = ""
        }
        if (v.classId.length == 5){
          this.classId4 = v.classId
          this.classId2 = ""
          this.classId3 = ""
          this.classId1 = ""
          this.classId5 = ""
        }
        if (v.classId.length == 6){
          this.classId5 = v.classId
          this.classId2 = ""
          this.classId3 = ""
          this.classId4 = ""
          this.classId1 = ""
          console.log(this.classId5)
        }
      },
      removeClass(){
        var self = this
          setTimeout(function () {
            self.classShow1=false
            self.classShow2=false
            self.classShow3=false
            self.classShow4=false
            self.classShow5=false
          },100)
      }
    }
  }
</script>

<style scoped>
  .fore_cast {
    overflow-x: hidden;
    width: 100%;
    padding: 20px 15px;
  }
  .storeclass-option>>> .el-select>.el-input>.el-input__inner{
    width: 120px;
  }

  .input-search-box>>> .el-input__prefix {
    top: -5px;
  }

  .input-search-box>>> .el-input__inner {
    width: 150px;
  }

  .input-search-box>>> .el-input {
    width: 150px;
  }
  .removeBtn{
    width: 100px;
    margin-left: 20px;
  }
  .bottom-box{
    height: 30px;
    width: 100%;
    display: flex;
    background: #fff;
    padding: 5px 0;
  }
  .pagination-box {
    margin-left: 20px;
  }
  .activityDate >>>.el-input__icon{
    margin-top: -5px;
  }
  .activityDate >>>.el-date-editor{
    width: 150px;
  }
  .fore_cast>>> .el-table td, .el-table th{
    height: 80px;
  }
  .fore_cast>>> .el-table td{
    padding: 0;
  }
  .fore_cast>>> .el-table__row>td .cell{
    height: 70px;
    line-height: 60px;
  }
  .longClass>>>.el-select>.el-input>.el-input__inner{
    width: 180px;
  }
  .shopClass{
    line-height: 20px;
    position: relative;
  }
  .shopClass>>> .el-input{
    width: 120px;
    position: relative;
  }
  .shopClass>.class-box{
    position: absolute;
    z-index: 10;
    background: #fff;
    border-radius:5px;
    border: 1px solid  #e4e7ed;
    height: 250px;
    overflow: scroll;
    overflow-x: hidden;
  }
  .shopClass>.class1{
    left: -100px;
  }
  .shopClass>.class2{
    left: 39px;
  }
  .shopClass>.class3{
    left: 178px;
  }
  .shopClass>.class4{
    left: 318px;
  }
  .shopClass>.class5{
    left: 458px;
  }
  .class-box .class-list{
    width: 100px;
    list-style: none;
    padding: 0px 10px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
  .class-list:hover{
    background: #f5f7fa;;
  }
  .class-list i{
    margin-top: 10px;
  }
  .fore_cast>>> .el-table--enable-row-hover .el-table__body tr:hover>td{
      background: #fff;
  }
</style>
