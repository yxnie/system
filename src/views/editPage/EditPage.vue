<template>
  <div>
    <div class="all">
      <div class="title">
        <el-button type="danger" @click="skip">返回</el-button>
        <el-button type="primary" @click="redact('ruleForm')">发布</el-button>
      </div>
      <div class="from">
        <el-form
          :model="data"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div>
            <el-form-item label="文章标题" prop="title" required>
              <el-input v-model="data.title"></el-input>
            </el-form-item>
            <el-form-item label="文章摘要" prop="abstract" required>
              <el-input v-model="data.abstract"></el-input>
            </el-form-item>
          </div>
          <div class="center">
            <div>
              <el-form-item label="作者" prop="author" required>
                <el-input v-model="data.author"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="类目" prop="category" required>
                <el-select v-model="data.category" placeholder="请选择类目">
                  <el-option label="Vue" value="Vue"></el-option>
                  <el-option label="React" value="React"></el-option>
                  <el-option label="Node.js" value="Node.js"></el-option>
                  <el-option label="性能优化" value="性能优化"></el-option>
                  <el-option label="JavaScript" value="JavaScript"></el-option>
                  <el-option label="小程序" value="小程序"></el-option>
                  <el-option label="工具类" value="工具类"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="来源" prop="source" required>
                <el-select v-model="data.source" placeholder="请选择来源">
                  <el-option label="原创" value="原创"></el-option>
                  <el-option label="转载" value="转载"></el-option>
                  <el-option label="与他人合作" value="与他人合作"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="重要性" prop="star" required>
                <el-select v-model="data.star" placeholder="请选择重要性">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                  <el-option label="3" value="3"></el-option>
                  <el-option label="4" value="4"></el-option>
                  <el-option label="5" value="5"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item prop="date" label="发布时间">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期时间"
                  v-model="data.date"
                  style="width: 100%;"
                  :picker-options="pickerOptions"
                  align="right"
                ></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div>
        <mavon-editor v-model="data.text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPage",
  components: {},
  props: {},
  data() {
    return {
      id: "",
      data: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    getOne() {
      this.$axios
        .req("/api/article/article", { _id: this.id })
        .then(res => {
          if (res.code === 200) {
            this.data = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    redact(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.data.text.length > 0) {
          if (this.data.date === "") {
            this.data.date = this.$dayjs().format("YYYY-MM-DD hh:mm:ss");
          }
          console.log(this.data.date);
          this.$axios
            .req("/api/article/update", {
              id: this.id,
              title: this.data.title,
              abstract: this.data.abstract,
              author: this.data.author,
              category: this.data.category,
              source: this.data.source,
              star: this.data.star,
              text: this.data.text,
              date: this.data.date
            })
            .then(res => {
              if (res.success) {
                //文章发布成功弹框
                this.$message({
                  message: "文章发布成功",
                  type: "success"
                });
                console.log(res);
                this.$router.push("/published");
              } else {
                // 文章发布失败
                this.$message.error("提交失败");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    skip() {
      this.$router.push("/published");
    }
  },
  mounted() {
    this.id = this.$route.query._id;
    this.getOne();
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
.title {
  height: 40px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 5px;
  position: relative;
  border-radius: 2px;
}
.from {
  margin-top: 30px;
  .center {
    display: flex;
  }
}
</style>
