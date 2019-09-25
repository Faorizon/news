<template>
  <div>
      <HeaderNormal title="我的跟帖"/>

      <!-- 品论列表 -->
      <div class="comment-item">
        <div class="time">2019-9-25</div>

          <!-- 当前的品论回复的品论 -->
          <div class="parent">
              <div class="parent-title">
                @:彩票研究员
              </div>
              <div class="parent-title">
                今天买什么码？
              </div>
          </div>

          <!-- 个人评论的内容 -->
          <div class="content">
            不知道
          </div>

          <div class="article-link">
            <router-link to="#">
              原文：今天买什么码？今天买什么码？今天买什么码？今天买什么码？今天买什么码？今天买什么码？今天买什么码？
            </router-link>
            <span class="iconfont iconjiantou1"></span>
          </div>
      </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/HeaderNormal"
export default {
    components:{
      HeaderNormal
    }
}
</script>

<style scoped lang="less">
  .comment-item{
    padding:10px;
    font-size: 14px;
    line-height: 1.8;
    border-bottom:1px #ccc solid;

    .item{
      font-size: 12px;
      color:#999;
      margin-bottom: 5px;
    }
    .parent{
      background-color: #eee;
      padding:10px;
      margin-bottom: 5px;
      .parent-title{
        font-size:12px;
        color:#999;
      }
    }
    .content{
      margin-bottom: 5px;
    }
    .article-link{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color:#999;
      a{
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

</style>