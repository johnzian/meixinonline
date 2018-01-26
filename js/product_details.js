$(()=>{
	//放大镜
	$smallbox=$(".smallbox");
	$floatbox=$(".floatbox");
	$bigbox=$(".bigbox");
	$frame=$(".details_top_left");
	$bigpic=$(".bigpic");
	$smallbox.on('mouseover',function(){  
      $floatbox.css({  
          display : 'block'  
      }) ;  
       $bigbox.css({  
           display : 'block'  
       }) ;  
   }); 
   $smallbox.on('mouseout',function(){  
      $floatbox.hide();  
      $bigbox.hide();  
  });
  $smallbox.on('mousemove',function(e){  
	var left = e.pageX-($smallbox.offset().left)-50;
	  //console.log(e.offsetX);
	  //console.log(e.clientX);
	  //console.log(e.clientX);
	var top = e.pageY-($smallbox.offset().top)-50;
	//其中195和75为小盒距离页面的总距离，50为方块的中间值
	if(left<0){  
    left = 0;  
	}else if(left>300){  
		left = 300;  
	}  
	  
	if(top<0){  
		top = 0;  
	}else if(top>300){  
		top = 300;  
	}  
	$floatbox.css({ //于是放大镜就跟随鼠标了，left和top最大值为300
		left : left +"px",  
		top : top +"px"  
	});  
	var precentX = 4;
	var precentY = 4;
	//4主要是小框对比移动框的百分比，就等于大图对比大框的对比
	var bx = (precentX*left);
	var by = (precentY*top);
	$bigpic.css({  
        left : -bx + "px",   
        top : -by+"px"  
    });
  })
});
//商品详情
$(()=>{
	$.ajax({
		type:"get",
		url:"php/route/getproductbyid.php",
		data:location.search.slice(1),
		success:function(data){
			$(".title").html(data.title);
			$(".describe").html(data.subtitle);
			$(".normal_money").html(data.mprice);
			$(".now_money").html(data.nprice);
			if(data.is_cake==1){
				$(".pound_li").html(data.pound+"磅");
			}else{
				$(".pound_li").html(data.pound+"个");
			}
			if(data.is_cake==1){
				$(".product_tase").css({"display":"flex"});
				$(".tase_li").html(data.taste);
			}else{
				$(".product_tase").css({"display":"none"});
				$(".tase_li").addClass("active");
			}
			var html=`
			${data.details}
			<p class="pic_warning">*本商品不适用七日无理由退货</p>
			`;
			$(".product_details_pic").html(html);
			html=`
			<li class="little_pic_li"><a href="javascript:;"><img src="${data.simg}"/></a></li>
			`;
			$(".productpic_list").html(html);
			$(".smallpic").attr({src:data.sbimg});
			$(".bigpic").attr({src:data.sbimg});
			$(".bread_now").html(data.title);
			document.title="美心西饼 - "+data.title;
		}
	})
});
//详情页的部分小功能
$(()=>{
	var date=new Date();//预约取饼时间
	var day=date.getDate()+2;
	var month=date.getMonth();
	var year=date.getFullYear();
	$(".when_time").html(year+"-"+month+"-"+day);
	//是否选择了口味和重量
	$(".pound_li").click(function(e){
		$tar=$(e.target);
		$tar.addClass("active");
	});
	$(".tase_li").click(function(e){
		$tar=$(e.target);
		$tar.addClass("active");
	});
	//用户巧克力牌的填写
	$("#product_count").change(function(e){
		$tar=$(e.target);
		var html="";
		for(var i=1;i<=$tar.val()&&i<=5;i++){
			html+=`
				<input type="text" class="product_bless" placeholder="此处不填写则表示不需要巧克力牌" maxlength="20">
			`;
		}
		$(".user_bless").html(html);
	})
});
//加入购物车按钮
$(()=>{
	$(".add_cart").click(function(){
		if(!$(".pound_li").hasClass("active")||!$(".tase_li").hasClass("active")){
			$(".user_choice").css({"display":"block"});
			if(!$(".pound_li").hasClass("active")) {
				$(".check_pound").html("重量 ");
			}else{
				$(".check_pound").html("");
			}
			if(!$(".tase_li").hasClass("active")) {
				$(".check_taste").html("口味");
			}else{
				$(".check_taste").html("");
			}
		}else{
			//加入购物车功能
			$(".user_choice").css({"display":"none"});
			var $pid=location.search.slice(5);
			var $count=$("#product_count").val();
			var $bless="";
			for(var i=0;i<$(".product_bless").length;i++){
				$bless+=$(".product_bless")[i].value;
				$bless+="/";
			}
			$.ajax({
				type:"POST",
				url:"php/route/add_cart.php",
				data:{pid:$pid,count:$count,bless:$bless},
				success:function(data){
					if(data==1){
						$(".warning_cart").css({"display":"block"}).animate({"height":"40%"});
					}else{
						$(".warning_login").css({"display":"block"}).animate({"height":"40%"});
					}
				}
			});
		}
	});
	$(".warning_close").click(function(e){
		$tar=$(e.target);
		$tar.parent().animate({"height":"0%"}).css({"display":"none"});
	});
	$(".keep_shopping").click(function(e){
		$tar=$(e.target);
		$tar.parent().parent().animate({"height":"0%"}).css({"display":"none"});
		location.reload();
	});
	$(".buy_now").click(function(){
		var abc=$("#product_count").val();
		abc++;
		$("#product_count").val(abc);
	})
});
//热销推荐
$(()=>{
	$.ajax({
		type:"get",
		url:"php/route/top_ten.php",
		success:function(data){
			var html="";
			for(var i=0;i<data.length;i++){
				var obj=data[i];
				html+=`
						<li class="topsales_li">
							<a href="product_details.html?pid=${obj.pid}" class="topsales_a">
							<img class="topsales_img" src="${obj.mimg}"/>
								<div class="topsales_font">
									<p class="topsales_title">${obj.title}</p>
									<p class="topsales_price">${obj.nprice}</p>
								</div>
							</a>
						</li>
				`;
			}
			$(".topsales_ul").html(html);
		}
	});
});
//猜你喜欢
$(()=>{
	$.ajax({
		type:"GET",
		url:"php/route/maybelike.php",
		data:location.search.slice(1),
		success:function(data){
			var html="";
			var show;
			if(data.length<7) {
				show = data.length;
			}else{
				show=7;
			}
			for(var i=1;i<show;i++){
				var obj=data[i];
				html+=`
						<li class="product_footer_li">
							<a href="product_details.html?pid=${obj.pid}" class="product_footer_a">
								<img class="product_footer_img" src="${obj.limg}"/>
								<p class="product_footer_title">${obj.title}</p>
								<p class="product_footer_price">${obj.nprice}</p>
							</a>
						</li>
				`;
			}
			$(".product_footer_ul").html(html);
		}
	})
});