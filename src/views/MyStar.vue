<template>
  <div>
    <n-header>我的收藏</n-header>
    <n-post v-for="item in list" :key="item.id" :post="item"></n-post>
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
      this.list.forEach(item => {
        item.comment_length = item.comments.length
      })
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
