<template>
  <div class="nComment">
    <div class="user">
      <div class="left">
        <img :src="$axios.defaults.baseURL+post.user.head_img" alt />
      </div>
      <div class="center">
        <p class="username">{{post.user.nickname}}</p>
        <span class="time">{{post.create_date|fromNow}}</span>
      </div>
      <div class="right" @click="reply(post.user.nickname,post.id)">回复</div>
    </div>
    <n-floor v-if="post.parent" :comment="post.parent" :num="getLou(0,post)"></n-floor>
    <div class="uComment">{{post.content}}</div>
  </div>
</template>

<script>
import nFloor from './n-floor'
export default {
  props: {
    post: Object
  },
  components: {
    'n-floor': nFloor
  },
  methods: {
    getLou(num, comment) {
      if (comment.parent) {
        return this.getLou(num + 1, comment.parent)
      } else {
        return num
      }
    },
    reply(name, id) {
      // console.log(name, id)
      this.$bus.$emit('reply', name, id)
    }
  }
}
</script>
<style lang="less" scoped>
.nComment {
  padding: 20px 20px 0;
  border-bottom: 1px solid #e6e6e6;
  .user {
    display: flex;
    .left {
      padding-right: 10px;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      .username {
        font-size: 16px;
        margin-bottom: -8px;
      }
      .time {
        font-size: 14px;
        color: #747272;
      }
    }
    .right {
      font-size: 14px;
      color: #747272;
    }
  }
  .uComment {
    // width: 100%;
    padding: 15px 0 20px;
    font-size: 16px;
    word-break: break-all;
  }
}
</style>
