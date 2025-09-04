/**
 * 节流：滚动时一段时间（300ms）内只触发一次函数
 * @param {*} fn
 * @returns Function
 */
export function throttle(fn, delay) {
  let oldTime = 0;
  return function () {
    const newTime = Date.now();
    if (newTime - oldTime >= delay) {
      oldTime = newTime;
      fn.apply(null, arguments);
    }
  };
}
