<template>
  <div>
    <div class="top">
      <div
        @click="skip('unread')"
        class="title"
        :class="{ bg: page === 'unread' }"
      >
        未读消息<span v-if="unread.length">({{ unread.length }})</span>
      </div>
      <div @click="skip('read')" class="title" :class="{ bg: page === 'read' }">
        已读消息<span v-if="read.length">({{ read.length }})</span>
      </div>
      <div
        @click="skip('recycle')"
        class="title"
        :class="{ bg: page === 'recycle' }"
      >
        回收站<span v-if="recycle.length">({{ recycle.length }})</span>
      </div>
    </div>
    <div class="center">
      <div v-if="page === 'unread'" class="content">
        <div v-if="unread.length">
          <div v-for="(item, index) in unread" :key="index" class="desc">
            <div>{{ item.message }}</div>
            <div class="back">
              <div>{{ item.time }}</div>
              <el-button class="but" @click="READ(item, index)"
                >标为已读</el-button
              >
            </div>
          </div>
          <el-button
            type="primary"
            v-if="unread.length"
            class="all"
            @click="readAll"
            >全部标为已读</el-button
          >
        </div>
        <div v-else class="none">暂无未读信息</div>
      </div>
      <div v-if="page === 'read'" class="content">
        <div v-if="read.length">
          <div v-for="(item, index) in read" :key="index" class="desc">
            <div>{{ item.message }}</div>
            <div class="back">
              <div>{{ item.time }}</div>
              <el-button type="danger" class="but" @click="DELETER(item, index)"
                >删除</el-button
              >
            </div>
          </div>
          <el-button
            type="danger"
            v-if="read.length"
            class="all"
            @click="deleterAll"
            >删除全部</el-button
          >
        </div>
        <div v-else class="none">暂无已读信息</div>
      </div>
      <div v-if="page === 'recycle'" class="content">
        <div v-if="recycle.length">
          <div v-for="(item, index) in recycle" :key="index" class="desc">
            <div>{{ item.message }}</div>
            <div class="back">
              <div>{{ item.time }}</div>
              <el-button
                type="warning"
                class="but"
                @click="restore(item, index)"
                >还原</el-button
              >
            </div>
          </div>
          <el-button
            type="info"
            v-if="recycle.length"
            class="all"
            @click="restoreAll"
            >清空回收站</el-button
          >
        </div>
        <div v-else class="none">暂无垃圾信息</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LabelPage",
  components: {},
  props: {},
  data() {
    return {
      unread: [
        {
          message: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          time: "2019-10-26 20 ：00：00"
        },
        {
          message: "今晚12点整发大红包，先到先得",
          time: "2019-10-26 20 ：00：00"
        }
      ],
      read: [
        {
          message: "【系统通知】你的优惠券已过期",
          time: "2019-10-20 20 ：00：00"
        }
      ],
      recycle: [
        {
          message: "【系统通知】你的项目还剩8天提交，请你尽快完成",
          time: "2019-10-26 20 ：00：00"
        }
      ],
      page: "unread"
    };
  },
  methods: {
    skip(val) {
      this.page = val;
    },
    READ(item, index) {
      this.unread.splice(index, 1);
      this.read.push(item);
    },
    readAll() {
      this.read = this.read.concat(this.unread);
      this.unread = [];
    },
    DELETER(item, index) {
      this.read.splice(index, 1);
      this.recycle.push(item);
    },
    deleterAll() {
      this.recycle = this.recycle.concat(this.read);
      this.read = [];
    },
    restore(item, index) {
      this.recycle.splice(index, 1);
      this.read.push(item);
    },
    restoreAll() {
      this.recycle = [];
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
.top {
  display: flex;
  margin: 0 20px;
  border-bottom: 3px solid rgba(135, 134, 126, 0.35);
  .bg {
    border-bottom: 3px solid blue;
  }
  .title {
    margin-right: 25px;
    font-size: 18px;
    font-weight: bold;
    width: 100px;
    padding: 20px 0;
    position: relative;
    text-align: center;
    top: 3px;
    &:hover {
      border-bottom: 3px solid #5ab1ef;
    }
  }
}
.center {
  background: white;
  margin: 20px;
  .content {
    padding: 20px;
    .none {
      text-align: center;
      font-size: 18px;
    }
    .all {
      margin-top: 20px;
    }
    .desc {
      display: flex;
      justify-content: space-between;
      position: relative;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid rgba(182, 181, 174, 0.87);
      .back {
        display: flex;
        .but {
          margin: 16px 30px 6px 20px;
        }
      }
    }
  }
}
</style>
