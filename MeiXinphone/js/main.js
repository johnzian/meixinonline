var mainpage=Vue.component("mainpage",{
    data:function(){
        return{
            leftshow:true,
            keyword:""
        }
    },
    methods:{
        jump:function(path){
            this.$router.push(path);
        },
        move:function(){
            this.leftshow=!this.leftshow;
            var righttitle=document.querySelector(".right-side-title");
            var rightside=document.querySelector(".right-side");
            if(this.leftshow){
                righttitle.style.width="74%";
                rightside.style.width="75%";
            }else{
                righttitle.style.width="100%";
                rightside.style.width="100%";
            }
        }
    },
    template:`                    <div class="main">
            <!--左侧导航-->
                <div class=" left-side" v-if="leftshow">
                <ul class=" left-side-ul">
                <li class="left-side-li"><a href="javascript:;"  @click="jump('/index')">首页</a></li>
                <li class=" left-side-li"><a href="javascript:;" @click="jump('/cake_list')">蛋糕馆</a></li>
                <li class=" left-side-li"><a href="javascript:;" @click="jump('/desert_list')">礼品馆</a></li>
                <li class=" left-side-li"><a href="javascript:;" @click="jump('/com_introduce')">公司简介</a></li>
                <li class=" left-side-li"><a href="javascript:;" @click="jump('/all_shop')">门店地址</a></li>
                </ul>
                </div>
            <!--右侧内容-->
                <div class=" right-side">
            <!--右侧顶端-->
                <div class="right-side-title">
                <div class="menu" @click="move()"><span class="glyphicon glyphicon-list"></span></div>
                <div class="logo"><img src="img/201707181448325969790.jpg" alt="美心西饼"/></div>
                <div class="search_div">
                <input type="text" class="search" v-model="keyword"/>
                <router-link :to="'/search/'+keyword" class="search_btn">搜索</router-link>
                </div>
                <div class="computer"><a href="../index.HTML">电脑端</a></div>
                </div>

            <!--右侧主要内容-->
                <div class="right-side-main">
                <div class="right-side-inside">
                       <router-view></router-view>




                </div>


                </div>
                </div>
                </div>
                `
});


