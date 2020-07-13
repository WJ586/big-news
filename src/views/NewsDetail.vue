<template>
  <div class="detail">
    <div class="top">
      <div class="header">
        <div class="left" @click="$router.back()">
          <span class="iconfont iconjiantou2"></span>
        </div>
        <div class="center">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="right">
          <span class="follow" v-if="!detailList.has_follow" @click="followfn">关注</span>
          <span class="followed" v-else @click="cancelF">已关注</span>
        </div>
      </div>
      <div class="news" v-if="detailList.type===1">
        <div class="title">{{detailList.title}}</div>
        <div class="user">
          <span class="nickname">{{detailList.user.nickname}}</span>
          <span class="time">{{detailList.create_date|time}}</span>
        </div>
        <div class="content" v-html="detailList.content"></div>
      </div>

      <div class="video" v-else>
        <video :src="detailList.content" controls loop></video>
        <div class="user">
          <img :src="$axios.defaults.baseURL+this.detailList.user.head_img" alt />
          <span class="nickname">{{detailList.user.nickname}}</span>
        </div>
        <div class="title">{{detailList.title}}</div>
      </div>
      <div class="praise">
        <div :class="{zan:true,zanactive:detailList.has_like}" @click="zanfn">
          <span class="iconfont icondianzan"></span>
          {{detailList.like_length}}
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>微信
        </div>
      </div>
    </div>
    <div class="comments">
      <h3>精彩跟帖</h3>
      <p v-if="!commentList.length" class="none">暂无跟帖，抢占沙发</p>
      <n-comment :post="item" v-for="item in commentList" :key="item.id"></n-comment>
    </div>

    <div class="follows"></div>
    <div class="write">
      <div class="input" v-if="isShowarea">
        <input type="text" placeholder="写跟帖" @focus="focus" />
        <span class="iconfont iconpinglun-">
          <span>{{detailList.comment_length}}</span>
        </span>
        <span
          class="iconfont iconshoucang"
          :class="{staractive:this.detailList.has_star}"
          @click="starfn"
        ></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
      <div class="textarea" v-else>
        <textarea :placeholder="`回复：@${replyName}`" ref="textarea" @blur="blur" v-model="content"></textarea>
        <div class="send" @click="sendFn(detailList.id)">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailList: {
        user: {}
      },
      commentList: [],
      isShowarea: 'true',
      content: '',
      replyName: '',
      replyId: ''
    }
  },
  created() {
    // console.log('bus注册')
    this.getArticle()
    this.getComments()
    this.$bus.$on('reply', this.replyFn)
  },
  destroyed() {
    // console.log('bus取消')
    this.$bus.$off('reply', this.replyFn)
  },
  methods: {
    replyFn(name, id) {
      this.replyName = name
      this.replyId = id
      this.isShowarea = false
      this.$nextTick(() => {
        this.$refs.textarea.focus()
      })
    },
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
    async isLogin(url, id) {
      try {
        id = id || this.detailList.id
        const token = localStorage.getItem('token')
        if (!token) {
          await this.$dialog.confirm({
            title: '温馨提示',
            message: '您还未登录，是否登录？'
          })
          localStorage.setItem('backUrl', this.$route.path)
          this.$router.push('/login')
          return
        }
        const res = await this.$axios.get(`${url}/${id}`)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          this.getArticle()
        }
      } catch {
        this.$toast.fail('取消成功')
      }
    },
    async followfn() {
      this.isLogin('/user_follows', this.detailList.user.id)
    },
    async cancelF() {
      const id = this.detailList.user.id
      // console.log(id)

      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.getArticle()
      }
    },
    async zanfn() {
      // 判断用户是否登录
      this.isLogin('/post_like')
    },
    async starfn() {
      this.isLogin('/post_star')
    },
    async getComments() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        // console.log(this.commentList)
      }
    },
    async focus() {
      this.isShowarea = false
      // 让textarea自动获取焦点
      // 修改完数据，等待DOM更新
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    blur() {
      // 内容不为空时不消失
      if (!this.content) {
        this.isShowarea = true
      }
    },
    async sendFn(id) {
      // const id = this.$route.params.id
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.content,
        parent_id: this.replyId
      })
      console.log(res)
      if (res.data.statusCode === 200) {
        this.content = ''
        this.getComments()
        this.detailList.comment_length++
        this.isShowarea = true

        // 清空原来评论的内容
        this.content = ''
        this.replyId = ''
        this.replyName = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  // padding-bottom: 50px;
}
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
    /deep/ img {
      width: 100%;
    }
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
  .zanactive {
    color: red;
    border: 1px solid red;
  }
  .share {
    font-size: 12px;
    line-height: 25px;
    .iconweixin {
      color: #00c800;
    }
  }
}
.write {
  .input {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    // width: 100%;
    height: 50px;
    background-color: #f2f2f2;
    input {
      width: 200px;
      border: none;
      height: 36px;
      margin: 7px 15px;
      font-size: 16px;
      padding-left: 18px;
      background-color: #d7d7d7;
      border-radius: 20px;
    }
    .iconfont {
      display: flex;
      justify-content: space-around;
      flex: 1;
      font-size: 25px;
      line-height: 50px;
    }
    .staractive {
      color: red;
      font-weight: 700;
    }
    .iconpinglun- {
      position: relative;
      span {
        position: absolute;
        width: 28px;
        height: 16px;
        line-height: 18px;
        top: 7px;
        left: 14px;
        border-radius: 8px;
        background-color: red;
        font-size: 13px;
        text-align: center;
      }
    }
  }
  .textarea {
    background-color: #f2f2f2;
    display: flex;
    padding: 20px 15px 10px;
    height: 120px;
    textarea {
      flex: 1;
      resize: none;
      border-radius: 10px;
      border: none;
      background-color: #d7d7d7;
      padding-top: 15px;
      padding-left: 20px;
      font-size: 16px;
      color: #7b7d7e;
    }
    .send {
      position: relative;
      bottom: -62px;
      width: 65px;
      height: 26px;
      border-radius: 13px;
      margin-left: 15px;
      text-align: center;
      line-height: 26px;
      color: white;
      background-color: red;
      font-size: 16px;
    }
  }
}
.comments {
  h3 {
    font-size: 18px;
    text-align: center;
    padding: 10px;
  }
  .none {
    padding: 15px 0;
    text-align: center;
    font-size: 12px;
    color: #c6b4b4;
    border-bottom: 2px solid #e4e4e4;
  }
}
</style>
