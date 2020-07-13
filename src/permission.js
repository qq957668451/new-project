import router from './router/index'
import { getCookie } from './public/pubFunction'
import store from './store/index'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    // 判断是否是已登录
    const hasToken = getCookie('token')
    // 有token代表已登录正常跳转，
    if (hasToken) {
        // 如果访问/login,重定向首页
        if (to.path === '/login') {
            next({
                path: '/'
            })
        } else {
            // 获取roles 查看可以访问的页面，如果roles.indexOf(to.path),执行next(),如果roles.indexOf(to.path),进行拦截，跳转到404
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if(hasRoles){
                next()
            }else{
                try{
                    const { roles } = await store.dispatch('user/getUserInfo')
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    router.addRoutes(accessRoutes)
                    next({ ...to, replace: true })
                } catch {
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    // 没有token 重定向到登录页面
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            // 携带登录成功后跳转地址
            next(`/login?redirect=${to.path}`)
        }
    }
})