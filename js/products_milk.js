/**
 * Created by web-01 on 2017/12/7.
 */
    //产品列表
$(()=> {
    function cake_list(pnum = 0) {
        ajax({
            type: "get",
            url: "php/route/milk_list.php",
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