<template>
    <div class="ulWrapper">
        <ul>
            <li v-for="post in posts">
                <router-link :to="{
                    name: 'user_info',
                    params: {
                        name: post.author.loginname 
                    }
                }">
                    <img :src="post.author.avatar_url">
                </router-link>
                <span class="count">
                    <span class="replyCount">{{ post.reply_count }}</span>
                    <span>/</span>
                    <span class="visitCount">{{ post.visit_count }}</span> 
                </span>
                <span class="style" :class="{top:(post.top===true),good:(post.good===true)}">
                    {{ post | articleStyleFilter}}
                </span>
                <router-link :to="{
                    name:'post_content',
                    params:{
                        id:post.id
                    }
                }">
                    <span class="title">{{ post.title }}</span>
                </router-link>
                <span class="time">{{ post.last_reply_at | timeFilter }} </span>
            </li>
        </ul>
        <div class="pages">
            <pages @handle="renderList"></pages>
        </div>
    </div>
</template>

<script>
import Pages from "./pages";

export default {
    name: 'PostList',
    components:{
        Pages
    },
    data: function() {
        return {
            posts:[],
            postPage: 1
        }
    },
    methods: {
        getData() {
            this.$http.get("https://cnodejs.org/api/v1/topics",{
                params: {
                    page: this.postPage,
                    limit: 20
                } 
            }).then(res=>{
                this.posts = res.data.data;
            }).catch(function(err){
                console.log(err);
            });
            window.scrollTop = 0;
        },
        renderList(value){
            this.postPage = value;
            this.getData();
        }
    },
    created() {
        this.getData();
    }
};
</script>

<style scoped>
.ulWrapper {
    margin: 10px 0 0;
}

ul,li {
    list-style: none;
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

img {
    width: 30px;
    height: 30px;
}

.count {
    width: 80px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    margin: 0 12px;
}

.replyCount {
    color: #c392c0;
}

.visitCount {
    color: #b4b4b4;
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

.title {
    font-size: 20px;
}

a {
    text-decoration: none;  
    color: #000;
}

.time {
    margin-left: auto;
    margin-right: 15px;
}

.pages{
    width: 80%;
    margin: 0 auto;
    background-color: #ddd; 
}
</style>
