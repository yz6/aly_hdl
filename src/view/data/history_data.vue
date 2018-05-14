<template>
  <div class="goods_infor">
    <div class="search-box">
      <span class="bigWords">历史采购单</span>
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
      <span class="settlementDate">
        <span>采购日期</span>
    <el-date-picker
      v-model="settlementDate"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
      </span>
      <span class="input-search-box">
           <el-input
             placeholder="搜索商品"
             v-model="goodsName">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
         <el-button v-if="goodsName" type="primary" style="height: 26px" @click="getGoodsData(currentPage)" size="mini"><span class="el-icon-search"></span></el-button>
        </span>
      <div class="pull-right">
        <el-button>上传数据</el-button>
        <el-button type="primary">下载模板</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table
        :data="goodsInfor"
        @select="toggleSelection"
        @select-all="toggleSelection"
        style="width: 100%"
        height="520">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="30">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="shopId"
          label="门店编码">
        </el-table-column>
        <el-table-column
          prop="shopName"
          label="门店名称">
        </el-table-column>
        <el-table-column
          prop="itemId"
          label="商品编码"
          width="90">
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="商品名称"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="supplierId"
          label="主供应商编码"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="供应商名称"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="buyerCode"
          label="采购组"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="purchaseDate"
          label="采购日期"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="purchaseAmt"
          label="采购量"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="arriveDate"
          label="到货日期"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="price"
          label="到货数量"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop=""
          label="供货表现"
          width="80"
          show-overflow-tooltip>

          <template slot-scope="scope">
            <span style="margin-left: 10px">已完成</span>
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
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "history_data",
    data() {
      return {
        shopName:'',
        shopNameSelect:[],
        goodsName:null,
        shopId:'',
        goodsInfor: [],
        selectionArr:[],
        multipleSelection: [],
        //分頁
        total: null,
        ywc:"已完成",
        currentPage: 1,
        pageSize: 10,
        showFlag:null,
        settlementDate:[]
      }
    },
    created() {
      this.getGoodsData(this.currentPage)
      this.getAllShop()
    },
    watch:{
      shopId(){
        this.getGoodsData(this.currentPage)
      },
      goodsName(){
        if(!this.goodsName){
          this.getGoodsData(this.currentPage)
        }
      },
      settlementDate(){
        this.getGoodsData(this.currentPage)
      }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      getGoodsData(currentPage) {
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/pageQueryHistoryPurchase",
          data:  {pageNo: currentPage, pageSize: this.pageSize,shopId:this.shopId,itemName:this.goodsName,purchaseDate:this.settlementDate,itemStatus:0},
          dataType: "json"
        }).success(res => {
          this.goodsInfor = res.result.data;
          this.total = res.result.totalCount;
          console.log(this.goodsInfor)
        })
      },
      getAllShop(){
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
    width: 100%;
    display: flex;
    background: #fff;
    padding: 5px 0;
  }
  .pagination-box {
    margin-left: 20px;
  }
  .settlementDate>>>.el-input__prefix{
    top: -5px;
  }
  .settlementDate>>>.el-input__suffix{
    top: -5px;
  }
  .bottom-box{
    height: 30px;
  }
</style>
