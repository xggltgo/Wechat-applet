'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		searchKeyword
	} = event;

	const {
		data
	} = await db.collection('article')
		.aggregate() // 使用聚合的形式进行数据的获取
		.match({
			title: new RegExp(searchKeyword), // 使用正则表达式进行模糊匹配，只要是包含，就进行返回操作
		})
		.project({
			content: 0 // 本次查询不需要返回文章详情给前端
		})
		.end()


	//返回数据给客户端
	return {
		code: 0,
		msg: '',
		data,
	}
};
