<template>
  <div class="form">
    <div class="login">
      <div class="top">欢迎来到小爱后台管理系统</div>
      <div class="user size">
        *用户名不能存在中文，且长度应在2到12个字符以内。
      </div>
      <div class="pass size">
        *密码长度应在6到20个字符之间，且尽量包含大写字母小写字母以及特殊字符。
      </div>
      <div class="length size">
        密码分数: {{ score }}
        <div
          class="score"
          :style="{ width: `${score}px` }"
          :class="{ bg1: score > 30, bg2: score > 60, bg3: score > 80 }"
        ></div>
      </div>
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
            placeholder="请输入用户名"
            @input="user"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            show-password
            v-model="ruleForm.pass"
            autocomplete="off"
            clearable
            placeholder="请输入密码"
            @input="strong"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            show-password
            v-model="ruleForm.checkPass"
            autocomplete="off"
            clearable
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即注册</el-button
          >
          <el-button type="primary" @click="login('ruleForm')" class="back"
            >返回登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},
  props: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      score: "",
      ruleForm: {
        username: "",
        pass: "",
        checkPass: ""
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
          },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
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
            .req("api/user/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.pass
            })
            .then(res => {
              if (res.code === 200) {
                //登录成功弹框
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.$store.state.username = this.ruleForm.username; //用户名存入store
                localStorage.setItem(
                  "user",
                  JSON.stringify({ user: this.ruleForm.username })
                ); //用户名存入localstorage
                this.$router.push("/home"); //跳转回主页
              } else if (res.code === 1) {
                // 登录失败
                this.$message.error(res.message);
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
    login() {
      this.$router.push("/login");
    },
    AboutLetter() {
      let big = 0,
        small = 0;
      for (let i = 0; i < this.ruleForm.pass.length; ++i) {
        if (this.ruleForm.pass[i] >= "a" && this.ruleForm.pass[i] <= "z")
          ++small;
        else if (this.ruleForm.pass[i] >= "A" && this.ruleForm.pass[i] <= "Z")
          ++big;
      }
      if (small + big == 0) return 0;
      else if (small == length || big == length) return 10;
      else if (small > 0 && big > 0) return 20;
      return 0;
    },
    NumOfNumber() {
      let count = 0;
      for (let i = 0; i < this.ruleForm.pass.length; ++i) {
        if (this.ruleForm.pass[i] >= "0" && this.ruleForm.pass[i] <= "9")
          ++count;
      }
      if (0 == count) return 0;
      else if (1 == count) return 10;
      else return 20;
    },
    NumOfSymbol() {
      let count = 0;
      for (let i = 0; i < this.ruleForm.pass.length; ++i) {
        //不是数字也不是字母的话就是符号了
        if (
          !(this.ruleForm.pass[i] >= "0" && this.ruleForm.pass[i] <= "9") &&
          !(this.ruleForm.pass[i] >= "a" && this.ruleForm.pass[i] <= "z") &&
          !(this.ruleForm.pass[i] >= "A" && this.ruleForm.pass[i] <= "Z")
        )
          ++count;
      }
      if (0 == count) return 0;
      else if (1 == count) return 10;
      else return 25;
    },
    strong() {
      let sum1 = 0,
        sum2 = 0,
        sum3 = 0,
        sum4 = 0,
        sum5 = 0;
      if (this.ruleForm.pass.length <= 6) sum1 = 0;
      else if (this.ruleForm.pass.length <= 10) sum1 = 5;
      else if (this.ruleForm.pass.length <= 15) sum1 = 10;
      else sum1 = 25;
      sum2 = this.AboutLetter();
      sum3 = this.NumOfNumber();
      sum4 = this.NumOfSymbol();
      if (sum2 > 0 && sum3 > 0) {
        if (sum4 > 0) {
          if (20 == sum2) sum5 = 5;
          else sum5 = 3;
        } else sum5 = 2;
      }
      this.score = sum1 + sum2 + sum3 + sum4 + sum5;
    },
    user() {
      this.ruleForm.username = this.ruleForm.username.replace(
        /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g,
        ""
      );
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

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: center;
  margin-top: 200px;
  .login {
    width: 600px;
    height: 326px;
    border: 1px solid gray;
    border-radius: 3px;
    position: relative;
    .length {
      display: flex;
      line-height: 15px;
      margin-top: 153px;
      .score {
        background: red;
        height: 15px;
        margin-left: 10px;
      }
      .bg1 {
        background: orangered;
      }
      .bg2 {
        background: yellow;
      }
      .bg3 {
        background: green;
      }
    }
    .size {
      font-size: 10px;
      color: gray;
      position: absolute;
      left: 410px;
    }
    .user {
      margin-top: 20px;
    }
    .pass {
      margin-top: 80px;
    }
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
    }
  }
}
</style>
