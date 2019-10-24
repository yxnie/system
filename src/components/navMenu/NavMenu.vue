<template>
  <div class="NavMenu">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#344055"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" @click="run('/')">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2" @click="run('/table')">
          <i class="el-icon-menu"></i>
          <span slot="title">分页表格</span>
        </el-menu-item>
        <el-menu-item index="3" @click="run('/labelPage')">
          <i class="el-icon-collection-tag"></i>
          <span slot="title">标签页</span>
        </el-menu-item>
        <el-menu-item index="4" @click="run('/imageUpload')">
          <i class="el-icon-picture"></i>
          <span slot="title">图片上传</span>
        </el-menu-item>
        <el-menu-item index="5" @click="run('/published')">
          <i class="el-icon-finished"></i>
          <span slot="title">已发表</span>
        </el-menu-item>
        <el-menu-item index="6" @click="run('/publishArticle')">
          <i class="el-icon-upload"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="7" @click="run('/statistics')">
          <i class="el-icon-pie-chart"></i>
          <span slot="title">统计</span>
        </el-menu-item>
        <el-menu-item index="8" @click="run('/exportExcel')">
          <i class="el-icon-s-unfold"></i>
          <span slot="title">导出excel</span>
        </el-menu-item>
        <el-menu-item index="9" @click="run('/quit')">
          <i class="el-icon-switch-button"></i>
          <span slot="title">退出系统</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    run(path) {
      this.$router.push(path);
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.NavMenu {
  background: #344055;
  position: fixed;
  top: 0;
  bottom: 0;
  .el-menu-vertical-demo {
    border: 0;
  }
}
</style>
