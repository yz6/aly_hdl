<template>
  <div class="supplier-infor">
    <div class="search-box">
      <span class="bigWords">供应商信息</span>
      <span class="search-store">
        <el-input
          placeholder="搜索门店名称"
          v-model="shopName">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        <el-button v-if='this.shopName' type="primary" style="height: 26px" @click="getSupplierData(currentPage)" size="mini"><span class="el-icon-search"></span></el-button>
      </span>
      <span class="search-store">
        <el-input
          placeholder="搜索供应商名称、税号"
          v-model="supplierName">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        <el-button v-if="supplierName" type="primary" style="height: 26px" @click="getSupplierData(currentPage)" size="mini"><span class="el-icon-search"></span></el-button>
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
        :data="supplierInfor"
        @select="toggleSelection"
        @select-all="toggleSelection"
        style="width: 100%"
      height="500">
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="shopId"
          label="门店编码"
          width="100">
        </el-table-column>
        <el-table-column
          prop="taxNo"
          label="供应商税号"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="supplierName"
          label="供应商名称"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="supplierId"
          label="供应商编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="shopName"
          label="门店名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="buyerCode"
          label="采购组"
          width="100">
        </el-table-column>
        <el-table-column
          prop="shopType"
          label="门店类型"
          width="100"
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
              <!--@click.native.prevent="deleteRow(scope.$index, supplierInfor)">-->
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
    name: "supplier_infor",
    data() {
      return {
        taxNum: '',
        shopName: '',
        supplierName: '',
        supplierInfor: [],
        multipleSelection: [],
        selectionArr:[],
        value: '所有供应商',
        //数据数
        total: null,
        currentPage: 1,
        pageSize: 10,
        loading:null,
        nameOptions: [{
          value: '所有供应商',
          label: '所有供应商'
        }, {
          value: '',
          label: ''
        }]
      }
    },
    created() {
      this.getSupplierData(this.currentPage)
    },
    watch:{
      shopName(){
        if(!this.shopName){
          this.getSupplierData(this.currentPage)
        }
      }
    },
    methods: {
      getSupplierData(currentPage) {
        this.loading=true;
        $.ajax({
          type: "post",
          url: 'http://supply.lovedabai.com/business/api/pageQuerySupplier',
          data: {pageNo: currentPage, pageSize: this.pageSize,shopName:this.shopName,supplierName:this.supplierName},
          dataType: 'json',
        }).success(res => {
          console.log(res.result.data)
          this.supplierInfor = res.result.data
          this.total = res.result.totalCount;
          this.loading=false;
        })
      },
      pagingSearch(currentPage) {
        this.getSupplierData(currentPage)
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
            for(var i=this.supplierInfor.length-1;i>=0;i--){
              for(let j = 0,len = this.selectionArr.length;j<len;j++){
                console.log(i)
                if(this.supplierInfor[i].id === this.selectionArr[j].id){
                  this.supplierInfor.splice(i,1);
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
      }
    },

  }
</script>

<style scoped>
  .supplier-infor {
    width: 100%;
    padding: 20px 15px;
    position: relative;
    overflow-x: hidden;
  }

  .supplier-infor>>> .el-input--prefix {
    width: 200px;
  }

  .supplier-infor>>> .el-input__prefix {
    top: -5px;
  }

  .supplierName-option>>> .el-input__inner {
    width: 120px;
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
