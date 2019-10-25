<template>
  <div>
    <ve-histogram :data="chartData"></ve-histogram>
  </div>
</template>

<script>
export default {
  name: "BarGraph",
  components: {},
  props: {},
  data() {
    return {
      chartData: {}
    };
  },
  methods: {
    getData() {
      this.$axios
        .req("api/homeChat")
        .then(res => {
          if (res.code === 0) {
            this.chartData = {
              columns: ["date", "expected", "actual"],
              rows: res.data
            };
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

<style scoped lang="scss"></style>
