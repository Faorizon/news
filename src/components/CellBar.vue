<template>
  <div class="cell-wrap">
      <div class="cell" @click="handleOut">
          <span>{{label}}</span>
          <!-- 如果type等于password，显示*号 -->
          <i>{{type === "password" ? '******' : text}}</i>
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
    props:["label","text","type"],
    methods:{
        handleOut(){
            this.$emit('click')
        }
    }
}
</script>

<style scoped lang="less">
    .cell-wrap{
        padding-left:10px;
        .cell{
            display:flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 10px;
            height: 48/360*100vw;
            border-bottom: 1px #eee solid;
            i{
                display: block;
                flex: 1;
                text-align: right;
                padding: 0 10px;
                font-size:14px;
                color:#999;
            }
        }
    }

</style>