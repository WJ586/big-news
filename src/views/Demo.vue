<template>
  <div class="cropper">
    <van-button type="info" @click="crop">裁剪</van-button>
    <VueCropper
      ref="cropper"
      img="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1691222104,1076052302&fm=26&gp=0.jpg"
      :autoCrop="true"
      :autoCropWidth="150"
      :autoCropHeight="150"
      :fixed="true"
      :fixedNumber="[1,1]"
      :canMove="false"
    ></VueCropper>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  methods: {
    crop() {
      // // 裁剪的是图片的base64
      // this.$refs.cropper.getCropData(data => {
      //   console.log(data)
      // })
      // 裁剪的是图片
      this.$refs.cropper.getCropBlob(async data => {
        // console.log(data)
        const fd = new FormData()
        fd.append('file', data)
        const res = await this.$axios.post('/upload', fd)
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cropper {
  position: fixed;
  width: 100%;
  height: 50%;
  z-index: 999;
  margin-top: 100px;
}
</style>
