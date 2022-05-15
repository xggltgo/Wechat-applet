'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	const {
		userId,
		articleId,
		commentContent,
		beRepliedCommentId = '', //被回复的评论的id
		reply_id = '',
		is_reply = false
	} = event;

	const {
		data
	} = await db.collection('user').doc(userId).get();
	//拿到发布评论的用户信息
	const user = data[0];

	const res = await db.collection('article').doc(articleId).get();
	const comments = res.data[0].commentInfo;

	function getId() {
		return Math.random().toString().substring(2, 10) + Date.now().toString(32)
	}

	let commentInfo = {
		comment_id: getId(), //评论id
		comment_content: commentContent, //评论内容
		comment_time: Date.now(), //评论时间
		is_reply, //是否是回复
		replyArr: [], //这条评论消息的回复数组
		author: {
			author_id: user._id, //评论人的id
			author_name: user.author_name, //评论人的名字
			avatar: user.avatar, //头像
			professional: user.professional, //职业
		},
	}

	if (beRepliedCommentId === '') {
		commentInfo = dbCmd.unshift(commentInfo)
	} else {
		let beRepliedAuthor = null;
		let beRepliedCommentIndex = comments.findIndex(item => item.comment_id === beRepliedCommentId)

		if (is_reply) {
		beRepliedAuthor = comments[beRepliedCommentIndex].replyArr.find(item => item.comment_id === reply_id).author.author_name;
		} else {

			beRepliedAuthor = comments.find(item => item.comment_id === beRepliedCommentId).author.author_name;
		}
		commentInfo.to = beRepliedAuthor;
		commentInfo = {
			[beRepliedCommentIndex]: {
				replyArr: dbCmd.unshift(commentInfo),
			}
		}
	}

	await db.collection('article').doc(articleId).update({
		commentInfo,
	})





	//返回数据给客户端
	return {
		code: 0,
		data: {
			msg: '评论成功'
		}
	}
};
