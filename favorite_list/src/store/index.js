import Vue from 'vue'
import Vuex from 'vuex'

// 使用插件
Vue.use(Vuex)

import { reqRegister, reqLogin, reqFavoriteList, addTagListToFavoriteList, addContenttoContentList, reqCollectionTimeList } from '@/api'

const state = {
    // 收藏列表
    favoriteList:[],
    // 收藏时间列表
    collectionTimeList:[]
    // 添加标签列表 表单 的 返回信息
    // addTagList:{}
}

const actions = {
    // 注册
    async register(userInfoForm){
        console.log('store/actions/register',userInfoForm)
        let result = await reqRegister(userInfoForm)
        if(result.code == 1){
            return result
        }
    },
    // 登录
    async login(userInfo){
        console.log('/store/actions/login',userInfo)
        let result = await reqLogin(userInfo)
        if(result.code == 1){
            return result
        }
    },
    // 向服务器 请求 收藏列表数据
    async favoriteList({commit}){
        let result = await reqFavoriteList()
        // console.log(result)
        if(result.status >= 200 && result.status <400){
            // console.log("@store/index.js","actions/favoriteList")
            commit("FavoriteList",result.data)
        }
    },
    // 向服务器 post 新的标签列表 给 收藏列表
    async addTagList(fromInfo){
        // console.log("@store/index.js/actions/addTaglist",fromInfo)
        // console.log("提交添加标签列表表单",fromInfo)
        let result = await addTagListToFavoriteList(fromInfo)
        // console.log("@store/index.js/actions/addTaglist", result)
        if(result.status >= 200 && result.status <400){
            console.log("@store/index.js/actions/addTagList",result.data)
            // commit("AddTagList",result.data)
            return result
        }
    },

    // 向服务器 post 收藏表单（添加收藏）给 收藏列表/标签列表/内容列表
    async addContent(fromInfo){
        let result = await addContenttoContentList(fromInfo)
        // console.log()
        if(result.status >= 200 && result.status < 400){
            console.log("@store/index.js/actions/addContent", result.data)
            return result
        }
    },
    // 向服务器 get 收藏时间列表
    async collectionTimeList({commit}){
        let result = await reqCollectionTimeList()
        if(result.status >= 200 && result.status < 400){
            commit("CollectionTimeList",result.data)
        }
    }
}

const mutations = {
    // 返回 数据给state/favoriteList
    FavoriteList(state, favoriteList){
        // console.log("@store/index.js","mutations")
        state.favoriteList = favoriteList
    },

    // 返回 数据给state/collectionTimeList
    CollectionTimeList(state, collectionTimeList){
        state.collectionTimeList = collectionTimeList
    }

    // 返回 数据给state/addTagList
    // AddTagList(state, addTagList){
    //     state.addTagList = addTagList
    // }
}

const getters = {}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})