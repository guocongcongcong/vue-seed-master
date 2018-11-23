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
// import arr from "../../assets/json/billstemplate.json";
export default {
  data() {
    return {
      tableData: [
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
  props:{
    tableData
  },
  methods: {
    getNewPlan() {
      this.tableData.length = 0;
      let settings = this.$store.state.bill.settings;
      let info = this.$store.state.bill.info;
      // let tableData= this.tableDate;
      // let settings = arr[0];
      let owe = info.owe;
      let i = 0;
      let enterList = [];
      for (let k = 0; k < 4; k++) {
        let enterMonth = this.getDate(new Date(settings.enterDate), k * 3);
        enterList.push(enterMonth);
      }
      while (parseInt(owe) > 0) {
        let tableRow = {
          date: "0",
          total: "0",
          expenditure: "0",
          accumulation: "0",
          repayment: "0"
        };
        //getDate得到最新日期
        let startMonth = this.getDate(new Date(settings.startDate), i);
        let nextMonth = this.getDate(new Date(settings.startDate), i + 1);
        //正常还款
        tableRow.date = this.getDateStr(startMonth);
        tableRow.repayment = settings.singleMoney;
        //公积金
        for (let key in enterList) {
          if (this.getMidDate(startMonth, nextMonth, enterList[key])) {
            tableRow.date =
              tableRow.date + "(" + this.getDateStr(enterList[key]) + ")";
            tableRow.accumulation = 4500;
            owe = owe - 4500;
          }
        }
        owe = owe - settings.singleMoney;
        tableRow.total = owe;
        this.tableData.push(tableRow);
        i++;
      }
    },
    getDate: function(date, i) {
      let dateObj = {
        year: date.getFullYear(),
        month: date.getMonth() + 1 + i,
        day: date.getDate()
      };
      if (dateObj.month > 12) {
        dateObj.year = parseInt(dateObj.year + dateObj.month / 12);
        dateObj.month = dateObj.month - 12;
      }
      return new Date(dateObj.year + "-" + dateObj.month + "-" + dateObj.day);
    },
    getDateStr: function(date) {
      let dateObj = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      return dateObj.year + "-" + dateObj.month + "-" + dateObj.day;
    },
    //列表补全
    getBeatyRow: function(tableRow) {
      Object.keys(tableRow).forEach(function(key) {
        tableRow[key] = "0";
      });
      return tableRow;
    },
    //日期中间值
    getMidDate: function(oDate1, oDate2, oDate3) {
      //oDate2 = new Date();
      if (
        oDate1.getTime() <= oDate3.getTime() &&
        oDate2.getTime() >= oDate3.getTime()
      ) {
        return true;
      } else {
        return false;
      }
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
