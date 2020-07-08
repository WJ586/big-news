<template>
  <div>
    <n-header>我的收藏</n-header>
    <div class="item" v-for="item in list" :key="item.id">
      <div class="content">
        <div class="title">{{item.title}}</div>
        <div class="footer">
          <span class="name">{{item.user.nickname}}</span>
          <span>{{item.comments.length}}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="$url(item.cover[0].url)" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    }
  },
  async created() {
    const res = await this.$axios.get('/user_star')
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.list = data
      console.log(this.list)
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #e4e4e4;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 20px;
    }
    .footer {
      font-size: 16px;
      color: #868686;
      margin-bottom: 10px;
      .name {
        margin-right: 15px;
      }
    }
  }
  img {
    width: 150px;
    height: 80px;
    object-fit: cover;
  }
}
</style>
