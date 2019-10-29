<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="showData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Paging",
  components: {},
  props: {
    showData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentPage: 1 //初始页数
    };
  },
  methods: {
    //记录每页条数
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    //记录当前页数
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
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

<style scoped lang="scss"></style>
