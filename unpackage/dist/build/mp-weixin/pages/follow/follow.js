(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/follow/follow"],{"0dd7":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=u(e("a34a"));function u(t){return t&&t.__esModule?t:{default:t}}function o(t,n,e,r,u,o,i){try{var a=t[o](i),c=a.value}catch(f){return void e(f)}a.done?n(c):Promise.resolve(c).then(r,u)}function i(t){return function(){var n=this,e=arguments;return new Promise((function(r,u){var i=t.apply(n,e);function a(t){o(i,r,u,a,c,"next",t)}function c(t){o(i,r,u,a,c,"throw",t)}a(void 0)}))}}var a={onLoad:function(){var n=this;this.userInfo&&(t.$on("clickSaveLike",(function(){n._getSaveLikeArticle("no-loading")})),t.$on("clickThumbsUp",(function(){n._getFollowAuthor("no-loading")})),this._getSaveLikeArticle(),this._getFollowAuthor())},onShow:function(){this.userInfo||t.redirectTo({url:"/pages/userInfo/login/login"})},data:function(){return{currentIndex:0,articleList:[],authorList:[],text:"loading..."}},methods:{_getSaveLikeArticle:function(t){var n=this;return i(r.default.mark((function e(){var u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$http.getSaveLikeArticle({userId:n.userInfo&&n.userInfo._id,isLoading:t});case 2:u=e.sent,n.articleList=u,n.text="您还没有收藏文章";case 5:case"end":return e.stop()}}),e)})))()},_getFollowAuthor:function(t){var n=this;return i(r.default.mark((function e(){var u;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$http.getFollowAuthor({userId:n.userInfo&&n.userInfo._id,isLoading:t});case 2:u=e.sent,n.authorList=u;case 4:case"end":return e.stop()}}),e)})))()}}};n.default=a}).call(this,e("543d")["default"])},"4e86":function(t,n,e){"use strict";var r=e("a110"),u=e.n(r);u.a},"5fae":function(t,n,e){"use strict";e.r(n);var r=e("c30a"),u=e("7664");for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);e("4e86");var i,a=e("f0c5"),c=Object(a["a"])(u["default"],r["b"],r["c"],!1,null,"00ed5413",null,!1,r["a"],i);n["default"]=c.exports},7664:function(t,n,e){"use strict";e.r(n);var r=e("0dd7"),u=e.n(r);for(var o in r)"default"!==o&&function(t){e.d(n,t,(function(){return r[t]}))}(o);n["default"]=u.a},a110:function(t,n,e){},c30a:function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return r}));var r={ArticleList:function(){return e.e("components/ArticleList/ArticleList").then(e.bind(null,"d266"))},NoData:function(){return e.e("components/NoData/NoData").then(e.bind(null,"652c"))}},u=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.currentIndex=0},t.e1=function(n){t.currentIndex=1},t.e2=function(n){t.currentIndex=n.detail.current})},o=[]},f800:function(t,n,e){"use strict";(function(t){e("a649");r(e("66fd"));var n=r(e("5fae"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])}},[["f800","common/runtime","common/vendor"]]]);