'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {articleId} = event;
	
	await db.collection('article').doc(articleId).update({
		browse_count:dbCmd.inc(1)
	})
	const {data} = await db.collection('article').aggregate().match({
		_id:articleId
	}).end()
	
	//返回数据给客户端
	return {
		code:0,
		msg:'',
		data,
	}
};
