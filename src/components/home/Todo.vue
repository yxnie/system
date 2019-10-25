<template>
  <div>
    <div class="title">
      <div class="top">
        <div @click="checkAll" class="click">
          <div class="circle img" v-if="lock">
            <img src="../../assets/images/check.svg" alt="" />
          </div>
          <div class="circle img" v-else></div>
        </div>
        <div>Todo List</div>
      </div>
    </div>
    <div v-for="(item, index) in data" :key="index" class="desc">
      <div @click="check(item)" class="click">
        <div class="circle" v-if="item.checked">
          <img src="../../assets/images/check.svg" alt="" />
        </div>
        <div class="circle" v-else></div>
      </div>
      <div>{{ item.name }}</div>
    </div>
    <div class="foot">
      <div>{{ getActive }} items left</div>
      <div><el-button plain class="but">All</el-button></div>
      <div>Active</div>
      <div>Completed</div>
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
      num: ""
    };
  },
  methods: {
    getData() {
      this.$axios
        .req("api/todoList")
        .then(res => {
          if (res.code === 0) {
            this.data = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
    checkAll() {
      this.lock = !this.lock;
      if (this.lock) {
        this.data.map(item => {
          item.checked = true;
        });
      }
      if (!this.lock) {
        this.data.map(item => {
          item.checked = false;
        });
      }
    }
  },
  mounted() {
    this.getData();
  },
  created() {},
  filters: {},
  computed: {
    //已完成数
    getActive() {
      let num = 0;
      this.data.map(item => {
        if (item.checked) {
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
    padding: 8px 5% 0 5%;
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
}
.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid gray;
  margin-right: 20px;
  margin-top: 9px;
  img {
    display: block;
    padding: 2px;
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
