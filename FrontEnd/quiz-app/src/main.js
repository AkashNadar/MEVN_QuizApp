import Vue from "vue";
import VueTailwind from "vue-tailwind";
import VueRouter from "vue-router";

import App from "./App.vue";
import "./assets/tailwind.css";
import { settings } from "@/settings.js";
import router from "./router/index.js";
import store from "@/store/index.js";
import "@/store/subscriber.js";

Vue.config.productionTip = false;
Vue.use(VueTailwind, settings);
Vue.use(VueRouter);

store
  .dispatch("auth/attempt", {
    token: localStorage.getItem("token"),
    id: localStorage.getItem("id"),
  })
  .then(() => {
    new Vue({
      store,
      router,
      render: (h) => h(App),
    }).$mount("#app");
  });
