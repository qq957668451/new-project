import { CLIENT_RENEG_LIMIT } from "tls";

var Mock = require("mockjs");
const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

export default [
    // user login
    {
        url: '/vue-element-admin/user/login',
        type: 'post',
        response: config => {
            const { userName } = config.query
            const token = tokens[userName]
            // mock error
            if (!token) {
                return {
                    status: 500,
                    message: 'Account or password are incorrect.'
                }
            }
            return {
                status: 200,
                data: token
            }
        }
    },
    // get user info
    {
        url: '/vue-element-admin/user/info\.*',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    status: 50008,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                status: 200,
                data: info
            }
        }
    },
    // user logout
    {
        url: '/vue-element-admin/user/logout',
        type: 'post',
        response: _ => {
            return {
                status: 20000,
                data: 'success'
            }
        }
    }
]