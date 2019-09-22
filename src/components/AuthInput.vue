<template>
  <input class="input" :placeholder="placeholder" :value="value" @input="handleInput" />
</template>

<script>
export default {
  props: ["placeholder", "value", "name", "rule","err_message"],
  mounted(){
    //   console.log(this.rule)
  },
  methods:{
      handleInput(e){
        //  this.$emit("input",e.target.value) 
        //  console.log(e.target.value)
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
</style>