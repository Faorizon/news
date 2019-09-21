<template>
	<!-- template最外层只能包含一个标签 -->
  	<div>
        第一个单文件组件
        <router-link to="/login">登录</router-link>
        <router-view> </router-view>
    </div>
    
</template>

<script>
// 必须暴露一个对象，对象是组件的配置
export default {

}
</script>

<style>
/* 组件样式，会污染全局 */

</style>