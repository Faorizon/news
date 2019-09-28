<template>
    <div>
        <!-- 文章详情页的内容 -->
        <div class="article">
            <div class="header">
                <div class="header-left">
                    <span class="iconfont iconjiantou2"></span>
                    <span class="iconfont iconnew"></span>
                </div>
                <span class="focus">关注</span>
            </div>
            <h3>文章的详情页内容</h3>
            <p class="post-info">火星时报 2019-10-10</p>
            <div class="post-conten">
                文章的详情页内容
                文章的详情页内容
                文章的详情页内容
            </div>
        </div>
        <div class="post-btns">
            <span>
                <i class="iconfont icondianzan"></i>
                112
            </span>
            <span>
                <i class="iconfont iconweixin"></i>
                微信
            </span>
        </div>
        <!-- 页脚组件 -->
        <PostFooter/>
    </div>
</template>


<script>
import PostFooter from "@/components/PostFooter"
export default{
    components:{
        PostFooter
    }
}
</script>

<style lang="less" scoped>
    .article{
        padding: 0 20px;
        .header{
            height: 60/360*100vw;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .header-left{
                *{
                    vertical-align: middle;
                }
                .iconnew{
                    font-size: 60px;
                }
            }
            .focus{
                width:62/360*100vw;
                height:30/360*100vw;
                line-height: 30/360*100vw;
                // padding: 10px 15px;
                border: 1px solid gray;
                text-align: center;
                background-color: #ed4040;
                color: #fff;
                border-radius: 50px;
            }
        }
        h3{
            margin-bottom: 5px;
        }
        .post-info{
            font-size: 12px;
            color:#999;
            margin-bottom: 15px;
        }
    }
    .post-btns{
        margin-top:30px;
        display: flex;
        justify-content: space-around;
        span{
            padding:0 15px;
            height:30/360*100vw;
            line-height: 30/360*100vw;
            font-size: 12px;
            border:1px #ddd solid;
            border-radius: 50px;

        }
        .iconweixin{
            color:#07c907;
        }
    }
</style>