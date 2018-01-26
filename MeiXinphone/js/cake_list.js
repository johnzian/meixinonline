/**
 * Created by Administrator on 2017/12/31.
 */

var cake_list=Vue.component("cake_list",{
    data:function(){
        return{
            cakelist:[],
			page:1,
			pagelist:[]
        }
    },
    methods:{
        jump:function(path){
            this.$router.push(path);
        },
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
                url:'php/route/cake_list.php',
                params:{'pnum':this.page},
                headers: {"X-Requested-With": "XMLHttpRequest"},
                emulateJSON: true})
                .then(function(response){
                    for(var i=0;i<response.body.data.length;i++) {
                        var obj = response.body.data[i];
                        this.cakelist.push(obj);
                    }
                    //载入页数
                    if(parseInt(response.body.pnum)-1>0){
                        this.pagelist.push(parseInt(response.body.pnum)-1);
                    }
                    this.pagelist.push(parseInt(response.body.pnum));
                    if(parseInt(response.body.pnum)+1<=response.body.pagecount){
                        this.pagelist.push(parseInt(response.body.pnum)+1);
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
                <img :src="key.sbimg" class="products_page_pic">
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