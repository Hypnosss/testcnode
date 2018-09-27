<template>
    <div class="article">
        <div class="articleHeader">
            <div class="title">
                <span class="style" :class="{top:(post.top===true),good:(post.good===true)}">
                    {{ post | articleStyleFilter}}
                </span>
                <h2>{{ post.title }}</h2>
            </div>
            <ul class="articleInfos">
                <li>发布于 {{ post.last_reply_at | timeFilter }}</li>
                <li>作者：{{ post.author.loginname }}</li>
                <li>{{ post.visit_count }}次浏览</li>
            </ul>
            <hr>
        </div>
        <div v-html="post.content" class="articleContent">
        </div>
        <div class="articleReplies">
            <div class="repliesHeader">
                {{ post.replies.length }}回复
            </div>
            <div v-for="(reply,index) in post.replies" class="articleReply">
                <router-link :to="{
                    name: 'user_info',
                    params: {
                        name: reply.author.loginname 
                    }
                }">
                    <img :src="reply.author.avatar_url" class="avatar">
                </router-link>
                <router-link :to="{
                    name: 'user_info',
                    params: {
                        name: reply.author.loginname 
                    }
                }">
                    <span class="replyName">{{ reply.author.loginname }}</span>
                </router-link>
                
                <span>{{ index + 1 }}楼</span>
                <span class="replyTime">{{ reply.create_at | timeFilter }}</span>
                <span v-html="reply.content" class="replyContent"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Article",
    data(){
        return {
            post:{}
        }
    },
    methods: {
        getData() {
            this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`
            ).then(res=>{
                console.log(this.post);
                this.post = res.data.data;
                console.log(this.post);
            }).catch(function(err){
                console.log(err);
            })
            
        }
    },
    created() {
        this.getData();
    }
};
</script>

<style>
img {
    max-width: 100%;
}

.article {
    padding: 40px 10px;
    background-color: #d1d1d1;
}

.articleHeader, .articleContent, .articleReplies {
    background-color: #fff;
}

.articleHeader {
    padding: 15px;
}

.title {
    display: flex;
}

.articleInfos {
    display: flex;
    margin: 20px 0;
}

.articleInfos li{
    margin: 0 15px;
    color: #838383;
}

.style {
    width: 40px;
    height: 25px;
    margin-right: 5px;
    border-radius: 20%;
    background-color: #e5e5e5;
    color: #c7aea3;
    font-size: 18px;
    padding-left: 2px;
}

.style.top,.style.good {
    background-color: #80bd01;
    color: #fff;
}

.articleContent {
    padding: 15px;
    font-size: 20px;
}

.articleContent p {
    padding: 10px 0;
    white-space: pre-wrap;
}

.articleContent ul,ol {
    padding: 10px 0 10px 35px;
    font-size: 16px;
}

.articleContent li{
    margin: 0 15px;
}

.articleContent a {
    text-decoration: none;
}

.articleContent hr {
    margin: 15px 0;
}

.articleContent h3 {
    font-size: 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.articleContent blockquote{
    border-left: 10px solid #eee;
    padding-left: 20px;
    margin: 10px 0; 
    color: #333;
}

.articleReplies{
    margin-top: 30px;
}

.articleReplies .avatar{
    width: 30px;
    height: 30px;
}

.repliesHeader{
    height: 50px;
    background-color: #f6f6f6;
    line-height: 50px;
    padding-left: 10px;
    border-bottom: 1px solid #e5e5e5;
}

.articleReply{
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 0 30px 5px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}

.articleReply a {
    text-decoration: none;
}

.replyName {
    margin: 0 10px;
    font-weight: bold;
    color: #666;
}

.replyTime {
    margin-left: 5px;
}

.replyContent {
    align-self: flex-end;
    width: 100%;
    padding: 0 30px;
    font-size: 18px;
}

.replyContent a {
    text-decoration: none;
}

.replyContent p {
    margin: 5px 0;
}
</style>
