import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// normalize
import "normalize.css";
// responsive
import "./assets/responsive.less";
// global imported element-ui components
import "./config/element-ui";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
