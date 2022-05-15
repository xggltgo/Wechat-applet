'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate; // 获取一个聚合的操作符
exports.main = async (event, context) => {

	const {
		userId
	} = event;

	const {
		data
	} = await db.collection('user').doc(userId).get()

	const article_likes_ids = data[0].article_likes_ids;

	const list = await db.collection('article')
		.aggregate()
		.addFields({
			is_like: $.in(['$_id', article_likes_ids])
		})
		.project({
			content: 0
		})
		.match({
			is_like: true
		})
		.end()

	//返回数据给客户端
	return {
		code: 0,
		msg: '请求成功',
		data: list.data
	}
};
