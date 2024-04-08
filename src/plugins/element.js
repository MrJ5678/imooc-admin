import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';

export default (app, store) => {
  app.use(ElementPlus, {
    locale: store.getters.language === 'en' ? en : zhCn
  });
};
