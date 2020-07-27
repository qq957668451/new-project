import axios from 'axios'
import { getCookie } from '../public/pubFunction'
import { Loading } from 'element-ui';

const serviece = axios.create({
  baseUrl: 'http://localhost:8888',
  timeOut: 10000,
  headers: {
    // source: 'YTO-STEWARD'
  }

});
let loadingInstance;
// 创建http请求拦截器
serviece.interceptors.request.use(
  request => {
    request.headers['Content-Type'] = 'application/json';
    loadingInstance = Loading.service({
      lock: true,
      text: '加载中,请稍后...',
      background: 'rgba(255,255,255,0.7)'
    });
    let token = getCookie('token');
    if (token) {
      request.headers['token'] = token;
    }
    return request;
  },
  err => {
    return Promise.reject(err);
  }
);

serviece.interceptors.response.use(
  response => {
    loadingInstance.close();
    const res = response.data
    // if(res.code == 500){

    // }
    return res
  }
)


export default serviece;