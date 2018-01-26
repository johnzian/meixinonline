/**
 * Created by Administrator on 2017/12/13.
 */
//加载购物车和用户地址
$(()=>{
   $.ajax({
       type:"get",
       url:"php/route/showcart.php",
       success:function(data){
           var html="";
           for(var i=0;i<data.length;i++){
               var obj=data[i];
               html+=`
                <li class="cart_list_li">
                    <div class="select"><input type="checkbox" class="cart_select"/><span class="hidden_pid">${obj.pid}</span></div>
                    <div class="pic"><img src="${obj.simg}" alt="" class="product_pic"/></div>
                    <div class="info">
                        <a href="product_details.html?pid=${obj.pid}"><p class="product_name">${obj.title}</p></a><span class="can_take">支持自提</span>
                        <p class="more_info">重量：${obj.pound}磅/ 口味：${obj.taste}/ 祝福语：${obj.bless}</p>
                    </div>
                    <div class="price"><span class="yuan">¥</span><span class="product_price">${obj.nprice}</span></div>
                    <div class="count">
                        <a href="javascript:;" class="less">-</a>
                        <input type="text" class="product_count" value="${obj.count}"/>
                        <a href="javascript:;" class="more">+</a>
                    </div>
                    <div class="control"><span class="cid">${obj.cid}</span><a href="javascript:;" class="product_delete">删除</a><span class="hidden_total">0</span></div>
                </li>
               `;
           }
           $(".cart_list_ul").html(html);
       }
   });
    $.ajax({
        type: "get",
        url: "php/route/user_address.php",
        success: function (data) {
            if(data!=0){
                var html="";
                var obj=data[0];
                html+=`
                <div class="address_inside">
                    <input type="radio" name="which_address" class="which_address" checked/>
                    <span class="aid">${obj.aid}</span>
                    <span>${obj.receiver}</span>
                    <span>${obj.province}${obj.city}${obj.block}</span>
                    <span>手机号码：${obj.phone}</span>
                    <span>固定号码：${obj.homenumber}</span>
                    <span>邮政编号：${obj.postcode}</span>
                    <span>详细地址：${obj.details}</span>
                </div>
                `;
                for(var i=1;i<data.length;i++){
                    obj=data[i];
                    html+=`
                <div class="address_inside">
                    <input type="radio" name="which_address" class="which_address"/>
                    <span class="aid">${obj.aid}</span>
                    <span>${obj.receiver}</span>
                    <span>${obj.province}${obj.city}${obj.block}</span>
                    <span>手机号码：${obj.phone}</span>
                    <span>固定号码：${obj.homenumber}</span>
                    <span>邮政编号：${obj.postcode}</span>
                    <span>详细地址：${obj.details}</span>
                </div>
                `;
                }
                $(".user_address").html(html);

            }else{
                alert("请到个人中心填写订单地址");
            }
        },
        error:function(){

        }
    })
});
//更新购物车
$(()=> {
    function sumtotal() {
        var $price;
        var $count;
        var $totalprice=0;
        for(var i=0;i<$(".cart_select:checked").length;i++){
            $price=$(".cart_select:checked").eq(i).parent().parent().find(".product_price").html();
            $count=$(".cart_select:checked").eq(i).parent().parent().find(".product_count").val();
            $totalprice+=$price*$count;
        }
        $(".total_num").html("¥"+$totalprice);
        $(".howmany_select").html($(".cart_select:checked").length);
    }


    //全选功能
    $(".select_all").click(function(e){
        $tar=$(e.target);
        if($tar.prop("checked")){
            for(var i=0;i<$(".cart_select").length;i++){
                $(".cart_select").eq(i).prop("checked", true);
            }
            sumtotal();
        }else{
            for(var i=0;i<$(".cart_select").length;i++){
                $(".cart_select").eq(i).prop("checked", false);
            }
            $(".total_num").html("¥0");
        }
    });


    $(".cart_list_ul").on("click", function (e) {
        var $tar = $(e.target);
        if ($tar.is(".less")) {//数量的加减
            var count = $tar.next().val();
            if (count > 1) {
                count--;
                $tar.next().val(count);
                sumtotal();
            }
        } else if ($tar.is(".more")) {
            var count = $tar.prev().val();
            count++;
            $tar.prev().val(count);
            sumtotal();
        } else if ($tar.is(".product_delete")) {//删除按钮
            var $cid = $tar.prev().html();
            $.ajax({
                type: "POST",
                url: "php/route/delete_cart.php",
                data: {cid: $cid},
                dataType: "text",
                success: function (data) {
                    if (data == 1) {
                        alert("删除成功");
                        location.reload();
                    } else {
                        alert("删除失败");
                        location.reload();
                    }
                },
                error: function () {
                    console.log("错");
                }
            })
        }
        else if($tar.is(".cart_select")){
            if(!$tar.prop("checked")){
                $(".select_all").prop("checked",false);
            }
            sumtotal();
        }




        //废弃代码
        // }else if($tar.is("input:checked")){
        //     //var $cakeprice=$tar.parent().parent().children(".price").children(".product_price").html();
        //     //var $cakecount=$tar.parent().parent().children(".count").children(".product_count").val();
        //     sumtotal($tar);
        //
        //     $(".howmany_select").html($("input:checked").length-1);
        // }else if($tar.is("input:checkbox")){
        //     $tar.parent().parent().children(".control").children(".hidden_total").html(0);
        //
        //     var $total=0;
        //     for(var i=0;i<$(".hidden_total").length;i++){
        //         $total+=parseFloat($(".hidden_total")[i].innerHTML);
        //     }
        //     $(".money").html($total);
        //     $(".howmany_select").html($("input:checked").length-1);
        // }
    });
});

    // function sumtotal(e){
    //     var $cakeprice=e.parent().parent().children(".price").children(".product_price").html();
    //     var $cakecount=e.parent().parent().children(".count").children(".product_count").val();
    //     var $onetotal=$cakeprice*$cakecount;
    //     if(e.parent().parent().children(".select").children().prop("checked")){
    //         e.parent().parent().children(".control").children(".hidden_total").html($onetotal);
    //     }else{
    //         e.parent().parent().children(".control").children(".hidden_total").html(0);
    //     }
    //     var $total=0;
    //     for(var i=0;i<$(".hidden_total").length;i++){
    //         $total+=parseFloat($(".hidden_total").eq(i).html());
    //     }
    //     $(".money").html($total);
    // }



//加入订单
$(()=>{
   $(".buy_now").click(function(){
       var $buy_pid;
       var $buy_date=parseInt(new Date().getTime());//购买时间
       var $buy_count;
       var $buy_address=parseInt($(".which_address:checked").next().html());//用户地址
       var $buy_cid;//购物车号
       for(var i=0;i<$(".cart_select:checked").length;i++){
           $buy_cid=parseInt($(".cart_select:checked").eq(i).parent().parent().find(".cid").html());
           $buy_pid=parseInt($(".cart_select:checked").eq(i).next().html());//产品id
           $buy_count=parseInt($(".cart_select:checked").eq(i).parent().parent().find(".product_count").val());//产品数量
            $.ajax({
                type:"post",
                url:"php/route/add_order.php",
                data:{pid:$buy_pid,aid:$buy_address,count:$buy_count,order_time:$buy_date,cid:$buy_cid},
                success:function(){
                }
            })
       }
       alert("加入订单成功");
       location.href="index.html";
    })
});