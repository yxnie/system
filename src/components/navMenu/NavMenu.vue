<template>
  <div class="NavMenu">
    <el-col :span="24">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#344055"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/" @click="run('/')">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/table" @click="run('/table')">
          <i class="el-icon-menu"></i>
          <span slot="title">分页表格</span>
        </el-menu-item>
        <el-menu-item index="/labelPage" @click="run('/labelPage')">
          <i class="el-icon-collection-tag"></i>
          <span slot="title">标签页</span>
        </el-menu-item>
        <el-menu-item index="/imageUpload" @click="run('/imageUpload')">
          <i class="el-icon-picture"></i>
          <span slot="title">图片上传</span>
        </el-menu-item>
        <el-menu-item index="/published" @click="run('/published')">
          <i class="el-icon-finished"></i>
          <span slot="title">已发表</span>
        </el-menu-item>
        <el-menu-item index="/publishArticle" @click="run('/publishArticle')">
          <i class="el-icon-upload"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/statistics" @click="run('/statistics')">
          <i class="el-icon-pie-chart"></i>
          <span slot="title">统计</span>
        </el-menu-item>
        <el-menu-item index="/exportExcel" @click="run('/exportExcel')">
          <i class="el-icon-s-unfold"></i>
          <span slot="title">导出excel</span>
        </el-menu-item>
        <el-menu-item index="/quit" @click="run('/quit')">
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
