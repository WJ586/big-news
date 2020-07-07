<template>
  <div class="myfollows">
    <n-header>我的关注</n-header>
    <div class="follows" v-for="item in list" :key="item.id">
      <div class="avatar">
        <img :src="$axios.defaults.baseURL+item.head_img" alt />
      </div>
      <div class="content">
        <p class="title">{{item.nickname}}</p>
        <span class="time">{{item.create_date|time}}</span>
      </div>
      <div class="cancel" @click="cancel(item.id)">
        <button>取消关注</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$axios.get('/user_follows')
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        // console.log(this.list)
      }
    },
    async cancel(id) {
      // console.log(id)
      // this.$axios.get(`/user_unfollow/${id}`)
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要取消关注吗'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        if (res.data.statusCode === 200) {
          this.$toast.success('取关成功')
          this.getList()
        }
      } catch {
        this.$toast.fail('取消成功')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.follows {
  height: 100px;
  display: flex;
  border-bottom: 1px solid #d7d7d7;
  padding: 5px 10px;
  align-items: center;
  .avatar {
    padding-right: 10px;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
  }
  .content {
    flex: 1;
    .title {
      font-size: 18px;
    }
    .time {
      font-size: 16px;
      color: #928f95;
    }
  }
  .cancel {
    button {
      width: 100px;
      height: 40px;
      font-size: 14px;
      border-radius: 20px;
      background-color: #e1e1e1;
      border: 1px solid #e1e1e1;
    }
  }
}
</style>
