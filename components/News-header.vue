<template>
  <div class="n-header">
    <div class="back">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="extra"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.n-header {
  height: 50px;
  display: flex;
  .back,
  .extra {
    width: 50px;
    line-height: 50px;
    font-size: 15px;
  }
  .main {
    flex: 1;
    font-size: 15px;
    text-align: center;
    line-height: 50px;
    font-weight: 700;
  }
}
</style>
