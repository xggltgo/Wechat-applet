'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {userId,articleId} = event;
	
	//查找点赞文章id字段
	const {data} = await db.collection('user').doc(userId).get();
	const thumbs_up_article_ids = data[0].thumbs_up_article_ids;
	let msg = '';
	let transfer = null;
	let num = 0
	//判断点赞文章id字段是否包含本次传递过来的文章id
	if(thumbs_up_article_ids.includes(articleId)){
		msg='您取消了点赞';
		transfer = dbCmd.pull(articleId)
		num=-1;
		//移除 取消点赞
	}else{
		//添加 点赞
		msg='点赞成功';
		transfer = dbCmd.addToSet(articleId);
		num=1;
	}
	
	await db.collection('user').doc(userId).update({
		thumbs_up_article_ids:transfer,
	})
	
	await db.collection('article').doc(articleId).update({
		thumbs_up_count:dbCmd.inc(num),
	})
	
	//返回数据给客户端
	return {
		code:0,
		data:{
			msg,
		}
	}
};
