'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		classify,
		page = 1,
		limit = 10
	} = event;
	let matchObj = {};
	if (classify !== '全部') {
		matchObj = {
			classify
		}
	}

	const collection = db.collection('article');
	const res = await collection.aggregate().match(matchObj).project({
		content: 0
	}).skip(limit * (page - 1)).limit(limit).end();

	const {
		total
	} = await collection.where(matchObj).count();

	//返回数据给客户端
	return {
		code: 0,
		msg: '',
		data: {
			articleList: res.data,
			total
		}
	}
};
