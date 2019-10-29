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
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
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
    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible" center>
      <div class="alter">
        名称：<input type="text" class="name" :value="row.NAME" ref="name" />
      </div>
      <div class="alter">
        原价：<input
          type="text"
          class="name"
          :value="row.ORI_PRICE"
          ref="orl"
        />
      </div>
      <div class="alter">
        现价：<input
          type="text"
          class="name"
          :value="row.PRESENT_PRICE"
          ref="present"
        />
      </div>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="alter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import paging from "../../components/table/Paging";
export default {
  name: "Table",
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
      dialogFormVisible: false, //控制对话框开关
      row: {} //接收编辑数据
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
    },
    //编辑
    handleEdit(index, row) {
      console.log(index);
      this.row = row;
      this.dialogFormVisible = true;
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
      this.data.splice(index, 1);
    },
    //修改数据
    alter() {
      this.row.NAME = this.$refs.name.value;
      this.row.ORI_PRICE = this.$refs.orl.value;
      this.row.PRESENT_PRICE = this.$refs.present.value;
      this.dialogFormVisible = false;
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
  margin: 5px 15px 25px 15px;
}
.alter {
  margin: 20px;
  font-size: 20px;
  font-weight: bold;
  .name {
    width: 450px;
    height: 30px;
    font-size: 16px;
    padding-left: 10px;
  }
}
</style>
