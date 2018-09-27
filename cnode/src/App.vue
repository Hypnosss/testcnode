<template>
    <div id="app">
        <Header></Header>
        <div class="main">
            <router-view name="main"></router-view>
        </div>
    </div>
</template>

<script>
import Header from "./components/header";
import PostList from "./components/PostList";


export default {
    name: "App",
    components: {
        Header,
        PostList
    }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

#app{
    background-color: #d1d1d1;
    padding-bottom: 30px;
}

.main{
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
}


</style>
