import axios from "axios"

// 对axios 进行二次封装
const request = axios.create({
    // baseURL:"/api",
    // 请求超时时间 8s
    timeout:8000
})

// 请求拦截器
request.interceptors.request.use((config)=>{
    // 发送请求
    console.log("@api/requset.js","发送请求")
    
    // 获取token
    const token = localStorage.getItem("token")
    console.log('请求发送中 token',token)
    config.headers.Authorization = `AToken ${token}`
    
    return config
},(error)=>{
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((res)=>{
    // 响应成功
    // console.log("@api/request.js","响应成功")
    // console.log(res.data)
    
    const {authorization} = res.headers
    console.log('响应返回中 authorization',authorization)
    authorization && localStorage.setItem("token",authorization)
    console.log("res",res)
    return res.data
},(error)=>{
    // 响应失败
    // console.log("@api/request.js","响应失败")
    const {status} = error.response
    if(status === 401){
        // 移除token
        localStorage.removeItem("token")
        // 跳转到 login
        window.location.href = 'http://localhost:8080/#/login'
    }

    return Promise.reject(new Error('false'))
})

export default request