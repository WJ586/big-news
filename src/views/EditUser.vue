<template>
  <div class="edit">
    <n-header>编辑资料</n-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL+info.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="edit-nav">
      <n-nav @click="editName">
        <template #title>昵称</template>
        <template #content>{{info.nickname}}</template>
      </n-nav>
      <n-nav @click="editPsd">
        <template #title>密码</template>
        <template #content>******</template>
      </n-nav>
      <n-nav @click="editGender">
        <template #title>性别</template>
        <template #content>{{info.gender?'男':'女'}}</template>
      </n-nav>
    </div>
    <!-- 修改昵称组件调用 -->
    <van-dialog v-model="showNickname" title="修改昵称" show-cancel-button @confirm="conName">
      <van-field v-model="nickname" placeholder="输入新昵称" />
    </van-dialog>
    <!-- 修改密码组件调用 -->
    <van-dialog v-model="showPsd" title="修改密码" show-cancel-button @confirm="conPsd">
      <van-field v-model="password" placeholder="输入新密码" />
    </van-dialog>
    <!-- 修改性别组件调用 -->
    <van-dialog v-model="showGender" title="修改性别" show-cancel-button @confirm="conGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <div class="mask" v-if="isShowmask">
      <van-button type="info" class="confirm" @click="conCrop">裁剪</van-button>
      <van-button type="info" class="cancel" @click="canCrop">取消</van-button>
      <VueCropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        autoCropWidth="150"
        autoCropHeight="150"
        :fixed="true"
        :fixedNumber="[1,1]"
        :centerBox="true"
      ></VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      info: {},
      showNickname: false,
      nickname: '',
      showPsd: false,
      password: '',
      showGender: false,
      gender: 1,
      isShowmask: false,
      img: ''
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
        // console.log(data)
      }
    },
    async editUser(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getUser()
      } else {
        this.$toast.fail(message)
      }
    },
    editName() {
      this.showNickname = true
      this.nickname = this.info.nickname
    },
    conName() {
      this.editUser({
        nickname: this.nickname
      })
    },
    editPsd() {
      this.showPsd = true
      this.password = this.info.password
    },
    conPsd() {
      this.editUser({
        password: this.password
      })
    },
    editGender() {
      this.showGender = true
      this.gender = this.info.gender
    },
    conGender() {
      this.editUser({
        gender: this.gender
      })
    },
    async afterRead(file) {
      this.isShowmask = 'true'
      this.img = file.content
      //  图片的格式和大小校验 gif|png|jpg 20k
      // console.log(file.file)
      // 是否超出范围
      // const isLimit = file.file.size / 1024 >= 20
      // if (isLimit) {
      //   this.$toast.fail('上传的图片不能超过20kb')
      //   return
      // }
      // // 限制图片的格式
      // const isGif = file.file.type === 'image/gif'
      // const isPng = file.file.type === 'image/png'
      // const isJpg = file.file.type === 'image/jpeg'
      // if (!(isGif || isPng || isJpg)) {
      //   this.$toast.fail('上传的图片只能是gif|png|jpeg类型')
      //   // return
      // }
      // const fd = new FormData()
      // fd.append('file', file.file)
      // const res = await this.$axios.post('/upload', fd)
      // // console.log(res)
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   // console.log(data.url)
      //   this.editUser({
      //     head_img: data.url
      //   })
      // }
    },
    conCrop() {
      this.$refs.cropper.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        // console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editUser({
            head_img: data.url
          })
        }
      })
      this.isShowmask = false
    },
    canCrop() {
      this.isShowmask = false
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  position: relative;
  text-align: center;
  img {
    width: 70px;
    height: 70px;
    border-radius: 35px;
    margin: 25px 0;
  }
  .van-uploader {
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translate(-50%);
    opacity: 0;
  }
}
.edit-nav {
  padding-left: 21px;
}
.van-cell {
  border: 1px solid #ccc;
}
/deep/ .van-dialog__content {
  padding: 2px 10px;
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  .confirm {
    float: left;
    z-index: 9999;
  }
  .cancel {
    float: right;
    z-index: 9999;
  }
}
</style>
