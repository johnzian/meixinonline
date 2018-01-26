/**
 * Created by web-01 on 2017/12/8.
 */
//日期计算
$(()=>{
    html="";
    var date=new Date;
    var year=date.getFullYear();
    for(var i=1900;i<=year;i++){
        html+=`
            <option value="${i}">${i}</option>
            `;
    }
    $(".birDate_year").html(html);
});
$(()=>{
    html="";
    for(var i=1;i<=12;i++){
        html+=`
            <option value="${i}">${i}</option>
            `;
    }
    $(".birDate_month").html(html);
});
//验证码
$(()=>{
    $(".changeyz").click(function(){
        yanzheng();
    });
    function yanzheng(){
        var html="";
        for(var i=0;i<4;i++){
            html+=parseInt(Math.random()*10);
        }
        $(".yanzheng").html(html);
    }
yanzheng();
});


//注册功能
$(()=>{
    //$(":checkbox").click(e=>{
    //    var $tar=$(e.target);
    //    if(!$tar.prop("checked")){
    //        $(":text").prop("disabled",true);
    //        $(":password").prop("disabled",true);
    //        $(":radio").prop("disabled",true);
    //    }
    //    if($tar.prop("checked")){
    //        $(":text").prop("disabled",false);
    //        $(":password").prop("disabled",false);
    //        $(":radio").prop("disabled",false);
    //    }
    //})
    $("#phone").blur(function(){
        var $uphone=$("#phone").val();
        if(!/^1[3|4|5|8]\d{9}$/.test($uphone)){
            $("#phone").next().html("手机号不符合正确格式");
        }else {
            $.ajax({
                type:"POST",
                url:"php/route/user_check.php",
                data:{uphone:$uphone},
                dataType:"text",
                success:function(data){
                    if(data==1){
                        $("#phone").next().html("手机号已存在");
                    }else{
                        $("#phone").next().html("正确");
                    }
                }
            });
        }
    });
    $("#pwd").blur(function(){
        var $pwd=$("#pwd").val();
        if($pwd.length<6){
            $("#pwd").next().html("密码不能少于6位");
        }else {
            $("#pwd").next().html("正确");
        }
    });
    $("#checkpwd").blur(function(){
        if($("#checkpwd").val()!=$("#pwd").val() ||$("#checkpwd").val()==""){
            $("#checkpwd").next().html("确认密码有错");
        }else {
            $("#checkpwd").next().html("正确");
        }
    });
    $("#email").blur(function(){
        var $email=$("#email").val();
        if(/\w+[@]{1}\w+[.]\w+/.test($email)||$email==""){
            $("#email").next().html("");
        }else {
            $("#email").next().html("邮箱不符合正确格式");
        }
    });



    $(".register_btn").click(function(){
        var $uphone=$("#phone").val();
        var $upwd=$("#pwd").val();
        var $checkpwd=$("#checkpwd").val();
        var $gender=$('input[name="gender"]:checked').val();
        var year=$(".birDate_year option:selected").val();
        var month=$(".birDate_month option:selected").val()+1;
        var birthstr=year+"/"+month;
        var $birth= new Date(birthstr).getTime();
        var $email=$("#email").val();
        var $yanzhengma=$("#yanzhengma").val();
        if($("#phone").next().html()=="正确" && $("#phone").val().length==11){                                //验证手机是否符合正则
            if($upwd.length>=6){                                              //密码是否大于6位
                if($checkpwd==$upwd){                                       //确认密码是否相符
                    if(/\w+[@]{1}\w+[.]\w+/.test($email)||$email==""){      //邮箱为空还是符合正则
                        if($yanzhengma==$(".yanzheng").html()){             //输入的验证码是否正确
                            if($(":checkbox").prop("checked")){             //是否勾选确认条款
                                $.ajax({
                                    type:"POST",
                                    url:"php/route/user_register.php",
                                    data:{uphone:$uphone,upwd:$upwd,gender:$gender,birth:$birth,email:$email},
                                    dataType:"text",
                                    success:function(){
                                        alert("注册成功");
                                        location="login.html";
                                    },
                                    error:function(){
                                        alert("网络有错");
                                    }
                                })
                            }else{
                                alert("请阅读条款并打钩");
                            }
                        }else{
                            alert("验证码不正确");
                            $("#yanzhengma").focus();
                        }
                    }else{
                        alert("邮箱格式不正确");
                        $("#email").focus();
                    }
                }else{
                    alert("确认密码不正确");
                    $("#checkpwd").focus();
                }
            }else{
                alert("密码不能少于6位");
                $("#pwd").focus();
            }
        }else{
            $("#phone").focus();
        }





        //$ajax({
        //    type:"post",
        //    url:"data/routes/users/register.php",
        //    data:"uname="+txtName.value.trim()+"&upwd="+txtPwd.value.trim(),
        //    dataType:"text"
        //}).then(()=>{
        //    location="login.html";
        //})
    });
});