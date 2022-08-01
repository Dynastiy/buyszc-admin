import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import moment from "moment";

import "@/assets/css/main.css";
import "@/assets/css/media-query.css";

import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

import instance from "@/plugins/axios.js";

import "tw-elements";

import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);
Vue.prototype.$axios = instance;
Vue.prototype.$toastify = Toastify;

Vue.prototype.moment = moment;
// Vue.use(http)

Vue.config.ignoredElements = [/^ion-/];

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
