<template>
  <input class="input" 
  :class="{
    success:status=='success',
    error:status=='error'
    }" 
  :placeholder="placeholder" 
  :value="value" 
  @input="handleInput" 
  @change="handleChange"
  />
</template>

<script>
export default {
  data(){
    return{
      status:''
    }
  },
  props: ["placeholder", "value", "name", "rule","err_message"],
  mounted(){
    //   console.log(this.rule)
  },
  methods:{
      handleInput(e){
        //  this.$emit("input",e.target.value) 
        //  console.log(e.target.value)
        //每当input 事件触发获取 输入的 value值
        const {value} = e.target;
        this.$emit("input",value)
        if(this.rule){
          if(this.rule.test(value)){
            this.status="success";
          }else{
            this.status="error"
          }
        }
      },
      //输入框失去焦点时被触发
      handleChange(){
        if(this.err_message && this.status=='error'){
          alert(this.err_message)
        }
      }
  }
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
  height: 38/360 * 100vw;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  border: none;
  outline: none;
  border-bottom: 1px solid #757575;
}
.success{
  border-bottom-color: blue
}
.error{
  border-bottom-color: red
}
</style>