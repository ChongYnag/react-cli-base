//判断类型
export const type = (arg : any) => Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
// object array date undefined null function number string
