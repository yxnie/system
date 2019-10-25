<template>
  <div class="top">
    <div class="box">
      <img src="../../assets/images/people.svg" alt="" />
      <div class="word">
        <div class="title">new visit</div>
        <countTo
          :startVal="0"
          :endVal="data.visits"
          :duration="1500"
          class="desc"
        ></countTo>
      </div>
    </div>
    <div class="box">
      <img src="../../assets/images/message.svg" alt="" />
      <div class="word">
        <div class="title">messages</div>
        <countTo
          :startVal="0"
          :endVal="data.messages"
          :duration="1500"
          class="desc"
        ></countTo>
      </div>
    </div>
    <div class="box">
      <img src="../../assets/images/money.svg" alt="" />
      <div class="word">
        <div class="title">purchases</div>
        <countTo
          :startVal="0"
          :endVal="data.purchases"
          :duration="1500"
          class="desc"
        ></countTo>
      </div>
    </div>
    <div class="box">
      <img src="../../assets/images/shopping.svg" alt="" />
      <div class="word">
        <div class="title">shopping</div>
        <countTo
          :startVal="0"
          :endVal="data.shopping"
          :duration="1500"
          class="desc"
        ></countTo>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  name: "Top",
  components: {
    countTo
  },
  props: {},
  data() {
    return {
      data: ""
    };
  },
  methods: {
    getData() {
      this.$axios
        .req("api/homeData")
        .then(res => {
          if (res.code === 0) {
            this.data = res.data;
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
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.top {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  .box {
    width: 22.5%;
    display: flex;
    background: white;
    justify-content: space-around;
    height: 75px;
    padding-top: 30px;
    border-radius: 3px;
    box-shadow: 2px 2px 10px gray;
    .word {
      .title {
        color: #8f8f8f;
        margin-bottom: 10px;
      }
      .desc {
        font-size: 19px;
        color: #666666;
      }
    }
    img {
      display: block;
      width: 55px;
      height: 45px;
    }
  }
}
</style>
