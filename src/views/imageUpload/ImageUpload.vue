<template>
  <div>
    <div class="up">
      <div class="title">支持拖拽</div>
      <div class="desc">Element UI自带上传组件</div>
      <el-upload
        class="upload-demo"
        drag
        action="api/upload"
        multiple
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <div class="title top">支持剪裁</div>
      <div class="desc">vue-image-crop-upload</div>
      <div id="upload">
        <el-button type="primary" class="btn" @click="toggleShow"
          >上传图片</el-button
        >
        <my-upload
          field="file"
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="show"
          :width="200"
          :height="200"
          url="api/upload"
          :params="params"
          :headers="headers"
          img-format="png"
        ></my-upload>
        <img :src="imgDataUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
export default {
  name: "ImageUpload",
  components: {
    "my-upload": myUpload
  },
  props: {},
  data() {
    return {
      show: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "" // the datebase64 url of created image
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    //复制成功
    cropSuccess(imgDataUrl, field) {
      console.log(field);
      this.imgDataUrl = imgDataUrl;
    },
    //上传成功
    cropUploadSuccess(jsonData, field) {
      console.log(jsonData, field, "成功");
      // this.imgDataUrl = jsonData.files.file;
    },
    //上传失败
    cropUploadFail(status, field) {
      console.log(status, field, "失败");
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
.up {
  background: white;
  margin: 15px;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 2px 2px 5px gray;
  .top {
    margin-top: 25px;
  }
  .title {
    font-size: 25px;
  }
  .desc {
    margin: 15px 0;
    padding: 20px;
    background: #f0f2f5;
  }
}
</style>
