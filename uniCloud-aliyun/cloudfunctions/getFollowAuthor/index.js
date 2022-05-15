'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate;
exports.main = async (event, context) => {

	const {
		userId
	} = event;

	//获取关注作者信息
	const {
		data
	} = await db.collection('user').doc(userId).get();
	const author_likes_ids = data[0].author_likes_ids;

	const list = await db.collection('user')
		.aggregate()
		.addFields({
			is_like: $.in(['$id', author_likes_ids]),
		})
		.project({
			loginId:false,
			loginPwd:false
		})
		.match({
			is_like: true,
		})
		.end()


	//返回数据给客户端
	return {
		code: 0,
		msg:'',
		data:list.data,
	}
};
