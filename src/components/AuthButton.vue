<template>
  <div class="button" @click="handleClick">
      {{text}}
  </div>
</template>

<script>
export default {
    props:['text'],
    methods:{
        handleClick(e){
            this.$emit('click',e)
        }
    }
}
</script>

<style>
    .button{
        padding: 10px 0;
        width: 100%;
        height: 48/360*100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #d81e06;
        color: #fff;
        border-radius: 50px;
        font-style: 20px;
    }
</style>