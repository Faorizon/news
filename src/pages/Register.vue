<template>
  <div class="box">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 用户名或电话输入框 -->
    <div class="inputs">
      <AuthInput
        placeholder="手机号/用户名"
        :value="form.username"
        @input="handleUsername"
        :rule="/^1[0-9]{4,10}$/"
        err_message="手机号码格式不正确"
      ></AuthInput>
    </div>

    <!-- 用户昵称 -->
    <div class="inputs">
      <AuthInput
        placeholder="昵称"
        v-model="form.nickname"
        :rule="/^[0-9a-zA-Z\u4e00-\u9fa5]{2,10}$/"
        err_message="昵称格式不正确"
      ></AuthInput>
    </div>

    <!-- 用户密码输入框 -->
    <div class="inputs">
      <AuthInput
        placeholder="密码"
        type="password"
        v-model="form.password"
        :rule="/^[0-9a-zA-Z]{3,12}$/"
        err_message="密码格式不正确"
      ></AuthInput>
    </div>
    <!-- 注册与登录的跳转 -->
    <p class="tips">
      有账号？
      <router-link to='/login'>去登录</router-link>
    </p>
    <!-- 按钮组件 -->
    <AuthButton text="注册" @click="handleSubmit" />
  </div>
</template>


<script>
//导入输入框组件
import AuthInput from "@/components/AuthInput";
//导入按钮组件
import AuthButton from "@/components/AuthButton";
//导入 axios 请求库
// import axios from "axios"

export default {
  data() {
    return {
      //   list: []
      form: {
        username: "",
        password: "",
        nickname:""
      }
    };
  },
  //注册组件
  components: {
    AuthInput,
    AuthButton
  },
  methods: {
    handleUsername(value) {
      this.form.username = value;
      //   console.log(this.form.username)
    },
    //登录按钮提交事件
    handleSubmit() {
      this.$axios({
        url: "/register",
        method: "POST", //相当于ajax中的type
        data: this.form
      }).then(res => {
        // console.log(res)
        const { message } = res.data;
        if (message == "注册成功") {
          this.$router.push("/login");
        }else{
          this.$toast.fail(message)
          // console.log(message)
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.box {
  padding: 20px;
  background-color: rgba(242, 242, 242, 1);
  .close {
    padding: 20px;
    span {
      font-size: 27/360 * 100vw;
    }
  }
  .logo {
    display: flex;
    justify-content: center;
    span {
      font-size: 126/360 * 100vw;
      color: #d81e06;
    }
  }
  .inputs {
    input {
      margin-bottom: 20px;
    }
  }
  .tips{
    text-align: right;
    margin-bottom: 20px;
    a{
      color:#3385ff;
    }
  }
}
</style>