import VueRouter from "vue-router";

import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import Dashboard from "../components/Dashboard.vue";
import Questions from "../components/Questions.vue";
import EditTest from "../components/EditTest.vue";
import ChangePassword from "../components/ChangePassword.vue";
// import store from "@/store";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "login",
      path: "/login",
      component: Login,
    },
    {
      name: "signup",
      path: "/signup",
      component: Signup,
    },
    {
      name: "dashboard",
      path: "/dashboard",
      component: Dashboard,
      // beforeEnter: (to, from, next) => {
      //   // Middleware
      //   // console.log(store.getters["auth/user"]);
      //   if (!store.getters["auth/user"]) {
      //     return next({
      //       name: "login",
      //     });
      //   }

      //   next();
      // },
    },
    {
      name: "questions",
      path: '/questions/:id',
      component: Questions,
    },
    {
      name: "editTest",
      path: '/dashboard/editTest/:id',
      component: EditTest,
    },
    {
      name: 'changePassword',
      path: '/dashboard/changePassword',
      component: ChangePassword,
    }
  ],
});

export default router;
