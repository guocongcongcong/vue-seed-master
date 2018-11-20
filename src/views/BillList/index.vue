<template>
  <div v-title="'小工具'">
    <el-row :gutter="24">
      <!-- <el-row :span="4" :offset="8">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
          <el-radio-button label="top">top</el-radio-button>
          <el-radio-button label="right">right</el-radio-button>
          <el-radio-button label="bottom">bottom</el-radio-button>
          <el-radio-button label="left">left</el-radio-button>
        </el-radio-group>
      </el-row> -->
      <el-tabs :tab-position="tabPosition" style="height: auto;">
        <el-tab-pane label="银行卡管理">
          <bills-card-input></bills-card-input>
        </el-tab-pane>
        <el-tab-pane label="配置管理">
          <el-card class="box-card">
            <el-row>
              <!-- <el-button plain>朴素按钮</el-button>
                  <el-button type="primary" plain>主要按钮</el-button>
                  <el-button type="success" plain>成功按钮</el-button> -->
              <el-button type="info" plain @click="getConstInfo">信息按钮</el-button>
              <!-- <el-button type="warning" plain>警告按钮</el-button>
                  <el-button type="danger" plain>危险按钮</el-button> -->
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="账单明细">
          <el-row class='row_t'>
            <el-col :span="16">
              <el-card class="box-card">
                <el-table :data="tableData3" style="width: 90%;" height="250">
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
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
   import BillsCardInput from "comp/BillsCardInput.vue"
  // const billsInfo = new Vuex.Store({
  //   strict: debug,
  //   mutations: {
  //     total: []
  //   }
  // })
  export default {
    name: "bills",
    components: {
      "bills-card-input": BillsCardInput
    },
    data() {
      return {
        tableData3: [{
          date: "2018-11",
          total: "37500",
          expenditure: "1000",
          accumulation: "0",
          repayment: "8000"
        }],
        tabPosition: "left"
      };
    },
    methods: {
      getConstInfo() {
        console.log(columns);
      }
    }
  };

</script>
<style scoped lang="less">
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
