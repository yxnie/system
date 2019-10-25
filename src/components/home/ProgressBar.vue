<template>
  <div>
    <img
      src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
      alt=""
    />
    <div v-for="(item, index) in data" :key="index" class="bar">
      <div>{{ item.name }}</div>
      <div v-if="item.progress === 1">
        <el-progress :percentage="item.progress * 100" status="success"></el-progress>
      </div>
      <div v-else>
        <el-progress :percentage="item.progress * 100"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  components: {},
  props: {},
  data() {
    return {
      data: []
    };
  },
  methods: {
    getData() {
      this.$axios
        .req("api/progress")
        .then(res => {
          if (res.code === 0) {
            this.data = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.bar {
  margin: 15px 0;
}
img {
  display: flex;
  width: 100%;
  margin-bottom: 35px;
}
</style>
