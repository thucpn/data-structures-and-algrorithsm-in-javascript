/**
 * Hiện thực các thuật toán xử lí chuỗi
 */

/**
 * Thuật toán Brute Force
 * - Check str1 contain str2
 * - Ý tưởng của thuật toán là cho str2 dịch theo chiều dài của str1 để kiểm tra tất cả phần tử trong str2 có nằm trong
 *    str1 hay không
 * - Luồng chạy:
 *
 *    AABAACAADAABAAABAA  ->  AABAACAADAABAAABAA  ->  AABAACAADAABAAABAA  ->  AABAACAADAABAAABAA  ->  AABAACAADAABAAABAA
 *    ACAADA                   ACAADA                   ACAADA                   ACAADA                   ACAADA
 *
 *    => return về index tại vị trí khớp là 4
 *
 */
const bruteForce = (str1, str2) => {
  const arr1 = [...str1];
  const arr2 = [...str2];

  for (let i = 0; i <= arr1.length - arr2.length; i++) {
    let j;
    for (j = 0; j < arr2.length; j++) if (arr1[i + j] !== arr2[j]) break;
    if (j === arr2.length) return i;
  }

  return -1;
}; // BigO = O(mn) ~ m = str1.length, n = str2.length

/**
 * Thuật toán Knuth-Morris-Pratt
 * - Check str1 contain str2
 * - Ý tưởng của thuật toán là cho str2 dịch theo chiều dài của str1 để kiểm tra tất cả phần tử trong str2 có nằm trong
 *    str1 hay không. Tuy nhiên, trong KMP ta không dịch str2 1 cách từ từ (index++) như bruteForce mà dịch 1 đoạn dài
 *    tuỳ vào độ khớp
 * - Luồng chạy:
 *
 *    (0)                     (1)                     (2)                     (3)
 *    AABAABAABAAABAABCA  ->  AABAABAABAAABAABCA  ->  AABAABAABAAABAABCA  ->  AABAABAABAAABAABCA
 *    AABAABC                    AABAABC                    AABAABC                    AABAABC
 *
 *       (4)
 *    -> AABAABAABAAABAABCA
 *                 AABAABC
 *
 *    + Step 0:
 *            ___
 *        [AABAABA]ABAAABAABCA
 *         ___   x
 *        (AABAABC)
 *
 *        > Ta thấy str2 ko khớp str1 ở vị trí [AxC]
 *        > Tuy nhiên, ở trước vị trí không khớp, phần đầu của str2 là AAB khớp với phần đuôi AAB trên str1
 *        > Do đó ta sẽ nhảy cóc dịch str2 sang vị trí khớp tương ứng trên str1 là AAB
 *
 *    + Step 1:
 *               ___
 *        AAB[AABAABA]AABAABCA
 *            ___   x
 *           (AABAABC)
 *
 *        > Ta thấy str2 ko khớp str1 ở vị trí [AxC]
 *        > Tuy nhiên, ở trước vị trí không khớp, phần đầu của str2 là AAB khớp với phần đuôi AAB trên str1
 *        > Do đó ta sẽ nhảy cóc dịch str2 sang vị trí khớp tương ứng trên str1 là AAB
 *
 *    + Step 2:
 *                  __
 *        AABAAB[AABAAAB]AABCA
 *               __   x
 *              (AABAABC)
 *
 *        > Ta thấy str2 ko khớp str1 ở vị trí [AxB]
 *        > Tuy nhiên, ở trước vị trí không khớp, phần đầu của str2 là AA khớp với phần đuôi AA trên str1
 *        > Do đó ta sẽ nhảy cóc dịch str2 sang vị trí khớp tương ứng trên str1 là AA
 *
 *    + Step 3:
 *
 *                   _
 *        AABAABAAB[AAABAAB]CA
 *                  _ x
 *                 (AABAABC)
 *
 *        > Ta thấy str2 ko khớp str1 ở vị trí [AxB]
 *        > Tuy nhiên, ở trước vị trí không khớp, phần đầu của str2 là A khớp với phần đuôi A trên str1
 *        > Do đó ta sẽ nhảy cóc dịch str2 sang vị trí khớp tương ứng trên str1 là A
 *
 *    + Step 4:
 *
 *        AABAABAABA[AABAABC]
 *                   •
 *                  [AABAABC]
 *
 *        > Ta thấy str2 khớp hoàn toàn với str1
 *        > return về vị trí khớp là A => 10
 *
 */
const KMP = (str1, str2) => {
  /**
   * Tính độ dài lặp lại giữa phần đầu và cuối 1 chuỗi
   * Chẳng hạn với chuỗi AABA, AABAAB
   *           _
   *        AABA
   *           _        => độ dài lặp lại là 1
   *           AABA
   *
   *           ___
   *        AABAAB
   *           ___      => độ dài lặp lại là 3
   *           AABAAB
   *
   */
  const prefix = (str) => {
    const arr = [...str];
    const result = {};

    let len = 0;
    let i = 1;
    result[0] = 0;

    while (i < arr.length) {
      if (arr[i] === arr[len]) {
        len++;
        result[i] = len;
        i++;
      } else {
        if (len !== 0) {
          len = result[len - 1];
        } else {
          result[i] = len;
          i++;
        }
      }
    }

    return result;
  };

  const arr1 = [...str1];
  const arr2 = [...str2];
  const prefixStr2 = prefix(str2);
  let i = 0;
  let j = 0;

  while (i < arr1.length) {
    if (arr2[j] === arr1[i]) {
      i++;
      j++;
    }

    if (j === arr2.length) return i - j;

    if (i < arr1.length && arr2[j] !== arr1[i]) {
      if (j !== 0) {
        j = prefixStr2[j - 1];
      } else {
        i++;
      }
    }
  }
}; // O(m+n)

// console.log(bruteForce('AABAACAADAABAAABAA', 'ACAADA'));
console.log(KMP('AABAABAABAAABAABCA', 'AABAABC'));
