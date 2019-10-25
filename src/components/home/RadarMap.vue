<template>
  <div>
    <ve-radar :data="chartData"></ve-radar>
  </div>
</template>

<script>
export default {
  name: "RadarMap",
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
        .req("api/radarChat")
        .then(res => {
          if (res.code === 0) {
            this.chartData = {
              columns: [
                "name",
                "sales",
                "ministration",
                "techology",
                "delelopmer",
                "marketing"
              ],
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
