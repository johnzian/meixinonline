
//检查是否登录
$(()=> {
    function checklogin(){
        $.ajax({
            type:"get",
            url:"php/route/islogin.php",
            success:function(data){
                if(data!=0){
                    $(".tool_left").html("");
                    var welcomeyou=("您好，"+data.uphone+"，欢迎光临美心西饼");
                    $(".welcome").html(welcomeyou);
                }
            },
            error:function(){
                console.log("有错");
            }
        });
    }
    $(".header").load("header.HTML");
    $(".footer").load("footer.HTML");
    checklogin();
    if(localStorage ["uid"]!=""){
        var $uid=parseInt(localStorage["uid"]);
        $.ajax({
            type:"post",
            url:"php/route/autologin.php",
            data:{uid:$uid},
            dataType:"text",
            success:function(){
                checklogin();
            }
        })
    }
});
//检查购物车的总量
$(()=> {
    $.ajax({
        type:"get",
        url:"php/route/cart_check.php",
        success:function(data){
            $(".cart_count").html(data);
        },
        error:function(){
            console.log("有错");
        }
    })
});
//搜索功能
$(()=> {
    $(".header").on("click","#btn_serach",function(e){
        var $tar=$(e.target);
        var $search=$tar.prev().val();
        if($search!=""){
            location="products_search.html?key="+$search;
        }
    });
});


