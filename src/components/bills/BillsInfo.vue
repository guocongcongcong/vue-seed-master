<template>
    <div>
    <el-card class="box-card">
      <el-row>
          <el-col :span="3" :offset="2">
            <el-button type="primary" @click="getNewPlan">刷新</el-button>
          </el-col>
        </el-row>
    </el-card>
        <el-card class="box-card">
                <el-table :data="tableData" style="width: 90%;" >
                  <el-table-column fixed prop="date" label="日期" width="150">
                  </el-table-column>
                  <el-table-column prop="total" label="总欠款" width="120">
                  </el-table-column>
                  <el-table-column prop="expenditure" label="支出" width="120">
                  </el-table-column>
                  <el-table-column prop="accumulation" label="公积金" width="120">
                  </el-table-column>
                  <el-table-column prop="repayment" label="单月还款" width="120">
                  </el-table-column>
                </el-table>
              </el-card>
    </div>
</template>
<script>
import arr from "../../assets/json/billstemplate.json";
export default {
  data() {
    return {
      tableData:
       [
        {
          date: "2018-11",
          total: "37500",
          expenditure: "1000",
          accumulation: "0",
          repayment: "8000"
        }
      ]
    };
  },
  methods:{
      getNewPlan(){
        // let settings = this.$store.state.bill.settings;
        // let info = this.$store.state.bill.info;
        let info = arr[0];
        let tableData= this.tableData[0];
        let startDate = new Date(info.startDate);
        // .parse(info.startDate);
        var today = new Date();
        // console.log(startDate.getFullYear());
        // console.log(startDate.getMonth());
        // console.log(startDate.getDate());
        // console.log(startDate.getDay());



        
        this.tableData.push(tableData);
      }
  }
};
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.el-row.row_t {
  margin-bottom: 20px;
}

.text {
  font-size: 14px;
}

/* .item {
    padding: 18px 0;
  } */

.box-card {
  width: 1050px;
}

.box-card-info {
  width: 800px;
}
</style>
