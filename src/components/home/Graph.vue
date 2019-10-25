<template>
  <div class="graph">
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line";
export default {
  name: "Graph",
  components: {
    VeLine
  },
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

<style scoped lang="scss">
.graph {
  margin: 50px 1.5% 0 1.5%;
  background: white;
  border-radius: 3px;
  box-shadow: 2px 2px 10px gray;
  padding-top: 20px;
}
</style>
