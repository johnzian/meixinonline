    //var count = 0;
    //var isgo = false;
    //var timer;
    //var count1 = 0;
    //var isgo1 = false;
		//
    //
    //
    //
    //
		//
    //
		//function stop(){
		//	clearTimeout(timer);
		//}
    //
    //
		//showtime();
    //    function showtime() {
    //        timer = setInterval(function () {
		//		var lunbo_inside = document.getElementsByClassName("lunbo_inside")[0];
		//		var changepic = document.getElementsByClassName("changepic");
    //            if (isgo == false) {
    //                count++;
    //                lunbo_inside.style.transform = "translate(" + -1200 * count + "px)";
    //                if (count >= changepic.length - 1) {
    //                    count = changepic.length - 1;
    //                    isgo = true;
    //                }
    //            }
    //            else {
    //                count--;
    //                lunbo_inside.style.transform = "translate(" + -2400 * count + "px)";
    //                if (count <= 0) {
    //                    count = 0;
    //                    isgo = false;
    //                }
    //            }
    //        }, 4000)
    //    }
		//showtime1();
    //    function showtime1() {
    //        timer = setInterval(function () {
		//var footer_lunbo_ul = document.getElementsByClassName("footer_lunbo_ul")[0];
    //    var footer_lunbo_pic = document.getElementsByClassName("footer_lunbo_pic");
    //            if (isgo1 == false) {
    //                count1++;
    //                footer_lunbo_ul.style.transform = "translate(" + -180 * count1 + "px)";
    //                if (count1 >= footer_lunbo_pic.length - 7) {
    //                    count1 = footer_lunbo_pic.length - 7;
    //                    isgo1 = true;
    //                }
		//			console.log(footer_lunbo_pic[count1]);
    //            }
    //            else {
    //                count1--;
    //                footer_lunbo_ul.style.transform = "translate(" + -180 * count1 + "px)";
    //                if (count1 <= 0) {
    //                    count1 = 0;
    //                    isgo1 = false;
    //                }
    //            }
    //        }, 2000)
    //    }
    //


    //$(()=>{
    //    var $lunbo_box=$(".lunbo_inside");
    //    var pic_width=1200;
    //    var moved=0;
    //    var timer=null;
    //    var canMove=true;
    //    $lunbo_box.css("width",($lunbo_box.children().length)*pic_width);
    //
    //
    //
    //    function autoMove(){
    //        if(canMove){
    //            if(moved==$lunbo_box.children().length-1){//先判断是否最后一张
    //                moved=0;//将moved归0
    //                $lunbo_box.css("left",0);
    //            }
    //            timer=setTimeout(()=>{//先等待WATI秒
    //                move(1,autoMove);
    //            },5000);
    //        }
    //    }
    //    autoMove();
    //
    //
    //
    //
    //    $lunbo_box.hover(
    //        ()=>{//关闭轮播的开关变量
    //            canMove=false;
    //            clearTimeout(timer);//停止等待
    //            timer=null;
    //        },
    //        ()=>{//打开轮播开关，启动自动轮播
    //            canMove=true;
    //            autoMove();
    //        }
    //    );
    //
    //
    //
    //
    //    function move(dir,callback){
    //        moved+=dir;//按照方向增减moved
    //        $lunbo_box.stop(true).animate({
    //            left:-pic_width*moved
    //        },1000,callback);
    //    }
    //});





    