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
import EditProfile from "@/pages/EditProfile"
import UserFollow from "@/pages/UserFollow"
import UserComment from "@/pages/UserComment"
import Index from "@/pages/Index"

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
    {path:'/',component:Index},
    {path:'/login',component:Login},   
    {path:'/register',component:Register},
    {path:'/personal',component:Personal},
    {path:'/edit_profile',component:EditProfile},
    {path:'/user_follow',component:UserFollow},
    {path:'/user_comment',component:UserComment},
    {path:'/index',component:Index}
]
//3.创建对象
const router=new VueRouter({
    routes
})

//路由守卫，就是一页面跳转之前的拦截器
// to要跳转之后的页面，去哪里
// from跳转之前的页面，来自哪里
// next 必须调用next(),调用才会执行跳转，还可以重定向，next('/login')
router.beforeEach((to,from,next)=>{
    //是否有 token
    const hasToken=localStorage.getItem("token");
    //判断是否需要登录权限的页面
    if(to.path=='/personal' || to.path === "/edit_profile"){
        //判断本地是否有token
        if(hasToken){
            //正常跳转
            next();
        }else{
            //没有token正常跳转到登录
            next('/login')
        }
    }else{
        //所有人都可以访问的页面正常浏览
        next();
    }
})

//axios的统一的拦截器，拦截响应
//固定的声明
axios.interceptors.response.use(res=>{
    const {message,statusCode}=res.data;
    if(message && statusCode==401){
        Toast.fail(message);
    }
    //token过期了，或者token无效，一般引起的原因可能token被清空了，密码修改了
    if(message=="用户信息验证失败"){
        //跳转到登录
        router.push('/login')
    }
    return res
})

new Vue({
    el: "#app",
    //4.将路由挂载到根实例
    router,


    render: function(createElement){
        return createElement(App)
    }
})