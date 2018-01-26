
var index=Vue.component("index",{
    data:function(){
        return{
            indexlist:[]
        }
    },
    methods: {
        jump: function (path) {
            this.$router.push(path);
        }
    },
    mounted:function(){
        this.$http.get('php/route/index_cake.php')
        .then(function(response){
            for(var i=0;i<response.body.length;i++) {
                var obj = response.body[i];
                this.indexlist.push(obj);
            }
        })
    },
        template:`<div>
            <div class="row">
                            <div class="col-xs-12">
                                <div class="index_lunbo">
                                    <lunbo></lunbo>
                                    <img src="img/201709291925222407030.jpg" alt=""/>
                                </div>
                            </div>
                        </div>

                        <div class="lead_to">
                            <a href="javascript:;" @click="jump('/cake_list')"><img src="img/20170410144525_7368.png" alt=""/></a>
                            <a href="javascript:;" @click="jump('/desert_list')"><img src="img/20170405181149_5533.png" alt=""/></a>
                            <a href="javascript:;"><img src="img/20170405181353_3197.png" alt=""/></a>
                            <a href="javascript:;"><img src="img/20170405181408_8042.png" alt=""/></a>
                            <a href="javascript:;"><img src="img/20170405181422_5386.jpg" alt=""/></a>
                            <a href="javascript:;"><img src="img/20170405181435_1481.jpg" alt=""/></a>
                        </div>

                        <div class="bgadvertise">
                            <a href="#"><img src="img/20170831235812_2496.png" alt="" class="bgpic"/></a>
                        </div>


                        <div class="products">
                            <ul class="product_ul">
                                <li class="product_li" v-for="emp in indexlist">
                                    <router-link :to="'/product_details/'+emp.pid">
                                        <img :src="emp.limg" class="product_pic" alt=""/>
                                        <p class="product_title">{{emp.title}}</p>
                                        <p><span class="product_price">¥{{emp.nprice}}</span></p>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
        </div>`
    });
