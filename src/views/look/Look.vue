<template>
  <div>
    <div class="all">
      <div><el-button type="primary">返回</el-button></div>
      <div class="top">
        <div class="title">{{ data.title }}</div>
        <div class="abstract">{{ data.abstract }}</div>
        <div class="date">发表于: {{ $dayjs(data.date).format("YYYY-MM-DD hh:mm:ss") }}</div>
      </div>
      <div>
        <mavon-editor v-model="data.text" :subfield="false" defaultOpen="preview" :toolbarsFlag="false"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Look",
  components: {},
  props: {},
  data() {
    return {
      id: "",
      data: {}
    };
  },
  methods: {
    getOne() {
      this.$axios
        .req("/api/article/article", { _id: this.id })
        .then(res => {
          if (res.code === 200) {
            this.data = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.id = this.$route.query._id;
    this.getOne();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  margin: 20px;
  .top {
    text-align: center;
    .title {
      font-weight: bold;
      font-size: 28px;
    }
    .abstract {
      font-size: 20px;
      margin-top: 10px;
    }
    .date {
      font-size: 14px;
      color: #666666;
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }
}
</style>
