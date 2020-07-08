<template>
  <div class="register">
    <n-header></n-header>
    <n-logo></n-logo>
    <van-form @submit="onSubmit">
      <van-field v-model="user.username" placeholder="请输入用户名" :rules="rules.username" />
      <van-field v-model="user.nickname" placeholder="请输入昵称" :rules="rules.nickname" />
      <van-field
        v-model="user.password"
        type="password"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <p>
      有账号？去
      <router-link to="/login">登录</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '要求3~5个数字',
            trigger: 'onChange',
            pattern: /^\d{3,5}$/
          }
        ],
        nickname: [
          {
            required: true,
            message: '请填写昵称',
            trigger: 'onChange',
            pattern: /^[a-zA-Z\u4e00-\u9fa5]+$/
          }
        ],
        password: [
          {
            required: true,
            message: '要求3-11位数字',
            trigger: 'onChange',
            pattern: /^\d{3,11}$/
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit(values) {
      const res = await this.$axios.post('/register', this.user)
      const { statusCode, message } = res.data

      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: {
            username: this.user.username,
            nickname: this.user.nickname,
            password: this.user.password
          }
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  padding: 0 21px;
}
.van-cell {
  background-color: #f2f2f2;
}
.van-button {
  background-color: #cc3300;
  border: 1px solid #cc3300;
  margin-top: 25px;
}
p {
  text-align: right;
  font-size: 14px;
}
</style>
