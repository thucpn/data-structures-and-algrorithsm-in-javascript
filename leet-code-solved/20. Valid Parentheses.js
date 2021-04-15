/**
 * https://leetcode.com/problems/valid-parentheses/
 *
 * @param {string} s
 * @return {boolean}
 *
 * Time: O(n)
 * Space: O(n)
 */
var isValid = function (s) {
  const opens = {
    '(': ')',
    '{': '}',
    '[': ']',
  };

  const closes = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  const stack = [];

  for (let i = 0; i < [...s].length; i++) {
    const char = [...s][i];
    if (char in opens) {
      stack.push(char);
    } else if (char in closes) {
      const close = stack.pop();
      if (char !== opens[close]) return false;
    }
  }

  return stack.length === 0;
};
