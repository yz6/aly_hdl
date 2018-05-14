<template>
  <div class="goods_infor">
    <div class="search-box">
      <span class="bigWords">商品信息</span>
      <span class="storeclass-option">
          <el-select v-model="shopId" placeholder="请选择">
    <el-option
      v-for="item in shopNameSelect"
      :key="item.shopId"
      :label="item.shopName"
      :value="item.shopId">
    </el-option>
  </el-select>
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
        v-loading="loading"
        element-loading-text="拼命加载中"
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
          prop="supplierName"
          label="供应商名称"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="content"
          label="含量"
          width="60">
        </el-table-column>
        <el-table-column
          prop="packageParam"
          label="规格"
        width="50">
        </el-table-column>
        <el-table-column
          prop="life"
          label="保质天数"
          width="70"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="normalPrice"
          label="主档售价"
          width="70">
        </el-table-column>
        <el-table-column
          prop="class1Id"
          label="部类"
          width="50">
        </el-table-column>
        <el-table-column
          prop="class2"
          label="大类">
        </el-table-column>
        <el-table-column
          prop="class3"
          label="中类">
        </el-table-column>
        <el-table-column
          prop="class4"
          label="小类">
        </el-table-column>
        <el-table-column
          prop="class5"
          label="子类"
        width="150">
        </el-table-column>
        <el-table-column
          prop="minFlg"
          label="最小要货规格"
        width="100">
        </el-table-column>
        <el-table-column
          prop="pieceFlg"
          label="拆零标记">
        </el-table-column>
        <el-table-column
          prop="returnFlg"
          label="退货标记">
        </el-table-column>
        <el-table-column
          prop="typeId"
          label="业态编码">
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
        showFlag:null,
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
        this.loading = true;
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/pageQueryItem",
          data:  {pageNo: currentPage, pageSize: this.pageSize,shopId:this.shopId,itemName:this.goodsName},
          dataType: "json"
        }).success(res => {
          this.goodsInfor = res.result.data;
          this.total = res.result.totalCount;
          this.loading = false;
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
  .bottom-box{
    height: 30px;
  }
</style>
