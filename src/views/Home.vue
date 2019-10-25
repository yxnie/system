<template>
  <div class="home">
    <div><top></top></div>
    <div><graph></graph></div>
    <div class="chart">
      <radarMap class="size"></radarMap><pieChart class="size"></pieChart
      ><barGraph class="size"></barGraph>
    </div>
    <div class="chart">
      <shoppingForm class="size shoppingForm"></shoppingForm><todo class="size todo"></todo><progressBar class="size progressBar"></progressBar>
    </div>
  </div>
</template>

<script>
import top from "../components/home/Top";
import graph from "../components/home/Graph";
import radarMap from "../components/home/RadarMap";
import pieChart from "../components/home/PieChart";
import barGraph from "../components/home/BarGraph";
import shoppingForm from "../components/home/ShoppingForm";
import todo from "../components/home/Todo";
import progressBar from "../components/home/ProgressBar";
export default {
  name: "Home",
  components: {
    top,
    graph,
    radarMap,
    pieChart,
    barGraph,
    shoppingForm,
    todo,
    progressBar
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.chart {
  display: flex;
  justify-content: space-between;
  padding: 0 2%;
  margin-top: 30px;
  .size {
    width: 30%;
    background: white;
    padding: 25px 1% 0 1%;
    border-radius: 3px;
    box-shadow: 2px 2px 5px gray;
  }
  .shoppingForm {
    width: 48% !important;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }
  .todo {
    width: 21% !important;
    padding: 10px 0 20px 0;
    margin-bottom: 30px;
  }
  .progressBar {
    width: 21% !important;
    padding-bottom: 20px;
    margin-bottom: 30px;
  }
}
</style>
