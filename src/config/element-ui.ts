import Vue from "vue";
import { Button, Loading, Message, MessageBox } from "element-ui";

Vue.use(Button);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
