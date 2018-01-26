/**
 * Created by Administrator on 2018/1/13.
 */
var search=Vue.component("search",{
    data:function(){
        return{
            cakelist:[],
            page:1,
            pagelist:[],
            key:""
        }
    },
    created:function(){
        this.key=this.$route.params.kw;
    },
    methods:{
        pagego:function(key){
            //清空列表并重新载入数据
            this.page=key;
            this.cakelist=[];
            this.pagelist=[];
            this.loaddata();
        },
        loaddata:function(){
            this.$http({
                method:'get',
                url:'php/route/search_product.php',
                params:{'key':this.key},
                headers: {"X-Requested-With": "XMLHttpRequest"},
                emulateJSON: true})
                .then(function(response){
                    console.log(response)
                    for(var i=0;i<response.body.length;i++) {
                        var obj = response.body[i];
                        this.cakelist.push(obj);
                    }
                });
        }
    },
    mounted:function(){
        //首次载入
        this.loaddata();
    },
    template:`<div>
        <ul class="products_page_ul">
            <li v-for="(key,index) in cakelist" class="products_page_li">
            <router-link :to="'/product_details/'+key.pid">
                <img :src="key.limg" class="products_page_pic">
                <p class="products_page_title">{{key.title}}</p>
                <span class="products_page_nprice">¥{{key.nprice}}</span><span class="products_page_mprice">¥{{key.mprice}}</span>
            </router-link>
            </li>
        </ul>
		<ul class="page_ul">
			<li v-for="(key,index) in pagelist" @click="pagego(key)" v-bind:class="{active:page==(key)}" class="page_li" ref="pagenum">{{key}}</li>
		</ul>
    </div>`
});