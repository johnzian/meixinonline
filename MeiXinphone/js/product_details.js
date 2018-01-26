/**
 * Created by web-01 on 2018/1/5.
 */
var product_details=Vue.component("product_details",{
    data:function(){
        return{
            obj:"",
            pid:0,
            detailspic:""
        }
    },
    mounted:function(){
        this.pid=this.$route.params.pid;
        this.$http({
            method:'get',
            url:'php/route/getproductbyid.php',
            params:{'pid':this.pid},
            headers: {"X-Requested-With": "XMLHttpRequest"},
            emulateJSON: true})
            .then(function(response){
                this.obj=response.body;
                this.detailspic=this.obj.details.slice(this.obj.details.indexOf("img/"),(this.obj.details.lastIndexOf("/")-1));
            });
    },
    template:`<div>
        <div class="product_details_left">
            <img :src="this.obj.sbimg" />
        </div>
        <div class="product_details_right">
            <div class="title">{{obj.title}}</div>
            <div class="subtitle">{{obj.subtitle}}</div>
            <div class="mprice">市场价：¥<span class="mprice_inside">{{obj.mprice}}</span></div>
            <div class="nprice">现售价：¥<span class="nprice_inside">{{obj.nprice}}</span></div>
            <div class="pound">重量：{{obj.pound}}磅</div>
            <div class="taste">口味：{{obj.taste}}</div>
        </div>
        <div class="details">
            <p class="details_title">商品详情</p>
            <img :src="this.detailspic" />
        </div>
    </div>`
});