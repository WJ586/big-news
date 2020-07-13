<template>
  <div>
    <n-floor :num="num-1" :comment="comment.parent" v-if="comment.parent"></n-floor>
    <div class="floor">
      <div class="user">
        <span class="lou">{{num}}</span>
        <div class="nt">
          <span class="nickname">{{comment.user.nickname}}</span>
          <span class="time">{{comment.create_date|fromNow}}</span>
        </div>

        <span class="reponse" @click="reply(comment.user.nickname,comment.id)">回复</span>
      </div>
      <div class="comment">{{comment.content}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'n-floor',
  props: {
    comment: Object,
    num: Number
  },
  methods: {
    reply(name, id) {
      this.$bus.$emit('reply', name, id)
    }
  }
}
</script>

<style lang="less" scoped>
.floor {
  margin-top: -1px;
  padding: 0 15px;
  border: 1px solid #d7d7d7;
  .user {
    display: flex;
    height: 50px;
    line-height: 50px;
    .lou {
      font-size: 16px;
    }
    .nt {
      flex: 1;
      display: flex;
      align-items: center;
      .nickname {
        font-size: 16px;
        margin: 0 10px;
      }
      .time {
        font-size: 14px;
        color: #747272;
      }
    }

    .reponse {
      font-size: 14px;
      color: #747272;
    }
  }
  .comment {
    font-size: 14px;
    padding-bottom: 20px;
    word-break: break-all;
  }
}
</style>
