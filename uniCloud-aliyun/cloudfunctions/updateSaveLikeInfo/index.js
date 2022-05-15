'use strict';
const db = uniCloud.database();
//字段更新指令
const dbCmd = db.command;
exports.main = async (event, context) => {

	//获取前端传递的用户id和文章id
	const {
		userId,
		articleId
	} = event;

	const {
		data
	} = await db.collection('user').doc(userId).get();
	//获取用户的收藏文章数组
	const saveLikes = data[0].article_likes_ids;

	//定义一个中间数组
	let updatedSaveLikes = null;
	let msg = '';
	if (saveLikes.includes(articleId)) {
		//若收藏文章数组包含前台传递的文章id 取消收藏(删除)
		updatedSaveLikes = dbCmd.pull(articleId);
		msg = '您取消了收藏';
	} else {
		//若收藏文章数组不包含前台传递的文章id 收藏(新增)
		updatedSaveLikes = dbCmd.addToSet(articleId);
		msg = '收藏成功';
	}

	//更新用户信息
	await db.collection('user').doc(userId).update({
		article_likes_ids: updatedSaveLikes
	});

	//获取更新后的用户信息
	const res = await db.collection('user').doc(userId).get();
	const updatedUserInfo = res.data[0]





	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg,
			updatedUserInfo,
		}
	}
};
