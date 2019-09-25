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

      <CellBar label="密码" text="profile.password" type="password" @click="show2=!show2"/>
      <!-- 编辑密码的输入框 -->
      <van-dialog
            v-model="show2"
            title="编辑密码"
            show-cancel-button
            @confirm="handlePassword"
            >
            <!-- 读取value昵称 -->
            <van-field :value="profile.password" placeholder="请输入密码" ref="password"/>
      </van-dialog>

      <CellBar label="性别" :text="profile.gender===1 ? '男' : '女'" @click="show3=!show3"/>
      <van-dialog 
       v-model="show3" 
       title="编辑性别"
       show-cancel-button
       @confirm="handleGender"
       >
       <van-radio-group  v-model="genderCache">
            <van-cell-group>
                <van-cell title="男" clickable @click="genderCache = '1'">
                    <van-radio slot="right-icon" name="1" />
                </van-cell>
                <van-cell title="女" clickable @click="genderCache = '0'">
                    <van-radio slot="right-icon" name="0" />
                </van-cell>
            </van-cell-group>
       </van-radio-group>
      </van-dialog>
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
            show2:false,
            show3:false,
            genderCache:'1'
        }
    },
    components:{
        HeaderNormal,
        CellBar
    },
    methods:{
        //请求编辑资料的接口
        //data要提交给接口的数据
        editProfile(data,callback){
             this.$axios({
                url:'/user_update/'+localStorage.getItem('user_id'),
                method:'post',
                //添加头信息
                headers:{
                    Authorization:localStorage.getItem("token")
                },
                data
            }).then(res=>{
                const {message} = res.data;
                //成功的弹框提示
                if(message==='修改成功'){
                    //传入回调函数
                    //等于 callback && callback()
                    if(callback){
                        callback();
                    }
                    this.$toast.success(message);
                }
            })
        },
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
                this.editProfile({head_img:data.url})
            })
        },

        handleNickname(){  
            //获取input输入框的值
            const value=this.$refs.nickname.$refs.input.value;
            // console.log(value)
            //提交到编辑资料的接口
            this.editProfile({nickname:value},()=>{
                this.profile.nickname=value;
            })
        },
        handlePassword(){
            //获取input输入框的值
            const value=this.$refs.password.$refs.input.value;
            this.editProfile({nickname:value},()=>{
                this.profile.password=value;
            })
        },
        handleGender(){
            console.log()
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
                //将后台返回的性别赋值给genderCache,性别需要转换成字符串
                this.genderCache=String(data.gender)

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