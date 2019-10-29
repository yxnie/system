<template>
  <div>
    <div class="all">
      <div class="top">
        <div class="title bg1">
          <i class="el-icon-check"></i>
          <div class="word">今日发布</div>
          <div class="data">{{ today }}</div>
        </div>
        <div class="title bg2">
          <i class="el-icon-tickets"></i>
          <div class="word">原创文章</div>
          <div class="data">{{ original }}</div>
        </div>
        <div class="title bg3">
          <i class="el-icon-bell"></i>
          <div class="word">新留言</div>
          <div class="data">0</div>
        </div>
        <div class="title bg4">
          <i class="el-icon-message"></i>
          <div class="word">新信息</div>
          <div class="data">0</div>
        </div>
      </div>
      <div class="chart">
        <div class="pie">
          <ve-pie :data="category"></ve-pie>
        </div>
        <div class="ring">
          <ve-ring :data="source" :settings="chartSettings"></ve-ring>
        </div>
      </div>
      <div>
        <ve-waterfall :data="date"></ve-waterfall>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Statistics",
  components: {},
  props: {},
  data() {
    this.chartSettings = {
      roseType: "radius"
    };
    return {
      data: [], //获取全部文章数据
      category: {}, //类目统计
      source: {}, //来源统计
      date: {} //时间统计
    };
  },
  methods: {
    //统计函数
    group(type) {
      let title = []; //类目数组
      let rows = []; //类目统计
      // 获取类目数组
      this.data.map(item => {
        title.push(item[type]);
      });
      //获取类目统计
      for (let i in title) {
        if (JSON.stringify(rows).indexOf(title[i]) < 0) {
          let obj = {};
          //给对象设置一个键名与键值都为变量的属性
          Object.defineProperty(obj, type, {
            enumerable: true,
            writable: true,
            value: title[i]
          });
          obj.number = 1;
          rows.push(obj);
        } else {
          rows.map(item => {
            if (item[type] === title[i]) {
              item.number++;
            }
          });
        }
      }
      return {
        columns: [type, "number"],
        rows: rows
      };
    },
    getData() {
      this.$axios
        .req("api/article/allArticle")
        .then(res => {
          if (res.code === 200) {
            this.data = res.data;
            this.data.map(item => {
              item.date = this.$dayjs(item.date).format("YYYY年MM月DD日");
            });
            this.category = this.group("category");
            this.source = this.group("source");
            this.date = this.group("date");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getData();
  },
  created() {},
  filters: {},
  computed: {
    today() {
      let num = 0;
      if (this.date.rows) {
        this.date.rows.map(item => {
          if (item.date === this.$dayjs().format("YYYY年MM月DD日")) {
            num = item.number;
          }
        });
      }
      return num;
    },
    original() {
      let num = 0;
      if (this.date.rows) {
        this.source.rows.map(item => {
          if (item.source === "原创") {
            num = item.number;
          }
        });
      }
      return num;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.all {
  margin: 20px;
}
.chart {
  display: flex;
  margin-top: 20px;
  .pie {
    flex: 1;
  }
  .ring {
    flex: 1;
  }
}
.top {
  color: white;
  display: flex;
  justify-content: space-between;
  .title {
    text-align: center;
    position: relative;
    flex: 1;
    padding: 10px;
    font-size: 25px;
    .word {
      font-size: 17px;
    }
    .data {
      margin-top: 10px;
      font-size: 17px;
    }
    i {
      position: absolute;
      right: 10%;
      top: 20px;
    }
  }
  .bg1 {
    background: #7ccabf;
  }
  .bg2 {
    background: #e88a87;
  }
  .bg3 {
    background: #8375a3;
  }
  .bg4 {
    background: #9fcec1;
  }
}
</style>
