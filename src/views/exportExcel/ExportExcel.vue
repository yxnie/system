<template>
  <div>
    <input
      type="text"
      class="input"
      placeholder="请输入你想搜素的商品名称"
      @input="search"
      v-model="name"
    />
    <div class="table">
      <el-table
        :data="showData.slice(pages * (pagesNum - 1), pages * pagesNum)"
        style="width: 100%"
      >
        <el-table-column prop="NAME" label="名称" align="center" width="400">
        </el-table-column>
        <el-table-column
          prop="GOODS_SERIAL_NUMBER"
          label="商品编号"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="ORI_PRICE" label="原价" align="center">
        </el-table-column>
        <el-table-column prop="PRESENT_PRICE" label="现价" align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <paging
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :showData="showData"
      ></paging>
    </div>
    <div class="operation">
      <el-button type="primary">
        <download-excel
          :data="showData.slice(pages * (pagesNum - 1), pages * pagesNum)"
          :fields = "json_fields"
          worksheet="My Worksheet"
          name="filename.xls"
          type="xls"
        >
          导出当前xls
        </download-excel>
      </el-button>
      <el-button type="primary" class="csv">
        <download-excel
          :data="data"
          :fields = "json_fields"
          worksheet="My Worksheet"
          name="filename.xls"
          type="xls"
        >
          导出全部xls
        </download-excel>
      </el-button>
      <el-button type="danger" class="csv">
        <download-excel
          :data="showData.slice(pages * (pagesNum - 1), pages * pagesNum)"
          :fields = "json_fields"
          worksheet="My Worksheet"
          name="filename.xls"
          type="csv"
        >
          导出当前csv
        </download-excel>
      </el-button>
      <el-button type="danger" class="csv">
        <download-excel
          :data="data"
          :fields = "json_fields"
          worksheet="My Worksheet"
          name="filename.xls"
          type="csv"
        >
          导出全部csv
        </download-excel>
      </el-button>
    </div>
  </div>
</template>

<script>
import paging from "../../components/exportExcel/Paging";
export default {
  name: "ExportExcel",
  components: {
    paging
  },
  props: {},
  data() {
    return {
      data: [], //接收数据
      pages: 10, //每页条数
      pagesNum: 1, //页数
      name: "", //输入框的值
      showData: [], //展示数据
      json_fields: {
        "名称":"NAME",
        "商品编号" :"GOODS_SERIAL_NUMBER",
        "原价" :"ORI_PRICE",
        "现价" :"PRESENT_PRICE",
      }
    };
  },
  methods: {
    getData() {
      this.$axios
        .req("api/tableData")
        .then(res => {
          if (res.code === 0) {
            this.data = res.data;
            this.showData = this.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //接收当前每页条数
    handleSizeChange(val) {
      this.pages = val;
    },
    //接收当前页数
    handleCurrentChange(val) {
      this.pagesNum = val;
    },
    //搜素商品
    search() {
      this.pagesNum = 1; //搜素时自动回到第一页，以防止用户在其他页开始搜素导致数据过少时数据不完整的bug
      if (this.name !== "") {
        this.showData = this.data.filter(item => {
          return item.NAME.indexOf(this.name) >= 0;
        });
      } else {
        this.showData = this.data;
      }
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
.input {
  outline: none;
  width: 300px;
  height: 35px;
  margin: 15px 15px 5px 15px;
}
.table {
  background: white;
  margin: 15px;
}
.foot {
  margin: 5px 15px 15px 15px;
}
.operation {
  margin: 5px 15px 25px 15px;
  display: flex;
  justify-content: center;
  .csv {
    margin-left: 40px;
  }
}
</style>
