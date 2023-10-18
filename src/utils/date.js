// 处理日期相关
/**
 * 获取日期字符串 YYYY-MM-DD
 * @param {Object} date 日期对象
 */
export function getDate(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}