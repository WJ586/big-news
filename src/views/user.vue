<template>
  <div class="user">
    <div class="user-header" @click="$router.push('/edit-user')">
      <div class="avatar">
        <img :src="$axios.defaults.baseURL+user.head_img" alt />
      </div>
      <div class="user-info">
        <p>
          <i class="iconfont iconxingbienv" v-if="!user.gender"></i>&nbsp;
          <i class="iconfont iconxingbienan" v-else></i>&nbsp;
          <span class="nickname">{{user.nickname}}</span>
        </p>
        <p class="time">{{user.create_date|time}}</p>
      </div>
      <i class="iconfont iconjiantou1"></i>
    </div>
    <div class="user-nav">
      <n-nav @click="$router.push('/myfollows')">
        <template v-slot:title>我的关注</template>
        <template #content>关注的用户</template>
      </n-nav>
      <n-nav @click="$router.push('/mycomments')">
        <template #title>我的跟帖</template>
        <template #content>跟帖/回复</template>
      </n-nav>
      <n-nav>
        <template #title>我的收藏</template>
        <template #content>文章/视频</template>
      </n-nav>
      <n-nav @click="$router.push('/edit-user')">
        <template #title>设置</template>
      </n-nav>
      <n-nav #title @click="logout">退出</n-nav>
    </div>
  </div>
</template>

<script>
export default {
  // beforeRouteEnter(to, from, next) {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     next()
  //   } else {
  //     this.$router.push('/login')
  //   }
  // },
  data() {
    return {
      user: {}
    }
  },
  async created() {
    // const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    // const res = await this.$axios.get(`/user/${userId}`, {
    //   headers: {
    //     Authorization: token
    //   }
    // })
    const res = await this.$axios.get(`/user/${userId}`)
    // const { statusCode, message, data } = res.data
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
      // console.log(this.user)
    }
    // if (statusCode === 401) {
    //   this.$toast.fail(message)
    //   this.$router.push('/login')
    //   localStorage.removeItem('token')
    //   localStorage.removeItem('userId')
    // }
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要提出吗？'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$toast.success('退出成功')
        this.$router.push('/login')
      } catch {
        this.$toast.fail('取消成功')
      }
      // .then(() => {
      //   localStorage.removeItem('token')
      //   localStorage.removeItem('userId')
      //   this.$toast.success('退出成功')
      //   this.$router.push('/login')
      // })
      // .catch(() => {
      //   this.$toast.fail('取消成功')
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .user-header {
    padding: 0 21px;
    display: flex;
    height: 104px;
    align-items: center;
    border-bottom: 3px solid #e4e4e4;
    .avatar {
      img {
        width: 58px;
        height: 58px;
        border-radius: 29px;
      }
    }
    .user-info {
      flex: 1;
      padding-left: 13px;
      .iconxingbienv {
        color: #ed52bd;
      }
      .iconxingbienan {
        color: #72b2e0;
      }
      .nickname {
        font-size: 16px;
      }
      .time {
        font-size: 14px;
        color: #c2b2ad;
      }
    }
  }
  .user-nav {
    padding-left: 21px;
  }
}
</style>
