<template>
    <div v-title="'小工具'">
        <el-row class='row_t'>
            <el-col :span="16" :offset="7">
                <!-- <el-row>
                    <el-button type="primary" icon="el-icon-refresh">处理</el-button>
                    <el-button type="primary" icon="el-icon-edit">复制</el-button>
                    <el-button type="primary" icon="el-icon-delete">清空</el-button>
                </el-row> -->
                <el-row>
                    <el-radio v-model="radio" label="0" border @change="getLength">原长度</el-radio>
                    <el-radio v-model="radio" label="1" border @change="getLength">身份证号</el-radio>
                    <el-radio v-model="radio" label="2" border @change="getLength">残疾证号</el-radio>
                    <el-radio v-model="radio" label="3" border @change="getLength">自定义长度</el-radio>
                </el-row>
            </el-col>
        </el-row>
        <el-row  v-if = disInput class='row_t'>
            <el-col :span="10" :offset="7">
                <el-row>
                    <el-input v-model="input" placeholder="请输入内容"  clearable></el-input>
                </el-row>
            </el-col>
        </el-row>
        <el-row class='row_t'>
            <el-col :span="10" :offset="1">
                <el-input id='words' type="textarea" :rows="9" placeholder="请输入内容,以空格分割" @change="getValue">
                </el-input>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-input type="textarea" :rows="9" placeholder="请等待结果" v-model="textarea">
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  name: "tools",
  data() {
    return {
      textarea: "",
      radio: "0",
      input: "",
      disInput: false
    };
  },
  methods: {
    getValue(val) {
      let v = [];
      val
        .trim()
        .split(/\s/)
        .forEach(e => {
          e = e.split(/\s+/);
          console.log(e);
          let temp = "";
          if (e.length > 1) {
            temp = e[1];
          } else {
            temp = e[0];
          }
          console.log(this.radio);
          if (this.radio == 1) {
            temp = temp.substring(0,18);
          } else if (this.radio == 2) {
            temp = temp.substring(0,20);
          } else if (this.radio == 3) {
            console.log(temp.substring(0,this.input));
            temp = temp.substring(0,this.input);
          }
          v.push("'" + temp + "'");
        });
      this.textarea = v.join(",");
    },
    getLength(val) {
      if (val === "3") {
        this.disInput = true;
      } else {
        this.disInput = false;
        this.input = "";
      }
    }
  }
};
</script>
<style  lang="less">
 .el-row.row_t {
    margin-bottom: 20px;
    
  }
  /* .el-col {
    border-radius: 4px;
  } */
</style>
