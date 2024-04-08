import axios from 'axios';
import { ElMessage } from 'element-plus';
import store from '@/store';
import { isCheckTimeout } from '@/utils/auth';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
});

// 发送请求的这个回调函数的执行   发生在  permission  之前
// 请求的两个回调中 第一个回调抛出的错误 会由第二个回调接住
service.interceptors.request.use(
  config => {
    // 注入 token
    if (store.getters.token) {
      // 判断 token 是否失效
      if (isCheckTimeout()) {
        // ElMessage({
        //   message: '登录时长为2小时, 现已超时, 请重新登录',
        //   type: 'error',
        //   duration: 5000
        // });
        store.dispatch('user/logout');
        throw new Error('登录时长为2小时, 现已超时, 请重新登录');
        // ElMessage.error('登录时长为2小时, 现已超时, 请重新登录');
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }

    // config.headers['Accept-Language'] = store.getters.language;

    return config;
  },
  error => {
    // 请求失败
    ElMessage.error(error.message);
    // console.log(error);
    throw new Error(error);
  }
);

service.interceptors.response.use(
  response => {
    // console.log(response);
    const {
      data: { errno }
    } = response;
    // 判断当前请求是否成功
    if (errno === 0) {
      // 请求成功业务成功则返回数据
      const data = response.data.data;
      return data;
    } else {
      // 请求成功业务失败则给出消息提示
      const { msg } = response.data;
      ElMessage.error(msg);
      throw new Error(msg);
    }
  },
  error => {
    // 请求失败
    // console.dir(error);
    if (
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      // console.log('401...');
    }
    ElMessage.error(error.message);
    throw new Error(error);
  }
);

export default service;
