// 保存
export const setItem = (key, value) => {
  // 基本数据类型
  // 复杂数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

// 读取
export const getItem = key => {
  const data = localStorage.getItem(key);

  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
};

// 删除
export const removeItem = key => {
  localStorage.removeItem(key);
};

// 清除所有
export const clearAllItem = () => {
  localStorage.clear();
};
