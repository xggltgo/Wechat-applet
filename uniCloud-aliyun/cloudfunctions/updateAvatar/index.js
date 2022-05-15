'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		avatarUrl,
		userId,
	} = event;

	const {
		data
	} = await db.collection('user').doc(userId).get();
	const avatar = data[0].avatar;
	const id = data[0].id;

	try {
		await uniCloud.deleteFile({
			fileList: [avatar],
		});
	} catch (e) {
		console.log(e)
	}

	await db.collection('user').doc(userId).update({
		avatar: avatarUrl
	})

	await db.collection('article').where({
		"author.id": id
	}).update({
		"author.avatar": avatarUrl
	})

	//返回数据给客户端
	return {
		code:0,
		data:{
			msg:'修改头像成功'
		}
	}
};
