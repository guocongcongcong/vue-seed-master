<template>
  <div id="markdown">
    <el-card class="box-card" hadow="hover" style="height: 100%">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span>Markdown</span>
        <el-switch
          v-model="toolbarsFlag"
          active-color="#13ce66"
          inactive-color="#ff4949"
          inactive-text="工具栏"
          style="float: right; padding: 3px 0"
        ></el-switch>
        <el-switch
          v-model="ishljs"
          active-color="#13ce66"
          inactive-color="#ff4949"
          inactive-text="代码高亮"
          style="float: right; padding: 3px 0"
        ></el-switch>
      </div>
      <el-row>
        <el-col>
          <mavon-editor
            v-model="context"
            :toolbars="toolbars"
            :toolbarsFlag="toolbarsFlag"
            :ishljs="ishljs"
            style="height: 100%"
            @save="$save"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "markdown",
  data() {
    return {
      context: "", //输入的数据
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      toolbarsFlag: true,
      ishljs: true
    };
  },
  methods: {
    $save(value, render) {
      // //md文件代码
      // console.log(value);
      // //html文件代码
      // console.log(render);

      //下载保存为--解决方案：urlObject.createObjectURL(export_blob);
    },
  }
};
</script>
<style lang="less" scoped>
#editor {
  margin: auto;
  width: 80%;
  height: 1500px;
}
.el-row {
  margin-bottom: 10px;
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

.box-card-info {
  width: 800px;
}
</style>


