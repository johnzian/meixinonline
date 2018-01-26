/**
 * Created by web-01 on 2017/12/20.
 */
$(()=> {
//搜索功能
    $.ajax({
        type:"get",
        url:"php/route/search_product.php",
        data:location.search.slice(1),
        success:function(data){
            var html = "";
            var $ul = $(".products_ul");

            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                html +=
                    `
									<li class="products">
										<a href="product_details.html?pid=${obj.pid}" class="product_pic_title">
											<img src="${obj.limg}" alt="">
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
        }
    })


});