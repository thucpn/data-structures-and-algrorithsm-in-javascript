/**
 * Hiện thực fibonacci bằng quy hoạch động
 */

const dynamicFib = () => {
  const cache = {};

  return function fib(n) {
    if (n in cache)
      return cache[n];

    if (n < 2)
      return 1;

    return fib(n - 1) + fib(n - 2);
  };
};

console.log(dynamicFib()(3));