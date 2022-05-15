'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {articleId,page=1,limit=10} = event;
	
	const list = await db.collection('article')
	    .aggregate()
	    .match({
	      _id: articleId,
	    })
	    .unwind('$commentInfo') // 从指定的节点进行内容的获取
	    .project({
	      commentInfo: 1
	    })
	    .replaceRoot({
	      newRoot: '$commentInfo'
	    })
	    .skip(limit * (page - 1))
	    .limit(limit)
	    .end()
	
	
	
	//返回数据给客户端
	return {
		code:0,
		msg:'',
		data:list.data
	}
};
