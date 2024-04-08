import path from 'path';
import i18n from '@/i18n';

export const genRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let res = [];

  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    };

    const reg = /.*\/:.*/;
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      const i18nTitle = i18n.global.t(`route.${route.meta.title}`);
      data.title = [...data.title, i18nTitle];
      res.push(data);
    }

    if (route.children) {
      const tempRoutes = genRoutes(route.children, data.path, data.title);
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes];
      }
    }
  }

  return res;
};
