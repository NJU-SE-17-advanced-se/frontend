import Vue from 'vue'

// 这个实现的问题是在重定向的时候会发生轻微的闪烁
// TODO: 后续可以做一些优化
export default Vue.extend({
  name: 'SearchResultNotFound',
  created () {
    this.$router.replace('/404')
  },
  render () {
    return <div></div>;
  }
})
