import Vue from "vue";

// 这个实现的问题是在重定向的时候会发生轻微的闪烁
// 不过目前似乎不会跳转到这个页面，可以忽略
export default Vue.extend({
  name: "SearchResultNotFound",
  created() {
    this.$router.replace("/404");
  },
  render() {
    return <div>Not Found</div>;
  }
});
