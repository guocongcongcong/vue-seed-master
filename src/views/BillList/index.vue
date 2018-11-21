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
      <!-- <el-tabs :tab-position="tabPosition" @tab-click="uploadData" style="height: auto;" > -->
      <el-tabs :tab-position="tabPosition" style="height: auto;" >
        <el-tab-pane label="配置管理">
          <bills-setting></bills-setting>
        </el-tab-pane>
        <el-tab-pane label="银行卡管理">
          <bills-card-input></bills-card-input>
        </el-tab-pane>
        <el-tab-pane label="账单明细" >
          <bills-info></bills-info>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
import BillsCardInput from "comp/bills/BillsCardInput.vue";
import BillsSetting from "comp/bills/BillsSetting.vue";
import BillsInfo from "comp/bills/BillsInfo.vue";
export default {
  name: "bills",
  components: {
    "bills-card-input": BillsCardInput,
    "bills-setting": BillsSetting,
    "bills-info":BillsInfo
  },
  data() {
    return {
      tabPosition: "left"
    };
  },
  // methods:{
  //   uploadData (tab, e){
  //     if(e.target.id == 'tab-2'){
  //       console.log(e.target.id);
  //       let settings = this.$store.state.bill.settings;
  //       let info = this.$store.state.bill.info;
  //       //let tableData= this.$store.state.bill.tableData[0];
  //       let tableData =[
  //       {
  //         date: "2018-11",
  //         total: "37500",
  //         expenditure: "1000",
  //         accumulation: "0",
  //         repayment: "8000"
  //       }
  //     ]
  //       this.$store.commit('uploadDate',tableData);
  //       console.log(this.$store.state.bill.tableData);
  //     }
  //    }
  //  }
};
</script>