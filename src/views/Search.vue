<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconsearch"></span>
        <input
          type="text"
          placeholder="请输入搜索的关键字"
          @input="commend"
          v-model="keyword"
          @keyup.enter="lisou"
          class="one-txt-cut"
        />
      </div>
      <div class="right" @click="lisou">搜索</div>
    </div>
    <div class="no-submit" v-if="commendList.length>0">
      <div
        class="li one-txt-cut"
        v-for="item in commendList"
        :key="item.id"
        @click="recordS(item.title)"
      >
        {{item.title}}
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <div class="searched" v-else-if="lisouList.length>0">
      <n-post v-for="post in lisouList" :key="post.id" :post="post"></n-post>
    </div>
    <div class="no-search" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <div class="items">
          <div
            class="item one-txt-cut"
            v-for="(item,index) in historyList"
            :key="index"
            @click="recordS(item)"
          >{{item}}</div>
        </div>
      </div>
      <div class="hots">
        <h3>热门搜索</h3>
        <div class="items">
          <div class="item" v-for="item in hot" :key="item" @click="recordS(item)">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      keyword: '',
      commendList: [],
      lisouList: [],
      historyList: [],
      hot: ['123', '关晓彤', '阿信', '外语']
    }
  },
  created() {
    this.historyList = JSON.parse(localStorage.getItem('historyList')) || []
  },
  methods: {
    commend: _.debounce(async function() {
      if (!this.keyword) {
        return
      }
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commendList = data
        console.log(this.commendList)
      }
    }, 500),
    back() {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    },
    async lisou() {
      if (!this.keyword) {
        this.$toast('关键词不能为空')
        return
      }
      console.log(123)
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.lisouList = data
        this.commendList = []
      }
      // console.log(this.lisouList)
      this.historyList = this.historyList.filter(item => item !== this.keyword)
      this.historyList.unshift(this.keyword)

      localStorage.setItem('historyList', JSON.stringify(this.historyList))
    },
    recordS(item) {
      this.keyword = item
      this.lisou()
    }
  },
  watch: {
    keyword(value) {
      if (!value.trim()) {
        this.lisouList = []
        this.commendList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding: 0 20px;

  .header {
    display: flex;
    height: 60px;
    padding: 5px 0;
    // line-height: 50px;
    text-align: center;
    margin-bottom: 20px;
    .left {
      width: 30px;
      height: 50px;
      line-height: 50px;
    }
    .right {
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
    }
    .center {
      flex: 1;
      position: relative;
      padding: 5px;
      .iconsearch {
        position: absolute;
        left: 15px;
        top: 16px;
      }
      input {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        padding-left: 30px;
        border: 1px solid #d7d7d7;
        font-size: 14px;
        color: #333333;
        background-color: #f2f2f2;
      }
    }
  }
  .no-submit {
    margin-top: -10px;
    line-height: 40px;
    .li {
      width: 100%;
      height: 40px;

      border-bottom: 1px solid #d7d7d7;
      font-size: 16px;
    }
    .iconjiantou1 {
      float: right;
      height: 40px;

      width: 20px;
      color: #d8d8d8;
      font-size: 20px;
    }
  }
  .history {
    border-bottom: 1px solid #d7d7d7;
  }
  h3 {
    font-size: 14px;
    margin: 20px 0;
  }
  .items {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    .item {
      width: 43%;
      height: 50px;
      // background-color: blueviolet;
      font-size: 14px;
      line-height: 40px;
      margin: 0 10px;
      text-align: center;
    }
  }

  .searched {
    margin-top: -25px;
  }
}
</style>
