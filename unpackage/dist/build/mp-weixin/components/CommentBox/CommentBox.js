(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/CommentBox/CommentBox"],{"0738":function(n,t,e){},"40a6":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={name:"CommentBox",props:{commentInfo:{type:Object,required:!0},isReply:{type:Boolean,default:!1}},methods:{replyComment:function(n){n.isReply&&(n.comment.reply_id=n.comment.comment_id,n.comment.comment_id=this.commentInfo.comment_id),this.$emit("replyComment",n)}}};t.default=o},"482f":function(n,t,e){"use strict";var o=e("0738"),u=e.n(o);u.a},"4ff7":function(n,t,e){"use strict";e.r(t);var o=e("b550"),u=e("d984");for(var r in u)"default"!==r&&function(n){e.d(t,n,(function(){return u[n]}))}(r);e("482f");var i,c=e("f0c5"),f=Object(c["a"])(u["default"],o["b"],o["c"],!1,null,"f69057c0",null,!1,o["a"],i);t["default"]=f.exports},b550:function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return r})),e.d(t,"a",(function(){return o}));var o={uniDateformat:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat")]).then(e.bind(null,"8284"))},CommentBox:function(){return Promise.resolve().then(e.bind(null,"4ff7"))}},u=function(){var n=this,t=n.$createElement;n._self._c},r=[]},d984:function(n,t,e){"use strict";e.r(t);var o=e("40a6"),u=e.n(o);for(var r in o)"default"!==r&&function(n){e.d(t,n,(function(){return o[n]}))}(r);t["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/CommentBox/CommentBox-create-component',
    {
        'components/CommentBox/CommentBox-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4ff7"))
        })
    },
    [['components/CommentBox/CommentBox-create-component']]
]);
