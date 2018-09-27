<template>
    <div class="header">
        <router-link :to="{name: 'root'}">
            <img src="../assets/cnodejs_light.svg">
        </router-link>
        <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">新手入门</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">关于</a></li>
            <li><a href="#">注册</a></li>
            <li><a href="#">登录</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
.header {
    background-color: #444444;
    height: 60px;
}

img {
    max-width: 140px;
    margin: 15px 0 0 250px;
}

ul {
    list-style: none;
    float: right;
    margin-right: 200px;
}

li {
    display: inline-block;
}

a {
    text-decoration: none;
    color: #ccc;
    line-height: 60px;
    margin: 10px;
}
</style>