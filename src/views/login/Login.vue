<template>
  <div class="form">
    <div class="login">
      <div class="top">欢迎来到小爱后台管理系统</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="ruleForm.username"
            clearable
            placeholder="请输入长度在 2 到 12 个字符的用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            show-password
            v-model="ruleForm.pass"
            autocomplete="off"
            clearable
            placeholder="请输入密码，长度在长度在 6 到 20 个字符之间"
          ></el-input>
        </el-form-item>
        <div class="code">
          <el-form-item label="验证码" prop="verificationCode">
            <el-input v-model="ruleForm.verificationCode" clearable></el-input>
          </el-form-item>
          <div v-html="code" @click="getCode" class="svg"></div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即登录</el-button
          >
          <el-button type="primary" @click="register" class="back"
            >立即注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      code: "",
      ruleForm: {
        username: "",
        pass: "",
        verificationCode: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          }
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //提交信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .req("api/user/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.pass,
              code: this.ruleForm.verificationCode
            })
            .then(res => {
              if (res.code === 200) {
                //登录成功弹框
                this.$message({
                  message: `用户${this.ruleForm.username}登陆成功`,
                  type: "success"
                });
                this.$store.state.username = this.ruleForm.username; //用户名存入store
                this.$store.state.time = res.data[0].date; //登录时间存入store
                localStorage.setItem("name", JSON.stringify({ user: res })); //用户存入localstorage
                this.$router.push("/home"); //跳转回主页
              } else {
                // 登录失败
                this.$message.error(res.message);
                console.log(res);
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
    getCode() {
      this.$axios
        .req("/api/captcha")
        .then(res => {
          this.code = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    register() {
      this.$router.push("/register");
    }
  },
  mounted() {
    this.getCode();
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
  display: flex;
  justify-content: center;
  margin-top: 160px;
  .login {
    width: 480px;
    height: 326px;
    border: 1px solid gray;
    border-radius: 3px;
    position: relative;
    .top {
      text-align: center;
      padding: 15px 0;
      border-bottom: 1px solid gray;
      background: #9092a8;
    }
    .demo-ruleForm {
      width: 400px;
      padding-top: 15px;
      .back {
        margin-left: 103px;
      }
      .code {
        display: flex;
        .svg {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
