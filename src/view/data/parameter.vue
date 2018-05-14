<template>
    <div class="parameter">
      <div class="search-box">
        <span class="bigWords">门店补货参数</span>
        <span class="cgGroup">
          <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </span>
        <span class="search-store">
        <el-input
          placeholder="搜索门店名称"
          v-model="shopName">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
      </span>
        <span class="search-store">
        <el-input
          placeholder="搜索供应商名称"
          v-model="supplierName">
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
          :data="supplierInfor"
          @select="toggleSelection"
          @select-all="toggleSelection"
          style="width: 100%"
          height="500">
          <!--<el-table-column-->
            <!--type="selection">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="shopId"
            label="门店编码">
          </el-table-column>
          <el-table-column
            prop="supplierId"
            label="供应商编码"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="supplierName"
            label="供应商名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="supplierId"
            label="采购组"
          width="60">
          </el-table-column>
          <el-table-column
            prop="orderDate"
            label="可订货周期">
          </el-table-column>
          <el-table-column
            prop="orderInterval"
            label="订货间隔"
            width="70">
          </el-table-column>
          <el-table-column
            prop="dueDate"
            label="送货期限"
            width="70"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="deliverDate"
            label="可送货日期"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="supplierMinQty"
            label="最小起订量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="supplierMinAmount"
            label="最小起订额"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="sale"
            label="在售标志"
            width="70"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="miniOrderSize"
            label="最小起订规格"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="miniOrderSize"
            label="最小陈列量"
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
    name: "parameter",
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
        options:'',
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
      supplierName(){
        this.searchStoreName()
      },
      shopName(){
        this.searchStoreName()
      }
    },
    methods: {
      getSupplierData(currentPage) {
        // this.loading= true;
        $.ajax({
          type: "post",
          url: 'http://supply.lovedabai.com/business/api/pageQueryOrderParam',
          data: {pageNo: currentPage, pageSize: this.pageSize,shopName:this.shopName,supplierName:this.supplierName},
          dataType: 'json',
        }).success(res => {
          console.log(res.result.data)
          this.supplierInfor = res.result.data
          this.total = res.result.totalCount;
          this.loading= false;
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
      searchStoreName(){
        this.getSupplierData()
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


  .parameter {
    width: 100%;
    padding: 20px 15px;
    position: relative;
    overflow-x: hidden;
  }

  .parameter>>> .el-input--prefix {
    width: 150px;
  }

  .parameter>>> .el-input__prefix {
    top: -5px;
  }
  .search-store>>> .el-input__inner{
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
