import Vue from "vue";
import VueRouter from "vue-router";
import Menu from "../components/menu"

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

}];

export const asyncRoutes = [{
    path: '/',
    component: Menu,
    redirect: '/home',
    name: "主页",
    children: [{
        path: 'home',
        name: '主页',
        component: () => import('../pages/homePage/index'),
        meta: {
            title: '主页'
        }
    }]
}, {
    path: '/user',
    component: Menu,
    redirect: '/user/index',
    name: "用户管理",
    children: [{
        path: 'index',
        name: "用户管理",
        component: () => import("../pages/userPage/index"),
        meta: {
            titile: '用户管理',
            roles: ["admin"]
        },
    }]
}, {
    path: '/sitting',
    component: Menu,
    redirect: '/sitting/index',
    name: "个人设置",
    children: [{
        path: "index",
        name: "个人设置",
        component: () => import("../pages/settingPage/index"),
        meta: {
            titile: "个人设置"
        }
    }]
}, {
    path: '*',
    redirect: '/404',
    hidden: true
}]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
    mode: 'history',
    routes: RouterList
});