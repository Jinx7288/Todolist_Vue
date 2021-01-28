"use strict"

document.querySelector(".wrap div button").addEventListener("click",function() { document.querySelector(".wrap").remove();});
let storage = window.localStorage;
window.onbeforeunload=function() { 
    document.querySelector("#saveto").click();
    alert("    ");
    return 0
};
new Vue({
    el:"#todolist",
    data:{
        toggle:true,
        statetoggle:true,
        cache:{
            headcache:'',
            detailcache:''
        },
        modifyItem:null,
        itemList:[]
    },
    mounted:function() {
        if(storage.getItem("items")) {
            let something=JSON.parse(storage.getItem("items"));
            this.itemList=something;
        }
    },
    methods:{
        addItem:function() {
            if(this.cache.headcache && this.cache.detailcache) {
                this.itemList.push({
                    'head':this.cache.headcache,
                    'detail':this.cache.detailcache,
                    'checked':false
                });
                this.cache.headcache='';
                this.cache.detailcache='';
                this.toggle=true;
            } else {
                alert("无效输入！");
            }
        },
        cancelAction:function() {
            this.cache.headcache='';
            this.cache.detailcache='';
            this.toggle=true;
        },
        modifyAction:function(index) {
            this.toggle=false;
            this.statetoggle=false;
            this.cache.headcache=this.itemList[index].head;
            this.cache.detailcache=this.itemList[index].detail;
            this.modifyItem=index;
        },
        saveModify:function(index) {
            if(this.cache.headcache && this.cache.detailcache) {
            this.toggle=true;
            this.statetoggle=true;
            this.itemList[index].head=this.cache.headcache;
            this.itemList[index].detail=this.cache.detailcache;
            this.cache.headcache='';
            this.cache.detailcache=''; 
        } else {
            alert("无效修改！")
        }
        },
        savetolocal:function() {
            storage.setItem("items",JSON.stringify(this.itemList));
            alert("已保存！")
        }
    }
})
