import serviece from './index.js'

// 登录
export function toLogin(params) {
    return serviece({
        url: '/vue-element-admin/user/login',
        method: 'post',
        params
    })
}
// 获取用户信息
export function getUserInfo(params) {
    return serviece({
        url: '/vue-element-admin/user/info',
        method: 'get',
        params
    })
}
// 退出登录
export function logout() {
    return serviece({
      url: '/vue-element-admin/user/logout',
      method: 'post'
    })
  }
  