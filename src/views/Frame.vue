<template>
  <div class="all">
    <top class="top"></top>
    <navMenu class="navMenu"></navMenu>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import top from "../components/top/Top";
import navMenu from "../components/navMenu/NavMenu";
export default {
  name: "Frame",
  components: {
    top,
    navMenu
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
.all {
  position: relative;
  display: flex;
  .top {
    position: fixed;
  }
  .navMenu {
    margin-top: 60px;
    width: 12.5%;
  }
  .main {
    margin-top: 60px;
    width: 87.5%;
    margin-left: 12.5%;
  }
}
</style>
