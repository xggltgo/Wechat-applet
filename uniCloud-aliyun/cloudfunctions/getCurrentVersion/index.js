'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {

	const {
		data
	} = await db.collection('version').get();
	const current_version = data[0].current_version

	//返回数据给客户端
	return {
		code:0,
		msg:'',
		data:{
			version:current_version,
			downLoadLinkUrl:''
		}
	}
};
