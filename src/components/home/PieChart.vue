<template>
  <div>
    <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
  </div>
</template>

<script>
export default {
  name: "PieChart",
  components: {},
  props: {},
  data() {
    this.chartSettings = {
      roseType: "radius"
    };
    return {
      chartData: {}
    };
  },
  methods: {
    getData() {
      this.$axios
        .req("api/ringChat")
        .then(res => {
          if (res.code === 0) {
            this.chartData = {
              columns: ["name", "data"],
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
