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
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      showNickname: false,
      nickname: '',
      showPsd: false,
      password: '',
      showGender: false,
      gender: 1
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
      // // 此时可以自行将文件上传至服务器
      // console.log(file)
      // // 1.创建异步对象
      // const xhr = new XMLHttpRequest()
      // // 2.设置请求行
      // xhr.open('post', 'http://localhost:3000/upload')
      // // 需要上传文件，文件的数据需要放到formData中，formData会将传进来的form表单中的数据一并获取，并转换成二进制的数据
      // const fd = new FormData()
      // // append可以追加数据一并发送给服务器
      // fd.append('file', file.file)
      // // 3.设置请求头，请求头携带token数据
      // xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
      // // 4.设置请求体
      // xhr.send(fd)
      // // 5.监视异步对象的状态
      // xhr.onload = function() {
      //   /* 等价于xhr.onreadystatechange=function(){
      //     if(xhr.readyState===4){

      //     }
      //   }
      //   */
      //   if (xhr.status === 200) {
      //     console.log(xhr.responseText)
      //   }
      // }
      const fd = new FormData()
      fd.append('file', file.file)
      const res = await this.$axios.post('/upload', fd)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // console.log(data.url)
        this.editUser({
          head_img: data.url
        })
      }
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
</style>
