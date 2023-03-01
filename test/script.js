// 1144
/**
 * 
 * @param {Array<number>} params 
 */
function name(params) {
    let sum=0;
    let first=params.shift()
    let isdouble=true;//偶数
    while (params) {
        if(isdouble&&first<params[0]){
            sum=params[0]-first+1
        }
        isdouble=!isdouble
        first=params.shift()
    }
    return sum;
}
const test1=[1,2,3]
console.log(name(test1))