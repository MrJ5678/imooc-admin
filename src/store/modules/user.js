import { login } from '@/api/sys';
import md5 from 'md5';
import { setItem, getItem, clearAllItem } from '@/utils/storage';
import { TOKEN } from '@/constant';
import router from '@/router';
import { getUserInfo } from '../../api/sys';
import { setTimeStamp } from '@/utils/auth';

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    // 登录
    async login(context, userInfo) {
      const { username, password } = userInfo;

      const data = await login({
        username,
        password: md5(password)
      });

      const { token } = data;
      this.commit('user/setToken', token);
      // 保存登录时间
      setTimeStamp();
      // 页面跳转
      // router.push('/');
      return data;
    },

    // 获取用户信息
    async getUserInfo() {
      const res = await getUserInfo();

      this.commit('user/setUserInfo', res);

      return res;
    },

    // 退出登录
    logout() {
      this.commit('user/setToken', '');
      this.commit('user/setUserInfo', {});
      clearAllItem();
      // TODO 清理掉权限相关配置
      router.push('/login');
    }
  }
};
