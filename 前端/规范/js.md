
# JsDoc

|注释名|语法|含义|示例|
|-|-|-|-|
|@function|@function 简要描述|用于定义当前对象是一个函数，后面可跟描述|@function 处理表格的行|
|@description|@description 描述信息|用于描述|@description 合并Grid的行|
|@param|@param 参数名 {参数类型} 描述信息|描述参数的信息|@param name {String} 传入名称|
|@return|@return {返回类型} 描述信息|描述返回值的信息|@return {Boolean} true:可执行;false:不可执行|
|@author|@author 作者信息 [附属信息：如邮箱、日期]|描述此函数作者的信息|@author 张三 2015/07/21|
|@version|@version XX.XX.XX|描述此函数的版本号|@version 1.0.3|
|@example|@example 示例代码|演示函数的使用|@example setTitle(‘测试’)|

/**
 * @typedef UseFileDialogOptions
 * @property {boolean=} multiple
 * @property {string=} accept
 * @property {string=} capture
 * @property {boolean=} webkitdirectory
 */
/**
 * 
 * @param {{onChange?:(event)=>void,options?:UseFileDialogOptions}} param0 
 * @returns 
 */

1.[jsDoc](https://www.jsdoc.com.cn/tags-author)

2.[ts编程规范](https://bosens-china.github.io/Typescript-manual/download/zh/wiki/coding_guidelines.html#%E6%99%AE%E9%80%9A%E6%96%B9%E6%B3%95)