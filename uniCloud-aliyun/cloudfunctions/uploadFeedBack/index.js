'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		opinion,
		cloundImageList,
		userId,
	} = event;
	
	await db.collection('feedBack').add({
		opinion,
		cloundImageList,
		userId,
	})
	

	//返回数据给客户端
	return {
		code:0,
		data:{
			msg:"提交成功"
		}
	}
};
