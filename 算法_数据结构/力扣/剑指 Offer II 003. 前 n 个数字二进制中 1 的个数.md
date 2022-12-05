给定一个非负整数 `n` ，请计算 `0` 到 `n` 之间的每个数字的二进制表示中 1 的个数，并输出一个数组。

**示例 1：**

```
输入: n = 2
输出: [0,1,1]
解释:
0 --> 0
1 --> 1
2 --> 10
```

**示例 2：**

```
输入: n = 5
输出: [0,1,1,2,1,2]
解释:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101
```

**说明 :**

- `0 <= n <= 105`
  **进阶:**
- 给出时间复杂度为  `O(n*sizeof(integer))`  的解答非常容易。但你可以在线性时间  `O(n)`  内用一趟扫描做到吗？
- 要求算法的空间复杂度为` O(n)` 。
- 你能进一步完善解法吗？要求在 C++或任何其他语言中不使用任何内置函数（如` C++ 中的 __builtin_popcount` ）来执行此操作。
  
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/w3tCBm著作权归领扣网络所有。
> 商业转载请联系官方授权，非商业转载请注明出处。

##题解 ####遍历
要获取`0`-`n`之间的数字二进制的 1 的个数，将`0`-`n`的数全转为二进制，再将遍历获取 1 的个数

执行用时：_556ms_ 内存消耗：_47.3MB_
时间复杂度：_O(n\*sizeof(integer))_ 空间复杂度：_O(1)_

```javascript
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  let result = [];
  do {
    const str2 = n.toString(2);
    let str2num = 0;
    for (const s of str2) {
      if (s == "1") {
        str2num++;
      }
    }
    result.unshift(str2num);
  } while (n--);
  return result;
};
```

####动态规划+位运算——最低有效位

- 二进制数中，奇数为前面的偶数最低位改为 1。
- 二进制数中，偶数抹掉末尾的 0 后的值，为除于 2 后的值。

即二级制里面的 1 的个数

- 当 i 为奇数，bits[i] = bits[i-1]+1
- 当 i 为偶数，bits[i] = bits[i/2]

i>>1 为 i 整除 2，向下取整。 i&2 当 i 为奇数时+1

- bits[i] =bits[i/2]+i%2=bits[i>>1]+i&1

执行用时：_68ms_ 内存消耗：_46.6MB_
时间复杂度：_O(n)_ 空间复杂度：_O(1)_

```javascript
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  let result = Array(n + 1).fill(0);
  for (let s = 1; s <= n; s++) {
    result[s] = result[s >> 1] + (s & 1);
  }
  return result;
};
```
