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
                <!-- 使用文章分页模块 -->
                <!-- v-model:列表是否在加载 -->
                <!-- finished:是否加载完毕 -->
                <!-- load：到底部触发事件 -->
                <van-list 
                    v-model="item.loading"
                    :finished="item.finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
                >
                    <!-- 循环文章模板 -->
                    <PostCard
                    v-for="(item,index) in item.posts"
                    :key="index"
                    :post="item"
                    />
                </van-list>
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
            // posts:[],
            //是否在加载，加载完毕后需要手动变为false
            //loading:false,
            //是否有更多数据，如果加载完所有的数据，改为true
            //finished:false,

            //分页变量
            pageIndex:1,
            //每页加载信息的条数
            pageSize:5
        }
    },
    watch:{
        active(){
            this.cid=this.categories[this.active].id;
            // console.log(this.cid)
            this.onLoad();
        }
    },
    components:{
        PostCard
    },
    methods:{
        onLoad(){
            setTimeout(()=>{
                // console.log(123)
                this.$axios({
                    url:`/post?category=${this.categories[this.active].id}&pageIndex=${this.categories[this.active].pageIndex}&pageSize=${this.pageSize}`
                }).then(res=>{
                    // console.log(res)
                    const {data} = res.data;
                    // console.log(data)
                    // console.log(data)
                    if(data.length<this.pageSize){
                        this.categories[this.active].finished=true;
                    }
                    this.categories[this.active].posts=[...this.categories[this.active].posts,...data]
                    
                    // 页数加一
                    this.categories[this.active].pageIndex++
                    //告诉onLoad事件这次的数据加载已经完毕，下次可以继续的触发onload
                    this.categories[this.active].loading=false;
                })
            },400)
        }
    },
    mounted(){
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
            const newData=[];

            //循环栏目，给每个栏目添加以下四个属性
            data.forEach(v=>{
                v.posts=[];
                v.loading=false;
                v.finished=false;
                v.pageIndex=1;
                newData.push(v)
            })
            //将带有四个独立属性的栏目列表存入categories
            this.categories=newData;
        
            //请求文章列表
            this.$axios({
                url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
            }).then(res=>{
                const {data} =res.data
                // 默认赋值给头条的列表
                this.categories[this.active].posts = data;
                // console.log(data)
                this.categories[this.active].pageIndex++;
                // console.log(this.categories[this.active].posts)
            })
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