//(function(){var body=document.body;
//		body.style.width=screen.width+"px";})();
(function(){
	var timer;
	var to_bottom=false;
	gobottom();
	var i=1;
	var ul=document.querySelector(".paixing");
	var li=ul.querySelectorAll(".paixing_detail");
	function gobottom(){
		timer = setInterval(function () {
			if(to_bottom==false){
					ul.style.top=-80*i+"px";
					i++;
					if(i==(12/2)){
						to_bottom=true;
					}

			}else{
					ul.style.top=((-80*10)+(80*(10-i)))+"px";
					i--;
					if(i==0){
						to_bottom=false;
					}
			}
		},3000)
	}

//		控制按钮
	var top_a=document.querySelector(".paixing_gotop");
	var bottom_a=document.querySelector(".paixing_godown");
	top_a.onclick=e=>{
		var top=e.target;
		var count=parseInt(ul.style.top);
		if(count<((80*12)/2)&&count<0){
		count+=80;
		ul.style.top=count+"px";
		};
	}
	bottom_a.onclick=e=>{
		var top=e.target;
		var count=parseInt(ul.style.top);
		if(count>((-80*12)/2)&&count<0){
		count-=80;
		ul.style.top=count+"px";
		};
	}
	top_a.onmouseover=function(){
		clearInterval(timer);
		timer=null;
	}
	top_a.onmouseout=function(){
		gobottom();
	}
	bottom_a.onmouseover=function(){
		clearInterval(timer);
	}
	bottom_a.onmouseout=function(){
		gobottom();
	}
	ul.onmouseout=function(){
		gobottom();
	}
	ul.onmouseover=function(){
		clearInterval(timer);
		timer=null;
	}
})();								
//排行榜信息
$(()=> {
	ajax({
		type:"get",
		url:"php/route/top_ten.php"
	})
	.then(data=>{
		var html="";
		var $ul=$(".paixing");
		if(data.length>=10){
			show=10;
		}else{
			show=data.length;
		}
		for(var i=0;i<3;i++){
			var obj=data[i];
			html+=
				`
					<li>
						<div class="paixing_topthree">${obj.top_num}</div>
							<div class="paixing_detail">
								<a href="product_details.html?pid=${obj.pid}">
									<img src="${obj.mimg}" alt="">
									<div><p>${obj.title}</p><p>${obj.nprice}</p></div>
								</a>
							</div>
					</li>	
				`;
		}
		for(var i=3;i<show;i++){
			var obj=data[i];
			html+=
				`
					<li>
						<div class="paixing_others">${obj.top_num}</div>
							<div class="paixing_detail">
								<a href="product_details.html?pid=${obj.pid}">
									<img src="${obj.mimg}" alt="">
									<div><p>${obj.title}</p><p>${obj.nprice}</p></div>
								</a>
							</div>
					</li>	
				`;
		}
		$ul.html(html);
	})
})
		//产品列表
$(()=> {
	function cake_list(pnum = 0) {
		ajax({
			type: "get",
			url: "php/route/cake_list.php",
			data: location.search.slice(1) + "&pnum=" + pnum
		})
			.then(data=> {
				var html = "";
				var $ul = $(".products_ul");
				var $page = $(".page");
				for (var i = 0; i < data.data.length; i++) {
					var obj = data.data[i];
					html +=
						`
									<li class="products">
										<a href="product_details.html?pid=${obj.pid}" class="product_pic_title">
											<img src="${obj.sbimg}" alt="">
											<p>${obj.title}</p>
										</a>
										<p>
											<span class="price">￥${obj.nprice}</span>
											<span class="normalpirce">￥${obj.mprice}</span>
										</p>
									</li>
					`;
				}
				$ul.html(html);
				html = "";
				html+=`<a href="javascript:;" class="prev">上一页</a>`;
				if (data.pnum - 2 > 0) {
					html += `<a href="javascript:;" class="pages">${data.pnum - 2}</a>`;
				}
				if (data.pnum - 1 > 0) {
					html += `<a href="javascript:;" class="pages">${data.pnum - 1}</a>`;
				}
				html += `<a href="javascript:;" class="pages active">${data.pnum}</a>`;
				if (parseInt(data.pnum)+1<= data.pagecount) {
					html += `<a href="javascript:;" class="pages">${parseInt(data.pnum)+1}</a>`;
				}
				if (parseInt(data.pnum)+2<= data.pagecount) {
					html += `<a href="javascript:;" class="pages">${parseInt(data.pnum)+2}</a>`;
				}
				html+=`<a href="javascript:;" class="next">下一页</a>`;
				html+=`<span class="totalpage">第${data.pnum}/<span class="manypage">${data.pagecount}</span>页 共${data.productscount}记录</span>`;
				html+=`<input type="text" class="page_go" placeholder="第1页">
							<button class="page_go_btn">确定</button>`;
				$page.html(html);
			})
	}

	cake_list(1);

	$(".page").on("click",function(e){
		var $tar=$(e.target);
		if($tar.is(".pages")){
			var pnum = $tar.html();
			cake_list(pnum);
		}else if($tar.is(".prev")){
			var pnum = parseInt($(".active").html())-1;
			if(pnum>0){
				cake_list(pnum);
			}
		}else if($tar.is(".next")){
			var pnum = parseInt($(".active").html())+1;
			if(pnum<=$tar.prev().html()){
				cake_list(pnum);
			}
		}else if($tar.is(".page_go_btn")){
			var pnum = $(".page_go").val();
			if(pnum<=$(".manypage").html()){
				cake_list(pnum);
			}
		}
	})
});