<template>
    <div class="Userinfo">
        <section class="mainInfo">
            <div class="mainInfoHeader">主页</div>
            <img :src="post.avatar_url">
            <span>{{ post.loginname }}</span>
            <span>{{ post.score }}积分</span>
            <span>注册时间 {{ post.create_at | timeFilter }}</span>
        </section>
        <section class="recentReplies">
            <div class="recentRepliesHeader">最近参与的话题</div>
            <div v-if="post.recent_replies.length === 0" class="nolength">
                无话题
            </div>
            <ul v-else>
                <li v-for="reply in post.recent_replies">
                    <img :src="reply.author.avatar_url">
                    <router-link :to="{
                        name:'post_content',
                        params:{
                            id:reply.id
                        }
                    }">
                        <span class="title">{{ reply.title }}</span>
                    </router-link>
                    <span class="time">{{ reply.last_reply_at | timeFilter }}</span>
                </li>
            </ul>
        </section>
        <section class="recentcreates">
            <div class="recentcreatesHeader">最近创建的话题</div>
            <div v-if="post.recent_topics === undefined" class="nolength">
                无话题
            </div>
            <ul v-else>
                <li v-for="reply in post.recent_topics">
                    <img :src="reply.author.avatar_url">
                    <router-link :to="{
                        name:'post_content',
                        params:{
                            id:reply.id
                        }
                    }">
                        <span class="title">{{ reply.title }}</span>
                    </router-link>
                    <span class="time">{{ reply.last_reply_at | timeFilter }}</span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    name: "Userinfo",
    data() {
        return {
            post:{}
        }
    },
    methods: {
        getData() {
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`
            ).then(res=>{
                this.post = res.data.data;
                //console.log(this.post);
                //console.log(this.post.recent_replies.length==0)
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

<style scoped>
img {
    height: 30px;
    width: 30px;
}

.Userinfo {
    background-color: #d1d1d1;
}

.mainInfo {
    background-color: #fff;
    margin: 20px 0;
}

.mainInfo img{
    margin: 10px;
}

.recentReplies,.recentcreates{
    background-color: #fff;
    margin-top: 20px;
}

.recentReplies img,.recentcreates img{
    margin: 0 10px;
}

.recentRepliesHeader, .recentcreatesHeader, .mainInfoHeader{
    height: 50px;
    background-color: #f6f6f6;
    line-height: 50px;
    padding-left: 10px;
    font-size: 16px;
    border-bottom: 1px solid #e5e5e5;
}

.nolength {
    padding: 20px 10px 20px;
}

li {
    border-bottom: 1px solid #f0f0f0;
    height: 50px;
    padding: 5px;
    display: flex;
    align-items: center;
}

li:hover {
    background-color: #f5f5f5;
}

a {
    text-decoration: none;  
    color: #5288cc;
    font-size: 20px;
}

.time {
    margin-left: auto;
    margin-right: 15px;
}
</style>
