<template>
    <div>
        <HeaderNormal title="我的关注"/>
        <!-- 关注用户的列表 -->
        <div 
        class="follow-item"
        v-for="(item,index) in list"
        :key="index"
        >
            <img :src="$axios.defaults.baseURL+item.head_img" alt="">
            <div class="item-center">
                <p>{{item.nickname}}</p>
                <span>2019-9-25</span>
            </div>
            <span class="cancel" @click="handleCancel(index)">取消关注</span>
        </div>
    </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal"

export default {
    data(){
        return{
            list:[]
        }
    },
    components:{
        HeaderNormal
    },
    methods:{
        handleCancel(index){
            //获取要取消关注用户的id
            const id=this.list[index].id;
            this.$axios({
                url:"/user_unfollow/"+id,
                //添加头信息
                headers:{
                    Authorization:localStorage.getItem("token")
                },
            }).then(res=>{
                const {message}=res.data;
                if(message==="取消关注成功"){
                    this.list.splice(index,1);
                    //提示用户删除成功
                    this.$toast.success(message);
                }
            })
        }
    },
    mounted(){
        //请求用户关注的列表
        this.$axios({
            url:"/user_follows",
            //添加头信息
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(res=>{
            const {data}=res.data;
            //赋值给关注的列表
            this.list=data;
        })
    }
}
</script>

<style scoped lang="less">
    .follow-item{
        padding: 20px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px #ccc solid;

        img{
            display:block;
            width:60/360*100vw;
            height: 60/360*100vw;
            border-radius: 50%;
        }
        .item-center{
            flex:1;
            padding: 15px 0 0px 10px;
            span{
                color:#999;
                font-size: 12px;
            }
        }
        .cancel{
            margin-top: 15px;
            display: block;
            background-color: #ccc;
            padding: 0 10px;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            border-radius: 50px;
        }
    }
</style>