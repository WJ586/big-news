<template>
  <div class="nav" @click="$emit('click')">
    <p class="nav-tit">
      <slot name="title"></slot>
    </p>
    <p class="nav-con">
      <slot name="content"></slot>
    </p>
    <i class="iconfont iconjiantou1"></i>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  height: 50px;
  padding-right: 21px;
  line-height: 50px;
  border-bottom: 2px solid #e4e4e4;
  .nav-tit {
    flex: 1;
    font-size: 16px;
  }
  .nav-con {
    flex: 1;
    text-align: right;

    font-size: 16px;
    color: #afafaf;
  }
}
</style>
