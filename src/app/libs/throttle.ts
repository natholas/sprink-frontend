export const throttle = (func, timeFrame) => {
  var lastTime = 0;
  return function () {
    var now = new Date().getTime();
    if (now - lastTime >= timeFrame) {
      func();
      lastTime = now;
    }
  };
}