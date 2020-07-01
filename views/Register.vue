<template>
  <div class="register">
    <news-header>注册</news-header>
    <logo></logo>
    <van-form @submit="onSubmit">
      <van-field v-model="user.username" placeholder="用户名 / 手机密码" :rules="rules.username" />
      <van-field v-model="user.nickname" placeholder="昵称" :rules="rules.nickname" />
      <van-field v-model="user.password" type="password" placeholder="密码" :rules="rules.password" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <p>
      已有账号，去
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
        password: '',
        nickname: ''
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
        nickname: [
          {
            required: true,
            message: '用户名只能是3-5个汉字',
            pattern: /^\w{3,9}$/,
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
      const res = await this.$axios.post('/register', this.user)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: {
            username: this.user.username,
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
<style lang="less">
.register {
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
