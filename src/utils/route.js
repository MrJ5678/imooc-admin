const path = require('path');
const getChildrenRoutes = routes => {
  const result = [];

  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children);
    }
  });

  return result;
};

// 过滤掉 children 里面的路由
export const filterRoutes = routes => {
  const childrenRoutes = getChildrenRoutes(routes);
  // console.log(childrenRoutes);
  // debugger;
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path;
    });
  });
};

function isNull(data) {
  if (!data) return true;
  if (JSON.stringify(data) === '{}') return true;
  if (JSON.stringify(data) === '[]') return true;
}

// 由路由数据 生成 菜单数据
export const generateMenus = (routes, basePath = '') => {
  const result = [];

  routes.forEach(item => {
    // item 没有 children 和 meta
    if (isNull(item.children) && isNull(item.meta)) return;
    // item 有 children 没有 meta
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children));
      return;
    }
    const routePath = path.resolve(basePath, item.path);
    let route = result.find(item => item.path === routePath);

    // route 如果有 meta
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      };
      // icon && title
      if (route.meta.icon && route.meta.title) {
        result.push(route);
      }
    }
    // route 如果有 children
    if (!isNull(item.children)) {
      route.children.push(...generateMenus(item.children, route.path));
    }
  });

  return result;
};
