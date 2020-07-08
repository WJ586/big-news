<template>
  <div>
    <div class="single" v-if="post.cover.length<3">
      <div class="content">
        <div class="title">{{post.title}}</div>
        <div class="footer">
          <span class="name">{{post.user.nickname}}</span>
          <span>{{post.comment_length}}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="$url(post.cover[0].url)" alt />
      </div>
    </div>
    <div class="mutiple" v-if="post.cover.length>=3">
      <div class="title">{{post.title}}</div>
      <div class="imgs">
        <img :src="$url(post.cover[0].url)" alt />
        <img :src="$url(post.cover[1].url)" alt />
        <img :src="$url(post.cover[2].url)" alt />
      </div>
      <div class="footer">
        <span class="name">{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>
<style lang="less">
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  font-size: 20px;
  padding-bottom: 5px;
}
.footer {
  font-size: 16px;
  color: #868686;
  margin-bottom: 10px;
  .name {
    margin-right: 15px;
  }
}
.single {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #e4e4e4;
  img {
    width: 150px;
    height: 80px;
    object-fit: cover;
  }
}
.mutiple {
  padding: 10px;
  border-bottom: 1px solid #e4e4e4;
  .imgs {
    display: flex;
    justify-content: space-between;
    img {
      width: 110px;
      height: 80px;
      object-fit: cover;
    }
  }
}
</style>
