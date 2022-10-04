  /**
   * @param {string} ransomNote
   * @param {string} magazine
   * @return {boolean}
   */
  var canConstruct = function (ransomNote, magazine) {
    const ransomTable = {};
    [...ransomNote].forEach((char) => {
      ransomTable[char] = ransomTable[char] ? ransomTable[char] + 1 : 1;
    });

    const magazineTable = {};
    [...magazine].forEach((char) => {
      magazineTable[char] = magazineTable[char] ? magazineTable[char] + 1 : 1;
    });

    for (char in ransomTable) {
      if (magazineTable[char] == null || ransomTable[char] > magazineTable[char]) {
        return false;
      }
    }

    return true;
  };
