import router from '@/router';
import store from '@/store';

// 白名单
const whiteList = ['/login'];

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 已登录 不进入 login 页
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/');
    } else {
      // 判断是否有用户信息
      if (!store.getters.hasUserInfo) {
        await store.dispatch('user/getUserInfo');
      }
      next();
    }
  } else {
    // 未登录 进入 login
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
});
