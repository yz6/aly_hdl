<template>
  <div class="goods_infor">
    <div class="search-box">
      <span class="bigWords">任务列表</span>
      <span style="font-size: 14px">任务日期</span>
      <span class="activityDate">
    <el-date-picker
      v-model="activityDate"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期"
      :picker-options="dateOptions">
    </el-date-picker>
      </span>
      <span style="font-size: 14px">预测周期</span>
      <span class="storeclass-option">
          <el-select v-model="cely"  placeholder="预测两周">
    <el-option
      v-for="item in celyOptions "
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled">
    </el-option>
  </el-select>
        </span>
      <span style="font-size: 14px">任务状态</span>
      <span  class="storeclass-option">
        <el-select v-model="status"  placeholder="所有状态">
    <el-option
      v-for="item in statusList"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      </span>
      <div class="pull-right">
        <el-button @click="goCreateTask" type="primary">创建任务</el-button>
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
          prop="formatCreateDate"
          label="任务日期"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="fcsDate"
          label="预测开始日期">
        </el-table-column>
        <el-table-column
          prop="fceDate"
          label="预测截止日期">
        </el-table-column>
        <el-table-column

          label="预测周期"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="margin-left: 10px">两周</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务ID"
          prop="id"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="启动时间"
          prop="formatStartDate"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="formatEndDate"
          label="结束时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="statusInfo"
          label="任务状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="type"
          label="执行说明"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <router-link :to="{path:'fore_cast',query:{taskId:scope.row.id}}">
              <el-button
                type="text"
                size="small">
                销售预测
              </el-button>
            </router-link>
            <router-link :to="{path:'intelligent_supply',query:{taskId:scope.row.id}}">
              <el-button
                type="text"
                size="small">
                智能补货
              </el-button>
            </router-link>
            <router-link :to="{path:'order',query:{taskId:scope.row.id}}">
              <el-button
                type="text"
                size="small">
                采购单
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom-box">
      <div  class="removeBtn">
        <!--<el-button   @click="batchRemove" type="primary">批量删除</el-button>-->
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
        cely:"选项2",
        currentPage: 1,
        pageSize: 10,
        activityDate:'',
        celyOptions:[{
          value: '选项1',
          label: '一天',
          disabled: true
        }, {
          value: '选项2',
          label: '两周',

        }, {
          value: '选项3',
          label: '两周',
          disabled: true
        },{
          value: '选项4',
          label: '一月',
          disabled: true
        }],
        showFlag:false,
        loading:null,
        status:'',
        statusList:[
          {
            value: '',
            label: '全部'
          },
          {
            value: 'crateTask',
            label: '任务创建'
          },{
            value: 'forecast',
            label: '销售预测'
          },{
          value: 'order',
          label: '智能补货'
        },
          {
            value: 'purchase',
            label: '已完成'
          },],
        dateOptions:{
          disabledDate() {

          },

        }
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
      },
      status(){
        this.getGoodsData(this.currentPage)
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
          url: "http://supply.lovedabai.com/business/api/pageQueryTask",
          data:  {pageNo: currentPage, pageSize: this.pageSize,createDate:this.activityDate,status:this.status},
          dataType: "json"
        }).success(res => {
          this.goodsInfor = res.result.data;
          this.total = res.result.totalCount;
          this.loading= false;
          console.log(this.goodsInfor,"表格数据")
        })
      },
      getAllShop(){
        $.ajax({
          type: 'post',
          url: "http://supply.lovedabai.com/business/api/findAllTask",
          data:  {},
          dataType: "json"
        }).success(res => {
          console.log(res.result)
          this.shopNameSelect = res.result
          console.log(this.shopNameSelect)
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
</style>
