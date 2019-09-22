import Vue from "vue"
// + 导入App.vue
// import App from "./App.vue"

//导入路由文件
import VueRouter from 'vue-router'
//导入 vant-ui组件
import Vant from 'vant'
//导入axios挂载到原型
import axios from 'axios'

//导入组件
import App from "@/App"
import Login from "@/pages/Login"

//在.vue文件中要使用router-link或者router-view需要注册下插件
Vue.use(VueRouter);
//注册 Vant
Vue.use(Vant)

//把 axios 挂载到原型
Vue.prototype.$axios=axios;

//2.创建路由配置
const routes=[
    {path:'/login',component:Login},
    {path:'/',component:Login}
]
//3.创建对象
const router=new VueRouter({
    routes
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