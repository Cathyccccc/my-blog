// 处理日期相关
/**
 * 获取日期字符串 YYYY-MM-DD
 * @param {Object} date 日期对象
 */
export function getDate(date = new Date()) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 获取日期时间字符串 YYYY-MM-DD HH:mm:ss
 * @param {*} date 
 */
export function getDateTime(date = new Date()) {
  const str = getDate(date);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${str} ${hours}:${minutes}:${seconds}`;
}

/**
 * 获取某年某月有多少天
 * @param {Number} year 
 * @param {Number} month 
 * @returns {Number} days 天数
 */
export function getDays(year, month) {
  // const year = date.getFullYear();
  const daysArr = [0, 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isLeapYear = year % 100 === 0 && year % 4 !== 0;
  if (month === 2) {
    if (isLeapYear) {
      return 28;
    } else {
      return 29;
    }
  }
  return daysArr[month];
}

export function formatDaysAsWeek(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const start = new Date(`${year}-${month}-01`);
  const days = getDays(year, month);
  let arr = [];
  let monthArr = [];
  for (let i = 1; i <= days; i++) {
    monthArr.push(i);
  }
  while (monthArr.length > 0) {
    console.log(start.getDay())
    if (monthArr.length === days && start.getDay() !== 0) {
      const group = monthArr.slice(0, 7 - start.getDay());
      while(group.length < 7) {
        group.unshift('');
      }
      monthArr.splice(0, start.getDay() + 1);
      arr.push(group)
    } else {
      const group = monthArr.slice(0, 7);
      monthArr.splice(0, 7);
      arr.push(group);
    }
  }
  // console.log(arr)
  return arr;
}