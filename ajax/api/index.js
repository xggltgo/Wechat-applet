/* 批量进行文件导出 */
// . =>API目录的相对路径
// true => 是否查询子目录
// /.js/ => 需要查询的文件的后缀名

const requireApi = require.context('.', true, /.js$/);
// console.log(requireApi.keys()) //js文件路径数组 ['./index.js', './interface/home.js']
let module = {};

requireApi.keys().forEach((key, index) => {
	if (key === './index.js') return
	// console.log(requireApi(key)); //对应路径中的api函数
	Object.assign(module, requireApi(key))
})

export default module