import {
  getUserInfo,
  toLogin
} from '../../api/login';
import {
  getCookie,
  setCookie,
  funLocalstorage
} from '../../public/pubFunction'
import { Message } from 'element-ui';
const state = {
  token: getCookie('token'),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      userName,
      passWord
    } = userInfo
    return new Promise((resolve, reject) => {
      toLogin({
        userName: userName.trim(),
        passWord: passWord
      }).then(response => {
        const {
          data
        } = response
        if(data){
          commit('SET_TOKEN', data.token)
          setCookie('token', data.token)
          funLocalstorage.set("userName",userName)
          funLocalstorage.set("passWord",passWord)
          resolve(response)
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    }).catch((e) => {})
  },
  // 获取用户信息
  getUserInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getUserInfo({token:state.token}).then(response => {
        const {
          data
        } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const {
          roles,
          name,
          avatar,
          introduction
        } = data

        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    }).catch((e) => {})
  },
  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      // removeToken()
      resolve()
    }).catch((e) => {})
  },
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
}