<template>
  <div class="login">
    <n-header>登录</n-header>
    <n-logo></n-logo>
    <van-form @submit="onSubmit">
      <van-field v-model="user.username" placeholder="请输入用户名 / 手机密码" :rules="rules.username" />
      <van-field
        v-model="user.password"
        type="password"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <p>
      无账号？去
      <router-link to="/register">注册</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '要求3-11位数字',
            trigger: 'onChange',
            pattern: /^\d{3,11}$/
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
  created() {
    this.user.username = this.$route.params.username
    this.user.password = this.$route.params.password
  },
  methods: {
    async onSubmit(values) {
      const res = await this.$axios.post('/login', this.user)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
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
