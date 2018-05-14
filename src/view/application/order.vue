<template>
  <div class="goods_infor">
    <div class="search-box">
      <span class="bigWords">采购单</span>
      <span style="font-size: 14px">任务</span>
      <span class="storeclass-option">
          <el-select v-model="taskId" placeholder="任务">
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
      <div class="pull-right">
        <a id="downlink"></a>
        <el-button v-if="this.tableTitle" type="primary" @click="getExclDate">导出采购单</el-button>
      </div>
    </div>
    <div class="middle-box">
      <div class="supplierList">
        <div class="list-title">供应商列表</div>
        <div class="list-box">
          <li  v-for="item in supplierList"
              :title="item.supplierName"
              class="supplier-item"
              @click="clickSupplierList(item.id,item.supplierName,item.supplierId)"
               :class="{clickActive:item.id===showId}"
          >{{item.supplierName}}</li>
        </div>
      </div>

      <div class="table-box">
        <div v-if="this.tableTitle" class="table-title">
          <div class="title-words" :title="supplierName">{{supplierName}}</div>
          <div class="title-detail">
            <p>门店可下单日期</p>
            <p>{{tableTitle.orderDate}}</p>
          </div>
          <div class="title-detail">
            <p>单品数量</p>
            <p>{{tableTitle.itemQty}}</p>
          </div>
          <div class="title-detail">
            <p>采购金额</p>
            <p>{{tableTitle.amt}}</p>
          </div>
          <div class="title-detail">
            <p>商品到货日期</p>
            <p>{{tableTitle.arriveDate}}</p>

          </div>
        </div>
        <el-table
          id="order-table"
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
            prop="itemId"
            label="商品编码">
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
            label="门店名称"
            prop="shopName"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="建议采购量"
          width="150">
            <template slot-scope="scope">
                <div class="saveBtn">
                  <el-input type="number" v-model="scope.row.realQty"></el-input>
                  <el-button @click.native.prevent="changeRow(scope.$index,goodsInfor)">保存</el-button>
                </div>
            </template>
          </el-table-column>
          <el-table-column
            label="装箱量"
            show-overflow-tooltip>
            <template slot-scope="scope">
             <span>1</span>
            </template>
          </el-table-column>
          <el-table-column
            label="单价"
            width="60"
            prop="price"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="purchaseAmt"
            label="采购金额"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="deleteRow(scope.$index, goodsInfor)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    name: "order",
    data() {
      return {
        titleShow:true,
        shopName:'',
        shopId:'000157',
        shopNameSelect:[],
        taskIdSelect:[],
        goodsName:null,
        goodsInfor: [],
        canvasId: 'myCanvas',
        qty:'',
        type: 'bar',
        width: 180,
        height: 30,
        StatusSelect:'0',
        taskCely:null,
        taskStatus:null,
        showId:null,
        supplierName:"天津源达日化股份有限公司上海分公司",
        supplierId:'000077',
        tableTitle:'',
        removeArr:[],
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
        changeArr:null,
        //分頁
        total: null,
        currentPage: 1,
        pageSize: 10,
        activityDate:'',
        showFlag:false,
        loading:null,
        taskId:'',
        supplierList:[],
        errorDialog: false, // 错误信息弹窗
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
      this.getAllSupplier()
    },
    watch:{
      shopId(){
        this.getGoodsData(this.currentPage)
      },
      taskId(){
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
      },
      supplierName(){
        this.titleShow=false
      }
    },
    methods: {
      clickSupplierList(id,name,supplierId){
        this.showId = id
        this.supplierName = name
        this.supplierId = supplierId
        this.getGoodsData(1,'')
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
          this.tgetGoodsData(this.currentPage)
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
      getAllSupplier(){
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/findAllSupplier",
          data:  {shopId:1},
          dataType: "json"
        }).success(res => {
          console.log(res.result)
          this.supplierList = res.result
          this.showId = res.result[0].id
        })
      },
      getGoodsData(currentPage,id) {
        this.loading= true;
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/pageQueryPurchase",
          contentType : "application/x-www-form-urlencoded; charset=UTF-8",
          data:{pageNo: currentPage,
            pageSize: this.pageSize,
            taskId:this.taskId,
            shopId:this.shopId,
            itemStatus:this.StatusSelect,
            supplierId:this.supplierId
            // supplierName:this.supplierName,
          },
          dataType: "json"
        }).success(res => {
          this.loading= false;
          this.goodsInfor = res.result.data
          this.total = res.result.totalCount;
          this.tableTitle = res.result.obj
          console.log(this.tableTitle)
          console.log(res)
        }).error(()=>{
        })
      },
      getExclDate() {
        window.location.href="http://supply.lovedabai.com/business/api/exportPurchase"+"?taskId="+this.taskId+"&"+"shopId="+this.shopId+"&supplierId="+this.supplierId
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
      changeRow(index,rows){
        this.changeArr =rows.map(v=>{
          return[v.id]
        })
        this.changeArr = this.changeArr.splice(index, 1).toString()
        console.log(this.removeArr)
        this.qty =rows.map(v=>{
          return[v.realQty]
        })
        this.qty = this.qty.splice(index, 1).toString()
        console.log(this.qty)
        this.$confirm('确认修改采购量?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            $.ajax({
              type: 'post',
              url: "http://supply.lovedabai.com/business/api/updateAdviseQty",
              contentType : "application/x-www-form-urlencoded; charset=UTF-8",
              data:{ id:this.changeArr,qty:this.qty}
            }).success(res=>{
              rows.splice(index, 1);
              this.$message({
                type: 'success',
                message: '修改成功!',
              });
              this.getGoodsData(this.currentPage)
            })
          },
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      },
      deleteRow(index, rows) {
        console.log(rows.map(v=>{
          return[v.id]
        }))
        this.removeArr =rows.map(v=>{
          return[v.id]
        })
        this.removeArr = this.removeArr.splice(index, 1).toString()
        console.log(this.removeArr)
        this.$confirm('确认删除当前行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.ajax({
            type: 'post',
            url: "http://supply.lovedabai.com/business/api/deletePurchase ",
            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            data:{
              ids:[this.removeArr]
            }
          }).success(res=>{
            rows.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.getGoodsData(this.currentPage)
          })
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
    width: 220px;
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
  .middle-box{
    display: flex;
    position: relative;
  }
  .supplierList{
    float: left;
    width: 20%;
    height: 100%;
    background: #fff;
  }
  .table-box{
    width: 80%;
  }
  .supplierList{
    overflow-y: scroll;
    max-height: 600px;
    overflow-x: hidden;
  }
  .list-title{
    float: left;
    width: 100%;
    padding: 5px 10px;
    background: #c0c0c0;
    max-height: 540px;
  }
  .supplier-item{
    font-size: 12px;
    background: #fff;
    padding: 10px 10px;
    border-bottom: 1px solid #f4f4f4;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .supplier-item:hover{
    background-color: #C1F3FB;
  }
  .list-box{
    margin-top: 30px;
  }
  .list-box li{
    list-style: none;
  }
  .clickActive{
    background-color:#C1F3FB ;
  }
  .table-box >>> .el-input__inner{
    padding: 0;
    height: 18px;
    font-size: 12px;
    line-height: 18px;
    border-radius: 0;
    width: 80px;
    text-indent:5px;
  }

  .table-box>>>.el-table__row>td .cell{
    height: 48px;
    line-height: 48px;
  }
  .table-title{
    width: 100%;
    height: 50px;
    background:rgba(193, 243, 251, 0.3);
    padding: 10px 10px;
  }
  .table-title .title-words{
    width:20%;
    height: 50px;
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    line-height: 50px;
  }
  .title-detail{
    width: 15%;
    height: 50px;
  }
  .table-title>div{
    float: left;
  }
  .title-detail p:first-child{
    color: #666;
    font-size: 12px;
    height: 20px;
    margin-bottom: 10px;
  }
  .saveBtn>>>.el-button{
    padding: 10px 3px;
  }
  .saveBtn{
    display: flex;
  }
  .saveBtn>>> .cell{

  }
  .saveBtn>>> .el-button{
    margin-left: 5px;
    margin-top: 10px;
    font-size: 12px;
    padding: 4px;
  }
  .saveBtn>>> .el-table td, .el-table th.is-leaf{
    padding: 0;
  }
  #order-table>>> td{
    padding: 0;
  }
</style>
