<template>
  <div class="store_infor">
    <div class="search-box">
      <span class="bigWords">门店信息</span>
      <span class="option-words">门店类型</span>
      <span class="storeclass-option">
          <el-select v-model="shopType" placeholder="请选择">
    <el-option
      v-for="item in shopNameSelect"
      :key="item.shopType"
      :value="item.shopType">
    </el-option>
  </el-select>
        </span>
      <span class="input-search-box">
           <el-input
             placeholder="搜索门店"
             v-model="shopName">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
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
        :data="storeInfor"
        @select="toggleSelection"
        @select-all="toggleSelection"
        style="width: 100%"
        height=500>
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="shopId"
          label="门店编码"
          width="150">
        </el-table-column>

        <el-table-column
          prop="shopName"
          label="门店名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="shopType"
          label="门店类型"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="门店地址"
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
              <!--@click.native.prevent="deleteRow(scope.$index, storeInfor)">-->
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
        shopType:[],
        input: '',
        storeInfor: [],
        selectionArr:[],
        multipleSelection: [],
        //分頁
        total: null,
        currentPage: 1,
        pageSize: 10,
        loading:null,
      }
    },
    created() {
      this.getStoreData(this.currentPage)
      this.getAllShop()
    },
    watch:{
      supplierName(){
        this.searchStoreName()
      },
      shopName(){
        this.searchStoreName()
      }

    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      getStoreData(currentPage) {
        this.loading=true;
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/pageQueryShop",
          data:  {pageNo: currentPage, pageSize: this.pageSize,shopName:this.shopName},
          dataType: "json"
        }).success(res => {
          this.storeInfor = res.result.data;
          this.total = res.result.totalCount;
          this.loading=false;
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
      this.getStoreData(currentPage)
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
        for(var i=this.storeInfor.length-1;i>=0;i--){
          for(let j = 0,len = this.selectionArr.length;j<len;j++){
            console.log(i)
            if(this.storeInfor[i].id === this.selectionArr[j].id){
              this.storeInfor.splice(i,1);
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
    searchStoreName(){

      this.getStoreData()
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
    }
    }
  }
</script>

<style scoped>
  .store_infor {
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
