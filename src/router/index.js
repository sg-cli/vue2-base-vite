import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue"; // 引入 Home页面组件

// 注册路由插件
Vue.use(VueRouter);

//
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/demo1",
    name: "Demo1",
    component: () => import("../views/demo1.vue"),
  },
  {
    path: "/demo2",
    name: "Demo2",
    component: () => import("../views/demo2.vue"),
  },
  {
    path: "/demo3",
    name: "Demo3",
    component: () => import("../views/demo3.vue"),
  },
  {
    path: "/demo4",
    name: "Demo4",
    component: () => import("../views/demo4.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
