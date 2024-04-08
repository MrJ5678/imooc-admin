import formula from '@/constant/formula.json';
import color from 'css-color-function';
import rgbHex from 'rgb-hex';
import axios from 'axios';

export const genNewStyle = async primaryColor => {
  // 根据主色 生成 色值表
  // debugger;
  const colors = genColors(primaryColor);

  // 获取 element-plus 默认样式表 并打标记
  let cssText = await getOriginalStyle();

  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    );
  });

  return cssText;
};

export const writeNewStyle = newStyle => {
  const style = document.createElement('style');
  style.innerText = newStyle;
  document.head.appendChild(style);
};

export const genColors = primary => {
  if (!primary) return;

  const colors = {
    primary
  };

  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/g, primary);

    colors[key] = '#' + rgbHex(color.convert(value));
  });

  return colors;
};

const getOriginalStyle = async () => {
  const version = require('element-plus/package.json').version;
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`;
  const { data } = await axios.get(url);

  return getStyleTemplate(data);
};

const getStyleTemplate = data => {
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  };

  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key];

    data = data.replace(new RegExp(key, 'ig'), value);
  });

  return data;
};
