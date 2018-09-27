<template>
    <div class="main">
        <button @click="change2($event)">首页</button>
        <button @click="change2($event)">上一页</button>
        <button v-for="num in pagenums" :key="num"
        :class="[{currentNum: num == currentnum}]"
        @click="change1(num)">
            {{ num }} 
        </button>
        <button @click="change2($event)">下一页</button>
    </div>  
</template>

<script>
export default {
    name: "Pages",
    data() {
        return {
            pagenums: [1,2,3,4,5],
            currentnum: 1 //现在的页码
        }
    },
    methods: {
        change1(num) {
            if(num === "first"){
                this.pagenums = [1,2,3,4,5]
                this.currentnum = 1;
            }else{
                this.currentnum = num;
                if(num == this.pagenums[4]){
                    this.pagenums.shift();
                    this.pagenums.splice(4,0,this.pagenums[3] + 1);
                }else if(num == this.pagenums[0] && num != 1){
                    this.pagenums.splice(4,1);
                    this.pagenums.splice(0,0,this.pagenums[0] - 1);
                }
            }
            this.$emit("handle",this.currentnum);      
        },
        change2(e){
            var btn = e.target.innerText;
            if(btn === "首页"){
                this.change1("first");
            }else if(btn === "上一页"){
                this.change1(1>(this.currentnum-1)?1:(this.currentnum-1));
            }else if(btn === "下一页"){
                this.change1(this.currentnum + 1);
            }
        }
    }
};
</script>

<style scoped>
.main {
    width: 100%;
    padding: 30px 0;
    display: flex;
    justify-content: center;   
}

.currentNum {
    color: #90bd53;
}

button{
    height: 50px;
    border: 1px;
    margin: 0 10px;
    font-size: 20px;
    min-width: 20px;
    background-color: #fff;
    border: 2px solid #ccc;
    padding: 10px;
    outline: none;
}

button:hover {
    background-color: #eee;
}
</style>
