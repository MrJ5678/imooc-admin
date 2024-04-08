import SvgIcon from '@/components/SvgIcon';
// 导入所有的 svg 图标
const svgRequire = require.context('./svg', false, /\.svg$/);
// console.log(svgRequire);
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon));

// 完成 SvgIcon 的全局注册
export default app => {
  app.component('svg-icon', SvgIcon);
};
