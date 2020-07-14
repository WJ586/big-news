<template>
  <div @click="$router.push(`/news-detail/${post.id}`)" class="post">
    <div class="video" v-if="post.type===2">
      <div class="title">{{post.title}}</div>
      <div class="img">
        <img :src="$url(post.cover[0].url)" alt />
        <span class="iconfont iconshipin"></span>
      </div>
      <div class="footer">
        <span class="name">{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <div class="single" v-else-if="post.cover.length<3">
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
<style lang="less" scoped>
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
    // width: 100%;
    display: flex;
    justify-content: space-between;
    img {
      width: 100px;
      height: 80px;
      object-fit: cover;
    }
  }
}
.video {
  padding: 10px;
  border-bottom: 1px solid #e4e4e4;
  .img {
    position: relative;
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    span {
      display: inline-block;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      font-size: 60px;
      color: white;
    }
  }
}
</style>
