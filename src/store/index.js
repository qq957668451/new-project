import Vue from "vue";
import Vuex from "vuex";
import getters from './getters'
Vue.use(Vuex);


// // 参数一:要查询的目录
// // 参数二:是否要查询子孙目录,方法默认的值为false
// // 参数三:要匹配的文件的后缀,一个正则表达式
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const store = new Vuex.Store({
    modules,
    getters
})

export default store