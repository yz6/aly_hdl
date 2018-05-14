<template>
  <div class="goods_infor">
    <div class="search-box">
      <span class="bigWords">促销活动数据</span>
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
      <span class="activityDate">
    <el-date-picker
      v-model="activityDate"
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
         <el-button v-if='this.goodsName' type="primary" style="height: 26px" @click="getGoodsData(currentPage)" size="mini"><span class="el-icon-search"></span></el-button>
        </span>
      <div class="pull-right">
        <el-button>上传数据</el-button>
        <el-button type="primary">下载模板</el-button>
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
          label="计划定制日期"
          prop="bizDate"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="促销开始日"
          prop="ddStart"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="ddEnd"
          label="促销结束日"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="type"
          label="促销类型"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="supers"
          label="是否冰点价"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="price"
          label="促销前售价"
          width="80"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="price1"
          label="促销售价">
        </el-table-column>
        <el-table-column
          prop="discount"
          label="折扣率">
        </el-table-column>
        <el-table-column
          prop="base"
          label="基准数量">
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
        shopNameSelect:[],
        goodsName:null,
        shopId:'',
        goodsInfor: [],
        selectionArr:[],
        multipleSelection: [],
        //分頁
        total: null,
        currentPage: 1,
        pageSize: 10,
        activityDate:'',
        showFlag:false,
        loading:null
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
      activityDate(){
        this.getGoodsData(this.currentPage)
      },
      goodsName(){
        if(!this.goodsName){
          this.getGoodsData(this.currentPage)
        }
      }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      getGoodsData(currentPage) {
        this.loading= true;
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/pageQueryPromotion",
          data:  {pageNo: currentPage, pageSize: this.pageSize,shopId:this.shopId,itemName:this.goodsName,bizDate:this.activityDate},
          dataType: "json"
        }).success(res => {
          this.goodsInfor = res.result.data;
          this.total = res.result.totalCount;
          this.loading= false;
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
          console.log(this.shopNameSelect.shopName)

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
      btnShow(){
        this.showFlag=true
      },
      btnHide(){
        this.showFlag=false
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
  .bottom-box{
    height: 30px;
  }
</style>
