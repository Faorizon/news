<template>
    <div>
        <!-- 红色块头部 -->
        <div class="header">
            <span class="iconfont iconnew logo"></span>
            <div class="header-search">
                <span class="iconfont iconsearch"></span>
                <i>搜索新闻</i>
            </div>
            <router-link to="/personal">
                <span class="iconfont iconwode personal"></span>
            </router-link>
        </div>
        <van-tabs v-model="active" sticky swipeable>
            <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
                    <!-- 循环文章模板 -->
                    <PostCard
                    v-for="(item,index) in posts"
                    :key="index"
                    :post="item"
                    />
                
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
//引入文章列表模块
import PostCard from "@/components/PostCard"
export default {
    data(){
        return{
            // active:1,
            //当前默认栏目，没有登录应该0，有登录1，也就是默认头条
            active:localStorage.getItem("token") ? 1:0,
            //栏目列表数据
            categories:[],
            //栏目id
            cid:999,

            //默认头条文章列表
            posts:[]
        }
    },
    watch:{
        active(){
            this.cid=this.categories[this.active].id;
            // console.log(this.cid)
        }
    },
    components:{
        PostCard
    },
    mounted(){
        // //获取所有栏目数据
        // this.$axios({
        //     url:'/category',
        // }).then(res=>{
        //     // console.log(res)
        //     const {data} =res.data;
        //     this.categories=data
        // })
        const config={
            url:"/category",
        }
        if(localStorage.getItem('token')){
            config.headers={
                Authorization:localStorage.getItem("token")
            }
        }
        this.$axios(config).then(res=>{
            // console.log(res)
            const {data} =res.data;
            this.categories=data
        })
        //请求文章列表
        this.$axios({
            url:`/post?pageIndex=1&pageSize=5&category=${this.cid}`
        }).then(res=>{
            const {data} =res.data
            // console.log(data)
            this.posts=data
        })
    }

}
</script>

<style scoped lang="less">
    .header{
        display: flex;
        height: 50/360*100vw;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        background-color: #f00;

        .logo{
            font-size: 50/360*100vw;
            color:#fff;
        }
        .personal{
            font-size: 22/360*100vw;
            color:#fff;
        }
        .header-search{
            height: 34/360*100vw;
            background: rgba(255,255,255,.5);
            flex:1;
            margin: 0 20px 0 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color:#fff;
            border-radius: 50px;
            i{
                font-size: 14px;
                margin-left: 5px;
            }
        }
    }
    /deep/.van-tabs__nav{
        background-color: #f6f6f6;
    }
    /deep/.van-tabs__line{
        width:40px;
        height: 1px;
    }

</style>