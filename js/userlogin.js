//输入框选择
$(()=>{
			$(".user_loginclass").click(function(){
				$("#user_place").css({"display":"block"});
				$("#phone_place").css({"display":"none"});
				$("#user_login").addClass("hover");
				$("#phone_login").removeClass("hover");
			});
				
			
			$(".phone_loginclass").click(function(){
				$("#user_place").css({"display":"none"});
				$("#phone_place").css({"display":"block"});
				$("#phone_login").addClass("hover");
				$("#user_login").removeClass("hover");
			})
});
//用户手机号登录
$(()=>{
	$("#login_btn").click(function(){
        var $username=$("#userName").val();
        var $pwd=$("#pwd").val();
        $.ajax({
            type:"POST",
            url:"php/route/user_login.php",
            data:{uphone:$username,upwd:$pwd},
            dataType:"text",
            success:function(data){
                if(data!=0){
                    alert("登陆成功");
                    if($(".autologin").prop("checked")){
                        localStorage ["uid"]=data;
                    }
                    location="index.html";
                }else{
                    alert("登录失败");
                }
            }
        });
    })
});
//手机号注册或者登录
$(()=>{
    var dongtai;
    function randomdongtai(){
        var dongtai="";
        for(var i=0;i<4;i++){
            dongtai+=parseInt(Math.random()*10);
        }
        return dongtai;
    }
    $("#getdongtai").click(function(){
        dongtai=randomdongtai();
        $("#getdongtai").val(dongtai);
    });
    $("#phonelogin_btn").click(function(){
        var $phone=$("#phoneName").val();
        if($("#dongtai").val()==dongtai && /^1[3|4|5|8]\d{9}$/.test($phone)){
            $.ajax({
                type:"POST",
                url:"php/route/phone_login.php",
                data:{uphone:$phone},
                dataType:"text",
                success:function(data){
                    if(data!=0){
                        alert("登陆成功");
                        location="index.html";
                    }else{
                        $.ajax({
                            type:"POST",
                            url:"php/route/phone_register.php",
                            data:{uphone:$phone},
                            dataType:"text",
                            success:function(){
                                alert("注册成功，密码为您的手机号");
                                location="index.html";
                            },
                            error:function(){
                                alert("网络有错");
                            }
                        })
                    }
                }
            });
        }else{
            alert("动态码错误");
        }
    });
});


			