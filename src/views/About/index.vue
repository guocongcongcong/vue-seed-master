<template>
    <div v-title="'项目信息'">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <i class="el-icon-edit"></i>&nbsp;&nbsp;
                <span>模块开发备忘录</span>
            </div>
            <div class="text item">
                <ol>
                    <li v-for="(str,index) in notes" :key="index">{{str}}</li>
                </ol>
            </div>
        </el-card>
                <el-card class="box-card">
            <div slot="header" class="clearfix">
                <i class="el-icon-edit"></i>&nbsp;&nbsp;
                <span>bug修改</span>
            </div>
            <div class="text item">
                <ol>
                    <li v-for="(str,index) in bugs" :key="index">{{str}}</li>
                </ol>
            </div>
        </el-card>

    </div>
</template>
<script>
export default {
  name: "about",
  data() {
    return {
        notes: [
            '小工具：页面整理',
            '预算：配置值完成一个模式的计算（开始日期+公积金+月还款）',
            'MarkDown：markdown导入加载未完成，下载保存未完成',
        ],
        bugs:[
            'vue项目中的数据加载，使用的是data，而不是date'
        ]

    };
  }
};
</script>
<style scoped lang="less">
li {
    line-height: 30px;
}
</style>
