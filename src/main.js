import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import installElementPlus from './plugins/element';

import '@/styles/index.scss';

// 导入 SvgIcon
import installIcons from '@/icons';

// 导入路由鉴权
import './permission';

// 全局属性
import installFilter from '@/filter';

const app = createApp(App);
installElementPlus(app, store);
installIcons(app);
installFilter(app);
app.use(store).use(router).use(i18n).mount('#app');
