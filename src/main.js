import Vue from "vue"
// + 导入App.vue
// import App from "./App.vue"

//导入路由文件
import VueRouter from 'vue-router'
//导入 vant-ui组件
import Vant from 'vant'
import {Toast} from 'vant'

//导入axios挂载到原型
import axios from 'axios'

//导入组件
import App from "@/App"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Personal from "@/pages/Personal"

//在.vue文件中要使用router-link或者router-view需要注册下插件
Vue.use(VueRouter);
//注册 Vant
Vue.use(Vant)

//把 axios 挂载到原型
Vue.prototype.$axios=axios;
//基准路径，以后每次请求都会自动在前面加上该路径
axios.defaults.baseURL='http://localhost:3000'

//2.创建路由配置
const routes=[
    {path:'/',component:Login},
    {path:'/login',component:Login},   
    {path:'/register',component:Register},
    {path:'/personal',component:Personal},
]
//3.创建对象
const router=new VueRouter({
    routes
})
//axios的统一的拦截器，拦截响应
//固定的声明
axios.interceptors.response.use(res=>{
    const {message,statusCode}=res.data;
    if(message && statusCode==401){
        Toast.fail(message);
    }
    return res
})

new Vue({
    el: "#app",
    //4.将路由挂载到根实例
    router,


    // data: {
    //     message: "hello webpack and vue!"
    // }
    render: function(createElement){
        return createElement(App)
    }
})