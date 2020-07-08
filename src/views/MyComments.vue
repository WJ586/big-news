<template>
  <div>
    <n-header>我的跟帖</n-header>
    <!--
  上拉加载更多的列表组件
  finished-text:没有更多数据的提示
  finished：是一个布尔值，指定是否还有更多数据 默认为false 如果finished为true代表没有更多数据，下拉列表不会再触发load事件 发送ajax请求，发现数据真的没有了将finished值设定为true

  load事件：当滚动条滚动到底部，触发load事件 load事件会在初始化的时候就触发一次，可通过immediate-check进行关闭
  :immediate-check="false":页面一加载，不触发load事件
  通过offset配置距离底部多少的位置就触发，默认300
   loading：是一个布尔值，指定当前list是否在加载数据
   loading默认为false，代表load事件可以触发，一旦触发了load事件，loading会自动改成true
   loading为true就不会再触发load事件，等数据加载完成一定要loading改成false

    -->

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      offset="20"
    >
      <div class="item" v-for="item in list" :key="item.id">
        <p class="time">{{item.create_date|time("YYYY-MM-DD HH:mm")}}</p>
        <div class="reply" v-if="item.parent">
          <p class="nickname">回复：{{item.parent.user.nickname}}</p>
          <p class="response">{{item.parent.content}}</p>
        </div>
        <div class="comment">{{item.content}}</div>
        <p class="article one-txt-cut">{{item.post.title}}</p>
      </div>
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    async getComments() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
        // console.log(this.list)
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      this.pageIndex++
      this.getComments()
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  padding: 10px 15px;
  border-bottom: 1px solid #d7d7d7;
  .time {
    color: #aba1a1;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .reply {
    background-color: #e4e4e4;
    color: #939393;
    padding: 10px 15px;
    height: 80px;
    .nickname {
      font-size: 16px;
      margin-bottom: 10px;
    }
    .response {
      font-size: 18px;
    }
  }
  .comment {
    font-size: 18px;
    margin: 18px 0;
  }
  .article {
    font-size: 16px;
    color: #939393;
    padding-right: 30px;
  }
}
</style>
