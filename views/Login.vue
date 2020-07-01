<template>
  <div class="login">
    <news-header>登录</news-header>
    <logo></logo>
    <van-form @submit="onSubmit">
      <van-field v-model="user.username" placeholder="用户名 / 手机密码" :rules="rules.username" />
      <van-field v-model="user.password" type="password" placeholder="密码" :rules="rules.password" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
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
            message: '用户名只能是5-11位数字',
            pattern: /^\d{5,11}$/,
            trigger: 'onChange'
          }
        ],
        password: [
          {
            required: true,
            message: '密码只能是3-9位',
            pattern: /^\w{3,9}$/,
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/login', this.user)
      // console.log(res)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        localStorage.setItem('token', data.token)
        this.$router.push('/')
      } else {
        this.$toast.fail(message)
      }
    }
  },
  created() {
    console.log(this.$route.params)
    this.user.username = this.$route.params.username
    this.user.password = this.$route.params.password
  }
}
</script>
<style lang="less">
.login {
  .van-cell {
    background-color: #f2f2f2;
    border-bottom: 1px solid #8a8a8a;
    .van-field__body {
      input {
        font-size: 18px;
        height: 40px;
      }
    }
  }
  .van-button {
    background-color: #cc3300;
    border: 0.02778rem solid #cc3300;
    margin-top: 40px;
    font-size: 16px;
  }
  p {
    text-align: right;
    font-size: 12px;
  }
}
</style>
