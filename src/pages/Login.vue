<template>
  <div class="box">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 用户输入框 -->
    <div>
      <AuthInput 
      placeholder="手机号" 
      :value="form.username" 
      @input="handleUsername"
      :rule="/^1[0-9]{4,10}$/"
      err_message="手机号码格式不正确"
      ></AuthInput>
    </div>
    <div>
      <AuthInput />
    </div>
    <button>登录</button>
  </div>
</template>


<script>
//导入输入框组件
import AuthInput from "@/components/AuthInput";

export default {
  data() {
    return {
      //   list: []
      form: {
        username: "",
        password: ""
      }
    };
  },
  //注册组件
  components: {
    AuthInput
  },
  methods: {
    handleUsername(value) {
      this.form.username = value;
    //   console.log(this.form.username)
    }
  }
};
</script>

<style lang="less">
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
}
</style>