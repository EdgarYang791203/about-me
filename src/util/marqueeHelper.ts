/** 修正文字跑馬燈因為字串過長而導致出現神速的狀況 */

/** 取得字符串長度 */
function getRealLen(str: string) {
  const arr = [...str];
  return arr.reduce((cur: number, next: string) => {
    /** 字符编码大于255，说明是双字节字符 */
    const isDouble = next.charCodeAt(0) > 255;
    const le = isDouble ? 2 : 1;
    return cur + le;
  }, 0);
}

/** 找到數字最大者 */
function getMAXLengh(arr: string[]) {
  const strLength = arr.map(getRealLen);
  const MAX = Math.max(...strLength);
  return MAX;
}

export default getMAXLengh;
