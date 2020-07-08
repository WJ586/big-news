<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push('/search')">
        <span class="iconfont iconsearch"></span>&nbsp;
        <span class="n-search">搜索新闻</span>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <div class="nav">
      <van-tabs v-model="active" sticky animated swipeable color=" #d62312">
        <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
          <n-post v-for="post in articleList" :key="post.id" :post="post"></n-post>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: [],
      active: 0,
      pageIndex: 1,
      pageSize: 10,
      articleList: []
    }
  },
  created() {
    this.getTab()
  },
  methods: {
    async getTab() {
      const res = await this.$axios.get('/category')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // console.log(this.tabList)
        this.getArticleList(this.tabList[0].id)
      }
    },
    async getArticleList(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.articleList = data
        console.log(this.articleList)
      }
    }
  },
  watch: {
    active(value) {
      // console.log(value)
      this.getArticleList(this.tabList[value].id)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .header {
    display: flex;
    padding: 10px 15px;
    height: 62px;
    align-items: center;
    background-color: #d62312;
    .logo {
      .iconnew {
        font-size: 70px;
        color: #ffffff;
      }
    }
    .user {
      width: 60px;
      .iconwode {
        float: right;
        font-size: 30px;
        color: #ffffff;
      }
    }

    .search {
      flex: 1;
      background-color: rgba(255, 255, 255, 0.5);
      height: 42px;
      line-height: 42px;
      border-radius: 21px;
      text-align: center;
      color: #ffffff;
      .n-search {
        font-size: 14px;
      }
    }
  }
}
/deep/.van-tabs__nav {
  background-color: #e4e4e4;
}
</style>
