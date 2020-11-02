module.exports = {
  plugins: {
    // 因为vant是基于375的设计稿来写的
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') === -1 ? 75 : 37.5
      },
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}
