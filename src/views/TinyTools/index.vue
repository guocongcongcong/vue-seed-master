<template>
    <div v-title="'小工具'">
        <el-row>
            <el-col :span="10" :offset="8">
                <!-- <el-row>
                    <el-button type="primary" icon="el-icon-refresh">处理</el-button>
                    <el-button type="primary" icon="el-icon-edit">复制</el-button>
                    <el-button type="primary" icon="el-icon-delete">清空</el-button>
                </el-row> -->
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="10" :offset="1">
                <el-input id='words' type="textarea" :rows="9" placeholder="请输入内容" @change="getValue" >
                </el-input>
            </el-col>
            <el-col :span="10" :offset="1">
                <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="textarea">
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>
<script>
const typeOptions = ['身份证号', '残疾证号', '原长度'];
export default {
    name: "tools",
    data() {
        return {
            textarea: '',
            checkAll: false,
            checkedCities: ['原长度'],
            cities: typeOptions,
            isIndeterminate: true
        }
    },
    methods: {
        getValue(val) {
            let v = [];
            val.trim().split(',').forEach(e => {
                    e = e.split(/\s+/);
                    if(e.length > 1){
                        v.push("'" + e[1] + "'") ;
                    }else{
                        v.push("'" + e[0] + "'")
                    }
                });
            this.textarea = v.join(',');
        },
        handleCheckAllChange(val) {
        this.checkedCities = val ? typeOptions : [];
        this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
    
    }
}
</script>
