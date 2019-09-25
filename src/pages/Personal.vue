<template>
    <div>
        <router-link to='edit_profile'>
            <div class="profile">
                <img :src="profile.head_img" alt="">
                <div class="profile-center">
                    <div class="name">
                        <span class="iconfont iconxingbienan"></span>
                        火星网友
                    </div>
                    <div class="time">
                        2019-9-24
                    </div>
                </div>
                <span class="iconfont iconjiantou1"></span>
            </div>
        </router-link>
        <router-link to='user_follow'>
            <CellBar label="我的关注" text="我的用户"></CellBar>
        </router-link>
        
        <router-link to='user_comment'>
            <CellBar label="我的跟帖" text="跟帖/回复"></CellBar>
        </router-link>
        <CellBar label="我的收藏" text="文章/视频"></CellBar>
        <CellBar label="退出" @click="handleLogout"></CellBar>
    </div>  
</template>

<script>
//导入条形组件
import CellBar from "@/components/CellBar"
export default {
    data(){
        return {
            profile:{}
        }
    },
    components:{
        CellBar
    },
    methods:{
        //退出登录，就是将本地token和id清楚
        handleLogout(){
            console.log(123)
            localStorage.removeItem("token")
            localStorage.removeItem("user_id")

            //替换上一个页面
            this.$router.replace("/login")
        }
    },
    mounted(){
        //请求个人资料接口
        this.$axios({
            url:'/user/'+localStorage.getItem("user_id"),
            method:'get',
            //添加头信息
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }).then(res=>{
            // console.log(res)
            const {data} = res.data;
            //保存到data
            this.profile=data
            if(data.head_img){
                this.profile.head_img=this.$axios.defaults.baseURL+data.head_img;
                
            }else{
                this.profile.head_img='./static/default_green.jpg'
            }
        })
    }
    
}
</script>

<style lang="less" scoped>
    .profile{
        display: flex;
        padding:20px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 5px #eee solid;
        img{
            width:70/360*100vw;
            height:70/360*100vw;
            border-radius: 50%
        }
        .profile-center{
            flex:1;
            padding:0 10px;
        }
        .name{
            span{
                color:#75b9eb
            }
        }
        .time{
            color:#666;
            font-size:14px;
            margin-top:5px
        }
    }



</style>