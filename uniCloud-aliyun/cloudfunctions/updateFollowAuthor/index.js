'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {userId,authorId} = event;
	
	//查找关注作者id字段
	const {data} = await db.collection('user').doc(userId).get();
	const author_likes_ids = data[0].author_likes_ids;
	let msg = '';
	let transfer = null;
	//判断关注作者id字段是否包含本次传递过来的作者id
	if(author_likes_ids.includes(authorId)){
		msg='您取消了关注';
		transfer = dbCmd.pull(authorId)
		//移除 取消关注
	}else{
		//添加 关注
		msg='关注成功';
		transfer = dbCmd.addToSet(authorId)
	}
	
	await db.collection('user').doc(userId).update({
		author_likes_ids:transfer,
	})
	
	//返回数据给客户端
	return {
		code:0,
		data:{
			msg,
		}
	}
};
