/**
 * Created by web-01 on 2017/11/23.
 */
$(()=>{
    var $circle_ul=$(".circle_ul");
    var $circle_li=$(".circle_ul>li");
    console.log($circle_ul);
    console.log($circle_li);
    $circle_ul.on('mouseover',function(e){
        $tar=$(e.target);
        if($tar.is("img")){
            //$tar.parent().css({"z-index":20});
            $tar.parent().animate({"z-index":5,"opacity":"1"});
        }
    });
    $circle_ul.on('mouseout',function(e){
        $tar=$(e.target);
        if($tar.is("img")){
            $tar.parent().animate({"z-index":0,"opacity":"0.1"})
        }
    });
    var count_li=0;
    var count_ul=0;
    var timer=setInterval(function(){
        count_li++;
        count_ul-=36;
        console.log($circle_li[count_li]);
        $circle_li[count_li].style.opacity=1;
        $circle_ul.css({"transform":"rotate("+count_ul+"deg)"});
        if(count_li!=0){
            $circle_li[count_li].previousElementSibling.style.opacity=0.1;
        }
        if(count_li==9){
            count_li=-1;
        }
        if(count_li==0) {
            $circle_li[9].style.opacity=0.1;
        }
    },5000);
});