<template>
  <div>
    <div class="title">
      <div class="top">
        <div @click="checkAll" class="click">
          <div class="circle img" v-if="lock">
            <img src="../../assets/images/check.svg" alt="" class="img" />
          </div>
          <div class="circle img" v-else></div>
        </div>
        <div>Todo List</div>
      </div>
    </div>
    <div class="center">
      <div v-for="(item, index) in showData" :key="index" class="desc">
        <div @click="check(item)" class="click">
          <div class="circle" v-if="item.checked">
            <img src="../../assets/images/check.svg" alt="" class="img" />
          </div>
          <div class="circle" v-else></div>
        </div>
        <div>{{ item.name }}</div>
        <img
          src="../../assets/images/deleter.svg"
          alt=""
          @click="remove(item, index)"
          class="deleter"
        />
      </div>
    </div>
    <div class="foot">
      <div>{{ getActive }} items left</div>
      <div><el-button plain class="but" @click="All">All</el-button></div>
      <div @click="Active">Active</div>
      <div @click="Completed">Completed</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  components: {},
  props: {},
  data() {
    return {
      data: [],
      lock: false, //控制全部
      num: "", //用来控制全选反选的
      showData: "", //展示数据
      box: 1 //区分当前展示位置
    };
  },
  methods: {
    getData() {
      this.$axios
        .req("api/todoList")
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
    //单选
    check(val) {
      this.lock1 = false;
      this.lock2 = false;
      this.num = 0;
      val.checked = !val.checked;
      this.data.map(item => {
        //得到完成数
        if (item.checked) {
          this.num++;
        }
      });
      if (this.num === this.data.length) {
        this.lock = true;
      } else {
        this.lock = false;
      }
    },
    //全选
    checkAll() {
      this.lock = !this.lock;
      if (this.lock) {
        this.data.map(item => {
          item.checked = true;
        });
        if (this.box === 2) {
          this.Active();
        } else if (this.box === 3) {
          this.Completed();
        }
      }
      if (!this.lock) {
        this.data.map(item => {
          item.checked = false;
        });
        if (this.box === 2) {
          this.Active();
        } else if (this.box === 3) {
          this.Completed();
        }
      }
    },
    All() {
      this.showData = this.data;
      this.box = 1;
    },
    Active() {
      this.showData = this.data.filter(item => {
        return item.checked === false;
      });
      this.box = 2;
    },
    Completed() {
      this.showData = this.data.filter(item => {
        return item.checked === true;
      });
      this.box = 3;
    },
    remove(item, index) {
      if (this.box === 1) {
        this.data.splice(index, 1);
      } else if (this.box === 2) {
        this.data.splice(this.data.indexOf(item), 1);
        this.Active();
      } else {
        this.data.splice(this.data.indexOf(item), 1);
        this.Completed();
      }
    }
  },
  mounted() {
    this.getData();
  },
  created() {},
  filters: {},
  computed: {
    //未完成数
    getActive() {
      let num = 0;
      this.data.map(item => {
        if (!item.checked) {
          num++;
        }
      });
      return num;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.center {
  height: 480px;
}
.click {
  border-radius: 50%;
}
.title {
  height: 40px;
  border-bottom: 1px solid gray;
  margin-bottom: 12px;
  .top {
    display: flex;
    justify-content: space-between;
    padding: 8px 8% 0 8%;
    .img {
      margin-top: 0 !important;
    }
  }
}
.desc {
  display: flex;
  height: 40px;
  padding: 8px 10%;
  line-height: 40px;
  position: relative;
  .deleter {
    display: none;
    position: absolute;
    right: 10px;
    top: 20px;
  }
  &:hover .deleter {
    display: block;
  }
}
.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid gray;
  margin-right: 12px;
  margin-top: 9px;
  .img {
    display: block;
    padding: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }
}
.foot {
  margin: 10px 5% 0 5%;
  border-top: 1px solid gray;
  font-size: 8px;
  padding-top: 20px;
  padding-left: 6px;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  .but {
    padding: 7px 12px;
  }
}
</style>
