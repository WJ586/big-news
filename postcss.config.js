module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 1rem的大小  750
      rootValue: 36,
      // 会把哪些样式的单位转成rem
      propList: ['*']
    }
  }
}
