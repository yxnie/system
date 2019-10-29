<template>
  <div class="form">
    <div class="chart">订单表:</div>
    <el-button @click="clearFilter" type="primary" class="top"
      >清除所有过滤器</el-button
    >
    <el-table ref="filterTable" :data="data" style="width: 100%">
      <el-table-column
        prop="num"
        label="Order_Num"
        align="center"
      ></el-table-column>
      <el-table-column
        label="price"
        align="center"
        prop="price"
        :sortable="true"
        :sort-method="sortPrice"
        width="160"
      >
        <template slot-scope="scope">
          <div class="price">
            <span class="symbol">￥</span>{{ scope.row.price }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="status"
        width="100"
        align="center"
        :filters="[
          { text: 'pending', value: 0 },
          { text: 'success', value: 1 }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            type="danger"
            v-if="scope.row.status === 0"
            disable-transitions
            >pending</el-tag
          >
          <el-tag
            type="success"
            v-if="scope.row.status === 1"
            disable-transitions
            >success</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ShoppingForm",
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
        .req("api/orderData")
        .then(res => {
          if (res.code === 0) {
            this.data = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    filterTag(value, row) {
      return row.status === value;
    },
    sortPrice(obj1, obj2) {
      let val1 = obj1.price;
      let val2 = obj2.price;
      function f(str) {
        let i = str.indexOf(",");
        let font = str.substring(0, i);
        let back = str.substring(i + 1);
        return font + back;
      }
      console.log(f(val1), 1);
      console.log(f(val2), 2);
      return f(val1) - f(val2);
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
.form {
  position: relative;
  .chart {
    position: absolute;
    top: 40px;
    font-size: 22px;
    font-weight: bold;
  }
  .top {
    position: relative;
    left: 75%;
  }
  .price {
    position: relative;
    .symbol {
      position: absolute;
      left: 20px;
    }
  }
}
</style>
