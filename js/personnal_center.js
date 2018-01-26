/**
 * Created by web-01 on 2017/12/17.
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
    $(".birth_year").html(html);
});
$(()=>{
    html="";
    for(var i=1;i<=12;i++){
        html+=`
            <option value="${i}">${i}</option>
            `;
    }
    $(".birth_month").html(html);
});
$(()=>{


    //获得当前用户信息
    get_user();
    getaddress();
    getorder();
    function get_user(){
        $.ajax({
            type:"get",
            url:"php/route/user_details.php",
            success:function(data){
                if(data!=0){
                    $(".user_phone").html(data.uphone);
                    if(data.gender==1){
                        $(".gender_m").prop("checked",true);
                    }else{
                        $(".gender_w").prop("checked",true);
                    }
                    var $birthyear = new Date(parseInt(data.birth)).getFullYear();
                    var $birthmonth = new Date(parseInt(data.birth)).getMonth()+1;
                    for(var i=0;i<=$(".birth_year>option").length;i++){
                        if($(".birth_year>option").eq(i).val()==$birthyear){
                            $(".birth_year>option").eq(i).prop("selected",true);
                        }
                    };
                    for(var i=0;i<=$(".birth_month>option").length;i++){
                        if($(".birth_month>option").eq(i).val()==$birthmonth){
                            $(".birth_month>option").eq(i).prop("selected",true);
                        }
                    };
                    $(".user_email").val(data.email);
                }else{
                    alert("请登录");
                    location.href=("login.html");
                }
            }
        })
    }
    //获取用户地址
    function getaddress(){
        $.ajax({
            type:"get",
            url:"php/route/user_address.php",
            success:function(data){
                var html="";
                html+=`
                    <li class="new_user_address">
                    <div>
                        收件人姓名：<input type="text" class="new_reciver">
                    </div>
                    <div>
                        省份：
                        <select name="new_province" class="province">
                            <option value="">请选择</option>
                            <option value="北京市">北京市</option>
                            <option value="上海市">上海市</option>
                            <option value="广东省">广东省</option>
                        </select>
                        城市：
                        <select name="new_city" class="city">

                        </select>
                        街区：
                        <select name="new_block" class="block">

                        </select>
                    </div>
                    <div>
                        手机：<input type="text" class="new_phone">
                    </div>
                    <div>
                        固定电话：<input type="text" class="new_homenumber">
                    </div>
                    <div>
                        邮政编号：<input type="text"class="new_postcode">
                    </div>
                    <div>
                        详细地址：<input type="text" class="new_address_details">
                    </div>
                    <div>
                        <input type="button" class="address_btn" value="确认添加">
                    </div>
                 </li>
                `;
                for(var i=0;i<data.length;i++){
                    var obj=data[i];
                    html+=`
                        <li class="user_address_li">
                    <span class="reciver_name">${obj.receiver}</span>
                    <span class="reciver_address">${obj.province}${obj.city}${obj.block}</span>
                    <span class="reciver_phone">${obj.phone}</span>
                    <span class="reciver_homenumber">${obj.homenumber}</span>
                    <span class="reciver_postcode">${obj.postcode}</span>
                    <span class="reciver_details">${obj.details}</span>
                    <a href="javascript:;" class="del_aid">删除</a><span class="aid">${obj.aid}</span>
                </li>
                    `;
                }
                $(".user_address_ul").html(html);
            }

        })
    }
    //获取用户订单

    function getorder(){
        var html="";
        $.ajax({
            type:"get",
            url:"php/route/get_order.php",
            success:function(data){
                html+=`
                                <li class="order_li">
                <span>产品图片</span>
                <span>产品标题</span>
                <span>单个</span>
                <span>数量</span>
                <span>下单时间</span>
                <span>当前状态</span>
            </li>
                `;
                if(data!=0){
                    for(var i=0;i<data.length;i++){
                        var obj=data[i];
                        html+=`
            <li class="order_li">
                <img src="${obj.simg}" alt="">
                <span class="product_title">${obj.title}</span>
                <span class="product_price">¥${obj.nprice}</span>
                <span class="product_count">${obj.count}个</span>
                <span class="order_time">${obj.count}</span>
                <span class="order_state">${obj.status}</span>
            </li>
                        `;
                    }
                }
                $(".order_ul").html(html);
            }
        })
    }
    $(".user_address_ul").on("click",function(e){
        $tar=$(e.target);
        if($tar.is(".del_aid")){
            //删除地址
            var $aid=parseInt($tar.next().html());
            console.log($aid);
            $.ajax({
                type:"post",
                url:"php/route/del_address.php",
                data:{aid:$aid},
                dataType:"text",
                success:function(){
                    alert("删除成功");
                    getaddress();
                }
            })
        }else if($tar.is(".address_btn")){
            //添加地址
            $receiver=$(".new_reciver").val();
            $province=$(".province>option:selected").val();
            $city=$(".city>option:selected").val();
            $block=$(".block>option:selected").val();
            $phone=$(".new_phone").val();
            $homenumber=$(".new_homenumber").val();
            $postcode=$(".new_postcode").val();
            $details=$(".new_address_details").val();
            $.ajax({
                type:"post",
                url:"php/route/add_address.php",
                data:{receiver:$receiver,province:$province,city:$city,block:$block,phone:$phone,homenumber:$homenumber,postcode:$postcode,details:$details},
                dataType:"text",
                success:function(data){
                    if(data==1){
                        alert("添加成功");
                        getaddress();
                    }else{
                        alert("失败");
                    }
                }
            })
        }
    });
    $(".user_address_ul").on("change",".province",function(e){
        $tar=$(e.target);
        var html="";
        var $city=$tar.next();
        var $block=$tar.next().next();
        if($tar.val()=="北京市"){
            html=`<option value="">请选择</option>
                  <option value="北京市">北京市</option>`;
            $city.html(html);
            html=`<option value="">请选择</option>
                  <option value="北京A区">北京A区</option>
                  <option value="北京B区">北京B区</option>
                  <option value="北京C区">北京C区</option>`;
            $block.html(html);
        }else if($tar.val()=="上海市"){
            html=`<option value="">请选择</option>
                  <option value="上海市">上海市</option>`;
            $city.html(html);
            html=`<option value="">请选择</option>
                  <option value="上海A区">上海A区</option>
                  <option value="上海B区">上海B区</option>
                  <option value="上海C区">上海C区</option>`;
            $block.html(html);
        }else if($tar.val()=="广东省"){
            html=`<option value="">请选择</option>
                  <option value="广州市">广州市</option>
                  <option value="东莞市">东莞市</option>
                  <option value="清远市">清远市</option>`;
            $city.html(html);
            html=`<option value="">请选择</option>
                  <option value="广州A区">广州A区</option>
                  <option value="广州B区">广州B区</option>
                  <option value="广州C区">广州C区</option>`;
            $block.html(html);
        }else{
            alert("有错");
        }
    });

    //导航栏的选定
    $(".personnal").siblings().fadeOut();
    $(".statement_one").click(function(e){
        $tar=$(e.target);
        $tar.addClass("active");
        $tar.siblings().removeClass("active");
        $(".personnal").slideDown();
        $(".personnal").siblings().slideUp();

    });
    $(".statement_two").click(function(e){
        $tar=$(e.target);
        $tar.addClass("active");
        $tar.siblings().removeClass("active");
        $(".user_address").slideDown();
        $(".user_address").siblings().slideUp();

    });
    $(".statement_three").click(function(e){
        $tar=$(e.target);
        $tar.addClass("active");
        $tar.siblings().removeClass("active");
        $(".user_order").slideDown();
        $(".user_order").siblings().slideUp();

    });


    //修改用户信息
    $(".personnal_btn").click(function(){
        var $gender=$('input[name="gender"]:checked').val();
        console.log($gender);
        var year=parseInt($(".birth_year>option:selected").val());
        var month=parseInt($(".birth_month>option:selected").val());
        var birthstr=year+"/"+month;
        var $birth= new Date(birthstr).getTime();
        var $email=$(".user_email").val();
        $.ajax({
            type:"post",
            url:"php/route/user_update.php",
            data:{gender:$gender,birth:$birth,email:$email},
            dataType:"text",
            success:function(){
                alert("修改成功");
                get_user();
            }
        })
    })
});


