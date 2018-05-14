<template>
  <div class="goods_infor">
    <div class="search-box">
      <span class="bigWords">智能补货</span>
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
      <span class="storeclass-option">
        <el-select v-model="shopId"  placeholder="所有门店">
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
      <span  class="storeclass-option">
        <el-select v-model="StatusSelect" placeholder="是否缺货">
    <el-option
      v-for="item in itemStatusSelect"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      </span>
      <span class="input-search-box">
           <el-input
             placeholder="搜索商品"
             v-model="goodsName">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
         <el-button v-if='this.goodsName' type="primary" style="height: 26px" @click="getGoodsData(currentPage)" size="mini"><span class="el-icon-search"></span></el-button>
        </span>
      <div class="pull-right">
        <a id="downlink"></a>
        <el-button v-if="this.total" type="primary" @click="getExclDate">导出Excel</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        :data="goodsInfor"
        @select="toggleSelection"
        @select-all="toggleSelection"
        style="width: 100%"
        height="540">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="30">-->
        <!--</el-table-column>-->
        <el-table-column
          label="门店名称"
          prop="shopName">
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="商品名称"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="class5"
          label="商品分类"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fsQty"
          label="预测销量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="regionFsQty"
          label="补货期预测销量"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="adviseQty"
          label="建议补货量">
        </el-table-column>
        <el-table-column
          label="可用库存"
          prop="stock"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="在途库存"
          prop="roadStock"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="safeStock"
          label="安全库存"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="orderDate"
          label="门店可下单日期"
          width="110"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sendDate"
          label="供应商发货日期"
          width="110"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="arriveDate"
          label="门店到货日期"
          width="110"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="nextArriveDate"
          label="门店下次到货日期"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="供应商名称"
          width="100"
          show-overflow-tooltip>
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
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "store-infor",
    data() {
      return {
        shopName:'',
        shopId:'000157',
        shopNameSelect:[],
        taskIdSelect:[],
        goodsName:"",
        goodsInfor: [],
        canvasId: 'myCanvas',
        type: 'bar',
        width: 180,
        height: 30,
        StatusSelect:"0",
        taskCely:null,
        taskStatus:null,
        parentId:null,
        class1:[],
        class2:[],
        class3:[],
        class4:[],
        class5:[],
        classId1:"",
        classId2:"",
        classId3:"",
        classId4:"",
        classId5:"",
        parentId:"",
        classShow1:null,
        classShow2: null,
        classShow3:null,
        classShow4:null,
        classShow5:null,
        classValue:'',
        classFlag:false,
        itemStatusSelect:[{
          value: '2',
          label: '所有'
        },{
          value: '0',
          label: '缺货'
        }, {
          value: '1',
          label: '不缺货'
        }],
        selectionArr:[],
        multipleSelection: [],
        //分頁
        total: null,
        currentPage: 1,
        pageSize: 10,
        activityDate:'',
        showFlag:false,
        loading:null,
        taskId:'',
        loading1:false,
        errorMsg: '', // 错误信息内容
        exclDate:[],// 导出的exsl数据
        imFile: '', // 导入文件el
        outFile: '',  // 导出文件el
      }
    },
    components:{
      // Schart
    },
    mounted (){
      this.outFile = document.getElementById('downlink')
    },
    created() {
      this.getGoodsData(this.currentPage)
      this.getAllShop1()
      this.getAllShop()
      // this.getGoodsData(this.currentPage)
    },
    watch:{
      classValue(){
        if(this.classValue.length === 0){
          console.log("00000")
          this.classId1=""
          this.classId2=""
          this.classId3=""
          this.classId4=""
          this.classId5=""
          this.getGoodsData(this.currentPage)
        }
        this.getGoodsData(this.currentPage)
        console.log(this.class1)
      },
      shopId(){
        this.getGoodsData(this.currentPage)
      },
      taskId(){
        this.goodsName=""
        this.classValue=''
        this.classId1=""
        this.classId2=""
        this.classId3=""
        this.classId4=""
        this.classId5=""
        this.getGoodsData(this.currentPage)
      },
      activityDate(){
        this.getGoodsData(this.currentPage)
      },
      goodsName(){
        if(!this.goodsName){
          this.getGoodsData(this.currentPage)
        }
      },
      StatusSelect(){
        this.getGoodsData(this.currentPage)
      }
    },
    methods: {
      getExclDate() {
        window.location.href="http://supply.lovedabai.com/business/api/exportOrderBill"+"?taskId="+this.taskId+"&"+"class1Id="+this.classId1+"&"+"class2Id="+this.classId2+"&"+"class3Id="+this.classId3+"&"+"class4Id="+this.classId4+"&"+"class5Id="+this.classId5+"&"+"shopId="+this.shopId+"&itemStatus="+this.StatusSelect+"&"+"itemName="+this.goodsName
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
          // this.goForecast()
          this.getGoodsData(this.currentPage)
        })
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
          console.log(this.shopNameSelect.shopName)

        })
      },
      createdOrder(){
        this.loading1= true;
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/purchase",
          contentType : "application/x-www-form-urlencoded; charset=UTF-8",
          data:{
            taskId:this.taskId,
            shopId:this.shopId,
            itemStatus:this.StatusSelect,
            itemName:this.goodsName
          },
          dataType: "json"
        }).success(res => {
          this.loading1= false;
          console.log(this.taskId)
          this.$router.push({path:'/app/app-left-tab/order',query:{taskId:this.taskId}})
        }).error(()=>{
          this.loading1=false;
        })
      },
      // goForecast(){
      //   this.loading= true;
      //   $.ajax({
      //     type: 'post',
      //     url: "http://supply.lovedabai.com/business/api/replenish" + '/'+ this.taskId,
      //     contentType : "application/x-www-form-urlencoded; charset=UTF-8",
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
      getGoodsData(currentPage) {
        this.loading= true;
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/pageQueryOrderBill",
          contentType : "application/x-www-form-urlencoded; charset=UTF-8",
          data:{pageNo: currentPage,
            pageSize: this.pageSize,
            taskId:this.taskId,
            shopId:this.shopId,
            itemStatus:this.StatusSelect,
            itemName:this.goodsName,
            class1Id:this.classId1,
            class2Id:this.classId2,
            class3Id:this.classId3,
            class4Id:this.classId4,
            class5Id:this.classId5,
          },
          dataType: "json"
        }).success(res => {
          this.loading= false;
          this.goodsInfor = res.result.data
          this.total = res.result.totalCount;
        }).error(()=>{
          this.loading= false;
        })
      },
      pagingSearch(currentPage) {
        this.getGoodsData(currentPage)
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
        this.class1=""
        this.class2=""
        this.class3=""
        this.class4=""
        this.class5=""
        console.log(this.calssValue)
        console.log(v.classId.length)
        if (v.classId.length == 1){
          this.classId1 = v.classId
          this.classId2 = ""
          this.classId3 = ""
          this.classId4 = ""
          this.classId5 = ""

        }
        if (v.classId.length == 3){
          this.classId2 = v.classId
          this.classId1 = ""
          this.classId3 = ""
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
  .goods_infor {
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
    z-index: 100000000000000;
    background: #fff;
    border-radius:5px;
    border: 1px solid  #e4e7ed;
    height: 250px;
    overflow: scroll;
    overflow-x: hidden;
  }
  .shopClass>.class1{
    left: -80px;
  }
  .shopClass>.class2{
    left: 60px;
  }
  .shopClass>.class3{
    left: 200px;
  }
  .shopClass>.class4{
    left: 340px;
  }
  .shopClass>.class5{
    left: 480px;
  }
  .class-box .class-list{
    width: 100px;
    list-style: none;
    padding: 0px 10px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }
  .class-list:hover{
    background: #f5f7fa;;
  }
  .class-list i{
    margin-top: 10px;
  }
</style>
