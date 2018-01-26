	(function(){
//		var body=document.body;
//		body.style.width=screen.width+"px";
		var $ohno=$(".ohno");
		$ohno.css({width:window.innerWidth,height:window.innerHeight});
		$ohno.click(function(){$ohno.css({display:"none"})});
	})();
$(()=> {
	//回到顶部按钮以及电梯楼层
	var $gotop = $('.nav_goheader');
	$nav_elevator = $('.nav_elevator');
	$elevators = $(".nav_elevator>div");
	$gotop.click(e=> {
		$('body,html').animate({
			"scrollTop": 0
		}, 2000)
	});
	$("body").on("click",".goback",function(){
		$('body,html').animate({
			"scrollTop": 0
		}, 2000)
	});
	$elevators.click(e=> {
		$tar = $(e.target);
		if ($tar.is($elevators[0])) {
			$('body,html').animate({
				"scrollTop": 594
			}, 2000);
		} else if ($tar.is($elevators[1])) {
			$('body,html').animate({
				"scrollTop": 1273
			}, 2000);
		} else if ($tar.is($elevators[2])) {
			$("body,html").animate({
				"scrollTop": 1938
			}, 2000);
		}
	});
	$(window).scroll(function () {
		var user_top = $(window).scrollTop();
		//var $header = $("header");
		if (user_top >= 449) {
//			$header.css({"position":"fixed"});
			$gotop.fadeIn();
			$nav_elevator.fadeIn();





			if (user_top >= 449 && user_top < 1273) {
				$elevators[0].style.backgroundColor = "#fe5722";
				$elevators[1].style.backgroundColor = "#3b3b3b";
				$elevators[2].style.backgroundColor = "#3b3b3b";




			} else if (user_top >= 1273 && user_top < 1938) {
				$elevators[0].style.backgroundColor = "#3b3b3b";
				$elevators[1].style.backgroundColor = "#fe5722";
				$elevators[2].style.backgroundColor = "#3b3b3b";

			}
			else if (user_top >= 1938 && user_top < 2300) {
				$elevators[0].style.backgroundColor = "#3b3b3b";
				$elevators[2].style.backgroundColor = "#fe5722";
				$elevators[1].style.backgroundColor = "#3b3b3b";
			} else {
				$elevators[2].style.backgroundColor = "#3b3b3b";
			}
		} else {
			$gotop.fadeOut();
			$nav_elevator.fadeOut();
//			$header.css({"position":"static"});
//			$lunbo.css({"margin-top":"0px"});
		}
	})
});
	$(()=>{
		 //小广告
	var flowtime;
	var $little=$(".little_one");
	function flow(){
		flowtime=setInterval(function(){
		var top=parseInt((Math.random()*document.body.clientHeight)  );
		var left=parseInt((Math.random()*document.body.clientWidth)  );
		var roll=parseInt(Math.random()*360)-10;
		$little.css({"top":top,"left":left});
		$little.css("transform","rotate("+roll+"deg)");
		},5000);
	}
	var $pop_img=$(".little_one>img");
	var offsetX,offsetY,canMove=false;
	
	$little.mouseover(e=>{
		window.clearInterval(flowtime);
		flowtimer=null;
		$little.draggable();
	});
	$little.mouseout(e=>{
		flow();

	});
	flow();
	});
	//加载首页轮播图
	$(()=>{
		ajax({
			type:"get",
			url:"php/route/index_lunbo.php"
		}).then(data=>{
			let html="";
			var $lunbo_box=$(".lunbo_inside");
			var pic_width=1200;
			for(var i=0;i<data.length;i++){
				let obj=data[i];
				html+=`
					<div class="changepic">
						<a href="product_details.html?pid=${obj.pid}"><img src="${obj.superimg}"></a>
					</div>
					`;
			}
			html+=`
					<div class="changepic">
						<a href="product_details.html?pid=${data[0].pid}"><img src="${data[0].superimg}"></a>
					</div>
					`;
			$lunbo_box.css("width",((data.length+1)*pic_width));
			$lunbo_box.html(html);
		})

	});
	//轮播图控制
	$(()=>{
		var $lunbo_box=$(".lunbo_inside");
		var pic_width=1200;
		var moved=0;
		var timer=null;
		var canMove=true;




		function autoMove(){
			if(canMove){
				if(moved==$lunbo_box.children().length-1){//先判断是否最后一张
					moved=0;//将moved归0
					$lunbo_box.css("left",0);
				}
				timer=setTimeout(()=>{//先等待WATI秒
					move(1,autoMove);
				},5000);
			}
		}
		autoMove();




		$lunbo_box.hover(
			()=>{//关闭轮播的开关变量
				canMove=false;
				clearTimeout(timer);//停止等待
				timer=null;
			},
			()=>{//打开轮播开关，启动自动轮播
				canMove=true;
				autoMove();
			}
		);




		function move(dir,callback){
			moved+=dir;//按照方向增减moved
			$lunbo_box.stop(true).animate({
				left:-pic_width*moved
			},1000,callback);
		}
	});

	//蛋糕馆一楼
	$(()=>{
			//载入蛋糕馆
			ajax({
				type:"get",
				url:"php/route/index_cake.php"
			}).then(data=>{
				let html="";
				var $floor=$(".floor").eq(0);
				var show;
				html+=`				<div class="floor_top">
					<div class="lf floor_title">蛋糕馆</div>
					<div class="rt floor_more"><a href="products_cake.HTML">查看更多产品>></a></div>
				</div>
				<div class="floordetail clear">
					<div class="bigfloor lf">
						<img src="img/20170424144130_5178.jpg" alt="">
					</div>
					<div class="smallfloor rt">
						<ul class="product_ul index_cake">`;
				if(data.length>=8){
					show=8;
				}else{
					show=data.length;
				}
				for(var i=0;i<show;i++){
					var obj=data[i];
					html+=
						`
						<li class="product">
							<a href="product_details.html?pid=${obj.pid}" class="pic"><img src="${obj.limg}" alt="${obj.title}"></a>
							<p class="product_title"><a href="product_details.html?pid=${obj.pid}">"${obj.title}"</a></p>
							<p>
								<span class="price">
									￥"${obj.nprice}"
								</span>

								<span class="discount">
									￥"${obj.mprice}"
								</span>
							</p>
						</li>
					`;
				}
				html+=`						</ul>
					</div>
				</div>`;
				$floor.html(html);
			});
	});
	//礼品馆二楼
	$(()=>{
				//载入零食
				ajax({
					type:"get",
					url:"php/route/index_desert.php"
				}).then(data=>{
					let html="";
					var $floor=$(".floor").eq(1);
					var show;
					html+=`				<div class="floor_top">
					<div class="lf floor_title">礼品馆</div>
					<div class="rt floor_more"><a href="products_sweet.html">查看更多产品>></a></div>
				</div>
				<div class="floordetail clear">
					<div class="bigfloor lf">
						<img src="img/20170726171807_3157.png" alt="">
					</div>
					<div class="smallfloor rt">
						<ul class="product_ul index_desert">`;
					if(data.length>=8){
						show=8;
					}else{
						show=data.length;
					}
					for(var i=0;i<show;i++){
						var obj=data[i];
						html+=
							`
						<li class="product">
							<a href="product_details.html?pid=${obj.pid}" class="pic"><img src="${obj.limg}" alt="${obj.title}"></a>
							<p class="product_title"><a href="product_details.html?pid=${obj.pid}">"${obj.title}"</a></p>
							<p>
								<span class="price">
									￥"${obj.nprice}"
								</span>

								<span class="discount">
									￥"${obj.mprice}"
								</span>
							</p>
						</li>
					`;
					}
					html+=`						</ul>
					</div>
				</div>`;
					$floor.html(html);
				})
	});
	//底部随机展示
		$(()=>{
				//底部随机轮播图
				ajax({
					type:"get",
					url:"php/route/index_footer_random.php"
				}).then(data=>{
					let html="";
					html+=`				<div class="footer_random_inside">
					<ul class="footer_random_ul">`;
					var $ul=$(".footer_random");
					var show;
					if(data.length>=8){
						show=8;
					}else{
						show=data.length;
					}
					for(var i=0;i<show;i++){
						var random=parseInt(Math.random()*(data.length));
						var obj=data[random];
						html+=
							`
						<li class="footer_random_pic"><a href="product_details.html?pid=${obj.pid}"><img src="${obj.limg}"></a></li>
					`;
					}
					html+=`					</ul>
				</div>`;
					$ul.html(html);
				})
	});