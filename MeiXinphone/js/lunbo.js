/**
 * Created by web-01 on 2018/1/5.
 */

Vue.component("lunbo",{
    data:function(){
        return{
            timer:'',
            img:[
                {
                    pid:1,
                    src:"img/201709291925222407030.jpg"
                },
                {
                    pid:2,
                    src:"img/201707311537253626040.png"
                },
                {
                    pid:3,
                    src:"img/201709081704083746940.png"
                }
            ]
        }
    },
    mounted:function(){
        var aimg=document.querySelectorAll(".lunbo_a");
        var now=0;
        this.timer=setInterval(()=>{
            if(now==aimg.length) {
                aimg[now-1].className="lunbo_a";
                now = 0;
            }
            aimg[now].className="lunbo_a active";
            if(now!=0){
                aimg[now-1].className="lunbo_a";
            }
            now++;

        },2000)
    },
    beforeDestroy:function(){
        clearInterval(this.timer);
      this.timer=null;
    },
    template:`<div>
            <a href="javascript:;" v-for="key in img" class="lunbo_a">
                <img :src=key.src alt="" class="lunbo_img"/>
            </a>
        </div>`
});