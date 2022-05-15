'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {userId,personLablesId} = event;
	
	await db.collection('user').doc(userId).update({
		person_label_ids:[...personLablesId]
	})
	
	//返回数据给客户端
	return {
		code:0,
		data:{
			msg:'修改成功'
		}
	}
};
