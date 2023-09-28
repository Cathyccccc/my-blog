/**
 * 舒展水滴 
 * matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() )
 */
export function stretchWater(dom, timer, a, d, tx, status) {
  if (status === 'stretch') return;
  console.log('mouseenter')
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  status = 'stretch';
  let speed_a = 0.0211333, speed_d = -0.00611333, speed_tx = -6.0111333;
  timer = setInterval(() => {
    if (a < 2) {
      a += speed_a;
    }
    if (d > 0.7) {
      d += speed_d;
    }
    if (tx > -352.3911023420891) {
      tx += speed_tx;
    }
    if (a >= 2 && d <= 0.7 && tx <= -352.3911023420891) {
      clearInterval(timer);
      timer = null;
      status = null;
      a = 2; d = 0.7; tx = -352.3911023420891;
    }
    dom.style.transform = `matrix(${a}, 0, 0, ${d}, ${tx}, 0)`
  }, 50);
}

/**
 * 收缩水滴 
 */
export function shrinkWater(dom, timer, a, d, tx, status) {
  if (status === 'shrink') return;
  console.log('mouseleave')
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  status = 'shrink';
  let speed_a = 0.0211333, speed_d = -0.00611333, speed_tx = -6.0111333;
  timer = setInterval(() => {
    if (a > 1) {
      a -= speed_a;
    }
    if (d < 1) {
      d -= speed_d;
    }
    if (tx < -76.1984879008934) {
      tx -= speed_tx;
    }
    if (a <= 1 && d >= 1 && tx >= -76.1984879008934) {
      clearInterval(timer);
      timer = null;
      status = null;
      a = 1; d = 1; tx = -76.1984879008934;
    }
    dom.style.transform = `matrix(${a}, 0, 0, ${d}, ${tx}, 0)`
  }, 100)
}
