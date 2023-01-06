import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

// mymain主路由一
// import MyMain from '@/page/MyMain'
// mymain子路由一
// import ContentList from '@/page/MyMain/ContentList'

// myAnotherMain主路由二
// import MyAnotherMain from '@/page/MyAnotherMain'

const router = new VueRouter({
    routes: [
        // home(现在是 mymain)
        {
            path: '/',
            redirect:'/favoriteList',
            // component: () => import('@/page/FavoriteList')
        },
        // login
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/page/Login')
        },
        // favoriteList
        {
            path: '/favoriteList',
            name: 'FavoriteList',
            component: () => import('@/page/FavoriteList'),
            children: [
                // myMain
                {
                    path:'/',
                    redirect:'myMain'
                },
                {
                    path: 'myMain',
                    name: 'MyMain',
                    component: () => import('@/page/FavoriteList/MyMain'),
                    children: [
                        {
                            path: '/',
                            redirect:'contentList'
                        },
                        {
                            path: 'contentList',
                            name: 'ContentList',
                            component: () => import('@/page/FavoriteList/MyMain/ContentList')
                        }
                    ]
                },
                // myAnotherMain
                {
                    path:'myAnotherMain',
                    name:'MyAnotherMain',
                    component: ()=> import('@/page/FavoriteList/MyAnotherMain')
                }
            ]
        },
        // chat room
        {
            path:'/chatRoom',
            name:'ChatRoom',
            component: ()=> import('@/page/ChatRoom')
        }
    ]
})

router.beforeEach((to,from,next)=>{
    console.log('to',to)
    console.log('from',from)
    next()
})

export default router