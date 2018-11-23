<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-form :inline="true" :model="dateForm" label-width="100px" class="demo-form-inline">
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="开始日期">
                <el-date-picker v-model="dateForm.startDate" type="date" placeholder="选择开始日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束日期">
                <el-date-picker v-model="dateForm.endDate" type="date" placeholder="选择结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="公积金进账">
                <el-switch v-model="dateForm.enter" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col v-if=dateForm.enter :span="8">
              <el-form-item label="开始日期">
                <el-date-picker v-model="dateForm.enterDate" type="date" placeholder="选择开始日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="月还款金额">
                <el-switch v-model="dateForm.moneySwitch" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col v-if=dateForm.moneySwitch :span="8">
              <el-form-item label="还款金额">
                <el-input v-model="dateForm.singleMoney" placeholder="请输入金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="预算时间长度">
                <el-switch v-model="dateForm.lengthSwitch" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col v-if=dateForm.lengthSwitch :span="8">
              <el-form-item label="结束时间">
                <el-date-picker v-model="dateForm.billsLength" type="date" placeholder="选择结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="套现汇率">
                <el-switch v-model="dateForm.rateSwitch" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col v-if=dateForm.rateSwitch :span="8">
              <el-form-item label="汇率">
                <el-input v-model="dateForm.rate" placeholder="请输入金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row>
        <el-form :model="settingForm" ref="settingForm" label-width="100px" class="demo-expenditure">
          <el-form-item v-for="(expenditure, index) in settingForm.expenditure" :label="'必要支出' + index" :key="expenditure.key"
            :prop="'expenditure.' + index + '.value'">
            <el-row>
              <el-col :span="5">
                <el-input v-model="expenditure.name" placeholder="请输入名称"></el-input>
              </el-col>
              <el-col :span="5">
                <el-select v-model="expenditure.interval" placeholder="请选择间隔">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-input v-model="expenditure.amount" placeholder="请输入金额"></el-input>
              </el-col>
              <el-col :span="5">
                <el-button @click.prevent="removeDomain(expenditure)">删除</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row>
        <!--    <el-button plain>朴素按钮</el-button>
                        <el-button type="primary" plain>主要按钮</el-button>
                        <el-button type="success" plain>成功按钮</el-button> 
                        <el-button  type="info" plain >信息按钮</el-button>
                        <el-button type="warning" plain>警告按钮</el-button>
                        <el-button type="danger" plain>危险按钮</el-button>
                        <el-button type="primary" @click="submitForm('settingForm')">提交</el-button>
                        <el-button @click="resetForm('settingForm')">重置</el-button>
                -->
        <el-row>
          <el-col :span="3" :offset="2">
            <el-button type="primary" @click="addDomain">新增必要支出</el-button>
          </el-col>
          <el-col :span="3" :offset="2">
            <el-button type="primary" @click="getInfo">确认工单</el-button>
          </el-col>
        </el-row>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  // 引入城市列表
  import arr from "../../assets/json/intervallist.json";
  export default {
    data() {
      return {
        dateForm: {
          startDate: "",
          endDate: "",
          enter: true,
          enterDate: "",
          moneySwitch: true,
          singleMoney: "",
          rateSwitch: false,
          rate: "",
          lengthSwitch: false,
          billsLength: ""
        },
        settingForm: {
          expenditure: [{
            name: "",
            interval: "",
            amount: ""
          }]
        },
        options: arr
      };
    },
    methods: {
      getInfo() {
        let info = this.$store.state.bill.settings;
        let that = this;
        let temp = {}
        Object.keys(info).forEach(function (key) {
          if (key == 'expenditure') {
            temp[key] = that.settingForm.expenditure;
          } else {
            temp[key] = that.dateForm[key]
          }
        });
        this.$store.commit('getSettings', temp);
      },
      // submitForm(formName) {
      //   this.$refs[formName].validate(valid => {
      //     if (valid) {
      //       alert("submit!");
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
      // },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },
      //支出添加删除--domain(领域)
      removeDomain(item) {
        var index = this.settingForm.expenditure.indexOf(item);
        if (index !== -1) {
          this.settingForm.expenditure.splice(index, 1);
        }
      },
      addDomain() {
        this.settingForm.expenditure.push({
          name: "",
          interval: "",
          amount: "",
          key: Date.now()
        });
      }
    }
  };

</script>
<style scoped lang="less">
  .box-card {
    width: 1050px;
  }

  .el-select .el-input {
    width: 100px;
  }

  .demo-expenditure .el-input {
    width: 160px;
  }

  .demo-expenditure .el-select {
    width: 160px;
  }

</style>
