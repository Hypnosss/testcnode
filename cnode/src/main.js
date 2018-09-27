// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from "axios"

Vue.prototype.$http = Axios;
Vue.config.productionTip = false

Vue.filter("timeFilter",function(data){
    var date = new Date(data);
    var time = new Date().getTime() - date;
    if(time / 1000 < 10 ){
        return "刚刚";
    }else if(time / 1000 < 60) {
        return parseInt(time / 1000) + "秒前";
    }else if(time / 60000 < 60) {
        return parseInt(time / 60000) + "分钟前";
    }else if(time / 3600000 < 24) {
        return parseInt(time / 3600000) + "小时前";
    }else if(time / 86400000 < 365) {
        return parseInt(time / 86400000) + "天前";
    }else {
        return "很久以前";
    }
})

Vue.filter("articleStyleFilter",function(post) {
    if(post.top) {
        return "置顶";
    } else if(post.good) {
        return "精华";
    } else if(post.tab==="ask") {
        return "问答";
    } else if(post.tab==="share") {
        return "分享";
    } else {
        return "其他";
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

