<template>
  <div class="quit">
    <div class="word">期待您的下次光临</div>
    <el-button type="primary" @click="quit">确定退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Quit",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    quit() {
      this.$store.state.username = ""; //用户名注销store
      localStorage.removeItem("name"); //用户名注销localstorage
      this.$router.push("/login")
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
.quit {
  width: 100%;
  text-align: center;
}
.word {
  margin-top: 250px;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 30px;
}
</style>
