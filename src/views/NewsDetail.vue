<template>
  <div>
    <div class="top">
      <div class="header">
        <div class="left" @click="$router.back()">
          <span class="iconfont iconjiantou2"></span>
        </div>
        <div class="center">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="right">
          <span class="follow" v-if="!this.detailList.has_follow" @click="followfn">关注</span>
          <span class="followed" v-else @click="cancelF">已关注</span>
        </div>
      </div>
      <div class="news" v-if="this.detailList.type===1">
        <div class="title">{{this.detailList.title}}</div>
        <div class="user">
          <span class="nickname">{{this.detailList.user.nickname}}</span>
          <span class="time">{{this.detailList.create_date|time}}</span>
        </div>
        <div class="content" v-html="this.detailList.content"></div>
      </div>

      <div class="video" v-else>
        <video :src="this.detailList.content" controls loop></video>
        <div class="user">
          <img :src="$axios.defaults.baseURL+this.detailList.user.head_img" alt />
          <span class="nickname">{{this.detailList.user.nickname}}</span>
        </div>
        <div class="title">{{this.detailList.title}}</div>
      </div>
      <div class="praise">
        <div class="zan">
          <span class="iconfont icondianzan"></span>112
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>微信
        </div>
      </div>
    </div>

    <div class="follows"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailList: {
        user: {}
      }
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.detailList = data
        // console.log(this.detailList)
      }
    },
    async followfn() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          await this.$dialog.confirm({
            title: '温馨提示',
            message: '未登录，请先登录？'
          })

          this.$router.push({
            path: '/login',
            query: {
              back: true
            }
          })
          return
        }
        const id = this.detailList.user.id
        // console.log(id)

        const res = await this.$axios.get(`/user_follows/${id}`)
        const { statusCode } = res.data
        if (statusCode === 200) {
          this.getArticle()
        }
      } catch {}
    },
    async cancelF() {
      const id = this.detailList.user.id
      // console.log(id)

      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.getArticle()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 5px 15px 0;

  display: flex;
  height: 60px;
  line-height: 60px;
  .center {
    flex: 1;

    span {
      line-height: 60px;
      font-size: 60px;
    }
  }
  .right {
    span {
      display: inline-block;
      width: 50px;
      height: 20px;
      line-height: 21px;
      text-align: center;
      font-size: 10px;
      border-radius: 15px;
    }
    .follow {
      background-color: #d62312;

      color: white;
    }
    .followed {
      border: 1px solid #d7d7d7;
      color: #333333;
    }
  }
  .left {
    span {
      font-size: 20px;
    }
  }
}
.news {
  padding: 10px 15px;
  .title {
    font-size: 16px;
    font-weight: 700;
  }
  .user {
    margin-bottom: 15px;
    span {
      font-size: 12px;
      color: #868686;
    }
    .nickname {
      margin-right: 10px;
    }
  }
  .content {
    font-size: 12px;
    color: #333333;
    line-height: 20px;
  }
}

.video {
  video {
    width: 100%;
  }
  .user {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 8px;
    }
    .nickname {
      flex: 1;
      font-size: 16px;
    }
    // .right {
    //   span {
    //     display: inline-block;
    //     width: 68px;
    //     height: 28px;
    //     line-height: 25px;
    //     text-align: center;
    //     font-size: 14px;
    //     border-radius: 15px;
    //     border: 1px solid #d7d7d7;
    //   }
    // }
  }
  .title {
    padding: 10px 15px;
    font-size: 16px;
    color: #333333;
  }
}
.praise {
  padding: 20px;
  display: flex;
  justify-content: space-around;
  border-bottom: 4px solid #e4e4e4;
  div {
    width: 80px;
    height: 30px;
    line-height: 31px;
    text-align: center;
    font-size: 10px;
    color: #333333;
    border-radius: 15px;
    border: 1px solid #797979;
  }
  .iconfont {
    font-size: 14px;
    margin-right: 5px;
  }
  .zan {
    font-size: 12px;
    line-height: 25px;
  }
  .share {
    font-size: 12px;
    line-height: 25px;
    .iconweixin {
      color: #00c800;
    }
  }
}
</style>
