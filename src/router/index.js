import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const RouterList = [{
    path: "/404",
    component: () => import("../pages/404Page/index"),
    hidden: true
}, {
    path: "/login",
    name: "登录页面",
    component: () => import("../pages/loginPage/login"),
    hidden: true

}, {
    path: "/",
    component: () => import("../pages/homePage/index"),
    name: "首页",
}];

export const asyncRoutes = [{
    path: '/user',
    name: "用户管理",
    component: () => import("../pages/userPage/index"),
    meta: {
        titile: '用户管理',
        roles: ["admin"]
    },
}, {
    path: "/sitting",
    name: "个人设置",
    component: () => import("../pages/settingPage/index"),
    meta: {
        titile: "个人设置"
    }
}, {
    path: '*',
    redirect: '/404',
    hidden: true
}]

export default new VueRouter({
    mode: 'history',
    routes: RouterList
});