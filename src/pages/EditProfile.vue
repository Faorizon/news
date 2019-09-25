<template>
  <div>
      <headerNormal title="编辑资料"></headerNormal>
      <!-- 头像 -->
      <div class="head">
          <img :src="profile.head_img" alt="">
          <!-- vant上传文件组件 -->
          <van-uploader :after-read="afterRead" class="uploader"/>
      </div>
      <!-- 调用条形组件 -->

      <CellBar label="昵称" :text="profile.nickname" @click="show1 = !show1"/>
      <!-- 编辑昵称的输入框 -->
      <van-dialog
            v-model="show1"
            title="编辑昵称"
            show-cancel-button
            @confirm="handleNickname"
            >
            <!-- 读取value昵称 -->
            <van-field :value="profile.nickname" placeholder="请输入用户名" ref="nickname"/>
      </van-dialog>

      <CellBar label="密码" text="profile.password" type="password"/>
      <CellBar label="性别" :text="profile.gender===1 ? '男' : '女'"/>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal"
import CellBar from "@/components/CellBar"
export default {
    data(){
        return{
            //用户详情
            profile:{},
            //昵称弹窗
            show1:false,
        }
    },
    components:{
        HeaderNormal,
        CellBar
    },
    methods:{
        afterRead(file){
            //构造表单数据
            const formData=new FormData();
            // console.log(file)
            formData.append('file',file.file);
            this.$axios({
                url:"/upload",
                method:"POST",
                //添加头信息
                headers:{
                    Authorization:localStorage.getItem("token")
                },
                data:formData
            }).then(res=>{
                // console.log(res)
                const {data} = res.data;
                //替换用户头像
                this.profile.head_img=this.$axios.defaults.baseURL+data.url
                // console.log(this.profile.head_img)
                this.$axios({
                    url:'/user_update/'+localStorage.getItem('user_id'),
                    method:'POST',
                    //添加头信息
                    headers:{
                        Authorization:localStorage.getItem("token")
                    },
                    data:{
                        head_img:data.url
                    }
                }).then(res=>{
                    const {message} = res.data;
                    //成功的弹框提示
                    if(message==='修改成功'){
                        this.$toast.success(message);
                    }
                })
            })
        },
        handleNickname(){
            
            //获取input输入框的值
            const value=this.$refs.nickname.$refs.input.value;
            // console.log(value)
            //提交到编辑资料的接口
            this.$axios({
                url:'/user_update/'+localStorage.getItem('user_id'),
                method:'post',
                //添加头信息
                headers:{
                    Authorization:localStorage.getItem("token")
                },
                data:{
                    nickname:value
                }
            }).then(res=>{
                const {message} = res.data;
                //成功的弹框提示
                if(message==='修改成功'){
                    //刷新或者说替换掉页面的昵称
                    this.profile.nickname=value;
                    
                    this.$toast.success(message);
                }
            })
        }
    },
    
    mounted(){
        //请求个人资料接口
        this.$axios({
            url:"/user/"+localStorage.getItem("user_id"),
            // 添加头信息
            headers:{
                Authorization:localStorage.getItem("token")
            }
        }).then(res=>{
            const {data}=res.data;
            if(data){
                //保存到profile
                this.profile=data;
                //如果用户有头像
                if(data.head_img){
                this.profile.head_img=this.$axios.defaults.baseURL+data.head_img;
                
                }else{
                    this.profile.head_img='./static/default_green.jpg'
                }
            }
        })
    }
}
</script>

<style scoped lang="less">
    .head{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        position: relative;
        .uploader{
            position: absolute;
            opacity: 0;
        }

        img{
            display: block;
            width: 100/360*100vw;
            height: 100/360*100vw;
            border-radius: 50%;
        }
        //修改第三方库的样式，需要在前面加上 /deep/
        /deep/.van-uploader__upload{
            width:100/360*100vw;
            height: 110/360*100vw;
        }
    }
</style>