<template>
  <div v-title="'小工具'">
    <el-row :gutter="20">
      <el-row class='row_t'>
        <el-col :span="20" :offset="2">
          <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px" class="demo-dynamic">
            <el-form-item prop="email" label="邮箱" :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                        ]">
              <el-input v-model="dynamicValidateForm.email"></el-input>
            </el-form-item>

            <el-form-item v-for="(domain, index) in dynamicValidateForm.domains" :label="'域名' + index" :key="domain.key"
              :prop="'domains.' + index + '.value'" :rules="{
                        required: true, message: '域名不能为空', trigger: 'blur'
                        }">
              <el-input v-model="domain.value"></el-input>
              <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
              <el-button @click="addDomain">新增域名</el-button>
              <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>
    </el-row>
    <el-row class='row_t'>
      <el-col :span="20" :offset="2">

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class='row_t'>
      <el-col :span="16" :offset="4">
        <el-table :data="tableData3" style="width: 90%" height="250">
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: "bills",
    data() {
      return {
        tableData3: [
          // {
          //     date:"2018-11",
          //     total:"37500",
          //     expenditure:"1000",
          //     accumulation:"0",
          //     repayment:"8000"
          // },
          // {
          //     date:"2018-12",
          //     total:"29500",
          //     expenditure:"1000",
          //     accumulation:"0",
          //     repayment:"8000"
          // }
        ],
        form: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },
        dynamicValidateForm: {
          domains: [{
            value: ""
          }],
          email: ""
        }
      };
    },
    methods: {
      onSubmit() {
        console.log("submit!");
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1);
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: "",
          key: Date.now()
        });
      }
    }
  };

</script>
<style lang="less">
  .el-row.row_t {
    margin-bottom: 20px;
  }

  /* .el-col {
    border-radius: 4px;
  } */

</style>
