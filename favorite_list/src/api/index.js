import request  from "./request"

// 注册
export const reqRegister = (userInfoForm)=>request({url:'/user/register',method:'post',data:userInfoForm})
// 登录
export const reqLogin = (userInfo)=>request({url:'/user/login',method:'post',data:userInfo})
// 收藏列表接口
// 请求收藏列表
export const reqFavoriteList = ()=>request({url:'/api/favoriteList/tagList',method:'get'})
// 添加标签列表 到 收藏列表
export const addTagListToFavoriteList = (tagListData)=>request({url:'/api/favoriteList/tagList/',method:'post',data:tagListData})
// 添加收藏
export const addContenttoContentList = (contentData)=>request({url:'/api/favoriteList/tagList/contentList',method:'post',data:contentData})

//收藏时间列表接口
export const reqCollectionTimeList = ()=>request({url:'/api/favoriteList/collectionTimeList',method:'get'}) 