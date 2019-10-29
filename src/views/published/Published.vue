<template>
  <div>
    <div class="all">
      <el-table
        :data="data.slice(pages * (pagesNum - 1), pages * pagesNum)"
        style="width: 100%"
        border
        stripe
      >
        <el-table-column type="index" align="center"> </el-table-column>
        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="author" label="作者" align="center">
        </el-table-column>
        <el-table-column label="类目" align="center">
          <template slot-scope="scope">
            <div>
              <div v-if="scope.row.category === 'Vue'">
                <el-button type="success">{{ scope.row.category }}</el-button>
              </div>
              <div v-if="scope.row.category === 'React'">
                <el-button type="info">{{ scope.row.category }}</el-button>
              </div>
              <div v-if="scope.row.category === 'Node.js'">
                <el-button type="primary" plain>{{
                  scope.row.category
                }}</el-button>
              </div>
              <div v-if="scope.row.category === '性能优化'">
                <el-button type="success" plain>{{
                  scope.row.category
                }}</el-button>
              </div>
              <div v-if="scope.row.category === 'JavaScript'">
                <el-button type="info" plain>{{
                  scope.row.category
                }}</el-button>
              </div>
              <div v-if="scope.row.category === '小程序'">
                <el-button type="warning" plain>{{
                  scope.row.category
                }}</el-button>
              </div>
              <div v-if="scope.row.category === '工具类'">
                <el-button type="danger" plain>{{
                  scope.row.category
                }}</el-button>
              </div>
              <div v-if="scope.row.category === '其他'">
                <el-button plain>{{ scope.row.category }}</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源" align="center">
        </el-table-column>
        <el-table-column label="重要性" align="center">
          <template slot-scope="scope">
            <div>
              <el-rate
                v-model="scope.row.num"
                disabled
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center">
          <template slot-scope="scope">
            <div>
              {{ $dayjs(scope.row.date).format("YYYY年MM月DD日hh时mm分ss秒") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              type="primary"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              @click="handleLook(scope.$index, scope.row)"
              type="success"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <paging
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :data="data"
      ></paging>
    </div>
  </div>
</template>

<script>
import paging from "../../components/published/Paging";
export default {
  name: "Published",
  components: {
    paging
  },
  props: {},
  data() {
    return {
      data: [],
      pages: 10, //每页条数
      pagesNum: 1 //页数
    };
  },
  methods: {
    getData() {
      this.$axios
        .req("api/article/allArticle")
        .then(res => {
          if (res.code === 200) {
            this.data = res.data;
            this.data.map(item => {
              item.num = Number(item.star);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //编辑
    handleEdit(index, row) {
      console.log(index);
      this.$router.push({ name: "editPage", query: { _id: row._id } });
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .req("api/article/delete", { _id: row._id })
            .then(res => {
              if (res.code === 200) {
                console.log(res);
                this.getData();
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查看
    handleLook(index, row) {
      console.log(index);
      this.$router.push({ name: "look", query: { _id: row._id } });
    },
    //接收当前每页条数
    handleSizeChange(val) {
      this.pages = val;
    },
    //接收当前页数
    handleCurrentChange(val) {
      this.pagesNum = val;
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
.all {
  margin: 20px;
}
</style>
