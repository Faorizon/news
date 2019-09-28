<template>
    <div class="container">
        <!-- 文章详情页的内容 -->
        <div class="article">
            <div class="header">
                <div class="header-left">
                    <span class="iconfont iconjiantou2" @click="$router.back()"></span>
                    <span class="iconfont iconnew"></span>
                </div>
                <span class="focus" v-if="!detail.has_follow" @click="handleFollow">关注</span>
                <span class="focus focus_active" v-else @click="handleUnfollow">已关注</span>
            </div>
            <h3>{{detail.title}}</h3>
            <p class="post-info">{{detail.user.nickname}} 2019-10-10</p>
            <div class="post-conten" v-html="detail.content"></div>
        </div>
        <div class="post-btns">
            <span @click="handleLike" :class="{like_active:detail.has_like}">
                <i class="iconfont icondianzan"></i>
                {{detail.like_length}}
            </span>
            <span>
                <i class="iconfont iconweixin"></i>
                微信
            </span>
        </div>
        <!-- 页脚组件 -->
        <PostFooter :post="detail" @handleStar="handleStar"/>
    </div>
</template>


<script>
import PostFooter from "@/components/PostFooter"
export default{
    data(){
        return{
            //文章的详情
            detail:{
                //提前设置空对象，避免报错
                user:{}
            }
        }
    },
    components:{
        PostFooter
    },
    methods:{
        handleFollow(){
            // console.log(123)
            //通过作者id关注用户
            this.$axios({
                url:"/user_follows/"+this.detail.user.id,
                //添加头信息
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            }).then(res=>{
                const {message}=res.data;
                // console.log(res)
                if(message==="关注成功"){
                    //修改关注的按钮的状态
                    this.detail.has_follow=true;
                    this.$toast.success(message)
                }
            })
        },
        handleUnfollow(){
            //通过作者id取消关注用户
            this.$axios({
                url:"/user_unfollow/"+this.detail.user.id,
                //添加头信息
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            }).then(res=>{
                const {message}=res.data;
                // console.log(res)
                if(message==="取消关注成功"){
                    //修改点赞的按钮的状态
                    this.detail.has_follow=false;
                    this.$toast.success(message)
                }
            })
        },
        //点赞
        handleLike(){
            
            this.$axios({
                url:"/post_like/"+this.detail.id,
                //添加头信息
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            }).then(res=>{
                const {message}=res.data;
                // console.log(res)
                if(message==="点赞成功"){
                    //修改点赞的按钮的状态
                    this.detail.has_like=true;
                    this.detail.like_length++
                }
                if(message==="取消成功"){
                    //修改点赞的按钮的状态
                    this.detail.has_like=false;
                    this.detail.like_length--
                }
                this.$toast.success(message)
            })
        },
        handleStar(){
            this.$axios({
                url:"/post_star/"+this.detail.id,
                //添加头信息
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            }).then(res=>{
                const {message}=res.data;
                // console.log(res)
                if(message==="收藏成功"){
                    //修改关注的按钮的状态
                    this.detail.has_star=true;
                    this.$toast.success(message)
                }
                if(message==="取消成功"){
                    //修改关注的按钮的状态
                    this.detail.has_star=false;
                    this.$toast.success(message)
                }
            })
        }
    },
    mounted(){
        //请求文章的详情
        const {id}=this.$route.params;

        const token=localStorage.getItem("token")

        //请求的配置
        const config={
            url:"/post/"+id
        }
        if(token){
            config.headers={
                Authorization:token
            }
        }
        this.$axios(config).then(res=>{
            const {data}=res.data
            this.detail=data
            // console.log()
        })
    }
}
</script>

<style lang="less" scoped>
    .container{
        padding-bottom: 100/360*100vw;
    }
    .article{
        padding: 0 20px;
        padding-top:60/360*100vw;
        .header{
            position: fixed;
            top:0;
            left: 0;
            width:100%;
            height: 60/360*100vw;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f6f6f6;
            .header-left{
                *{
                    vertical-align: middle;
                }
                .iconnew{
                    font-size: 60px;
                }
            }
            .focus{
                width:62/360*100vw;
                height:30/360*100vw;
                line-height: 30/360*100vw;
                // padding: 10px 15px;
                border: 1px solid gray;
                text-align: center;
                background-color: #ed4040;
                color: #fff;
                border-radius: 50px;
            }
            .focus_active{
                border:1px #ccc solid;
                color:#333;
                background: none;
            }
        }
        h3{
            margin-bottom: 5px;
        }
        .post-info{
            font-size: 12px;
            color:#999;
            margin-bottom: 15px;
        }
        .post-content{
            line-height: 1.5;         
        }
        /deep/img{
            max-width: 100%;
        }
    }
    .post-btns{
        margin-top:30px;
        display: flex;
        justify-content: space-around;
       
        span{
            padding:0 15px;
            height:30/360*100vw;
            line-height: 30/360*100vw;
            font-size: 12px;
            border:1px #ddd solid;
            border-radius: 50px;

        }
        .iconweixin{
            color:#07c907;
        }
        .like_active{
            border:1px red solid;
            i{
                color:red;
            }
        }
    }
</style>