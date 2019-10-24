<template>
  <div class="top">
    <div class="front" @click="run">欢迎 {{ name.username }} 来到小爱后台管理系统</div>
    <div class="later">
      <span v-if="nowTime < 6">该睡觉了</span>
      <span v-else-if="nowTime < 12">早上好</span>
      <span v-else-if="nowTime < 14">中午好</span>
      <span v-else-if="nowTime < 18">下午好</span>
      <span v-else>晚上好</span>，亲爱的 {{ name.username }} 登录时间：{{ showTime }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  components: {},
  props: {},
  data() {
    return {
      showTime: ""
    };
  },
  methods: {
    // this.$axios.req()
    run() {
      this.$router.push("/login");
    },
    getTime() {
      this.showTime = this.$dayjs(this.name.date).format("YYYY年MM月DD日H时mm分s秒");
    }
  },
  mounted() {
    this.getTime();
  },
  created() {},
  filters: {},
  computed: {
    name() {
      return JSON.parse(localStorage.getItem("name")).user.data[0];
    },
    nowTime() {
      let timer = new this.$dayjs()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0);
      return Math.floor(this.$dayjs().diff(timer) / 1000 / 3600);
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.top {
  background: #2e5e85;
  height: 60px;
  width: 94%;
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  padding: 0 3%;
  color: white;
  font-size: 16px;
}
</style>
