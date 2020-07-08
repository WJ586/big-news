<template>
  <div class="fixedheader">
    <div class="header">
      <div class="box"></div>
      <div class="back" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title">
        <slot></slot>
      </div>
      <div class="extra"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.fixedheader {
  height: 50px;
}
.header {
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #f2f2f2;
  display: flex;

  .back,
  .extra {
    width: 50px;
    height: 50px;
    font-size: 14px;
    line-height: 50px;
  }
  .title {
    flex: 1;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
  }
}
</style>
