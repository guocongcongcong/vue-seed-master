<template>
  <div style="margin-top: 10px;">
    <el-row class='row_t'>
      <el-col :span="16">
        <el-card class="box-card">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="银行名称">
              <el-autocomplete popper-class="my-autocomplete" v-model="formInline.name" :fetch-suggestions="querySearch"
                placeholder="请输入内容" @select="handleSelect">
                <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick">
                </i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                  <span class="addr">{{ item.total }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="总额度">
              <el-input placeholder="请输入内容" v-model="formInline.total" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="剩余额度">
              <el-input placeholder="请输入内容" v-model="formInline.rest" clearable>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addInfo">添加</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <el-container>
            <el-header>
              <h3>信用卡明细</h3>
            </el-header>
            <el-main>
              <el-row :span="16" :offset="4">
                <el-table :data="tableData" style="width:100%" :summary-method="getSummaries" show-summary>
                  <el-table-column fixed prop="name" label="名称" width="150" :align='tableAlign'>
                  </el-table-column>
                  <el-table-column prop="total" label="总额度（元）" width="120" :align='tableAlign'>
                  </el-table-column>
                  <el-table-column prop="rest" label="剩余额度（元）" width="120" :align='tableAlign'>
                  </el-table-column>
                  <el-table-column prop="owe" label="欠款（元）" width="120" :align='tableAlign'>
                  </el-table-column>
                  <el-table-column label="操作"  :align='tableAlign'>
                    <template slot-scope="scope">
                      <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
                      <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-main>
          </el-container>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      restaurants: [],
      formInline: {
        name: "",
        tatol: "",
        rest: ""
      },
      tableData: [
        {
          name: "借呗",
          total: "39500",
          rest: "27500",
          owe: "12000"
        },
        {
          name: "北京",
          total: "37000",
          rest: "27000",
          owe: "10000"
        },
        {
          name: "广发",
          total: "59000",
          rest: "41175",
          owe: "17825"
        }
      ],
      tableAlign: "center"
    };
  },
  methods: {
    //添加
    addInfo() {
      let that = this;
      let data = this.tableData.slice();
      Object.keys(data[0]).forEach(function(key){
        if(key == 'owe'){data[key] = that.formInline.total - that.formInline.rest;}
        else{data[key]= that.formInline[key];}
      });
      Object.keys(that.formInline).forEach(function(key){that.formInline[key]= "";});
      this.tableData.push(data);
    },
    //合计  table 上添加 show-summary
    getSummaries(param) {
      const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            //sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });
        console.log(sums);
      this.$store.commit('getBillInfo',sums);
      return sums;
    },
    //修改删除按钮
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    //银行名称的列表
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        {
          value: "借呗",
          total: "支付宝借呗"
        },
        {
          value: "花呗",
          total: "支付宝花呗"
        },
        {
          value: "北京",
          total: "北京银行信用卡"
        },
        {
          value: "广发",
          total: "广发银行信用卡"
        },
        {
          value: "浦发",
          total: "浦东发展银行信用卡"
        }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
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

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
