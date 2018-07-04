$(function(){

	//购物车切换图片
	var isHover = false
	var timer1 = null;
	$(".buy_car").hover(function() {
		isHover = true;
		$(".cart-mini").css({"background": "#fff"});
		$(".cart-mini p ,.cart-mini span").css({"color": "#ff6700"});
		$(".buy_car img").attr("src", "images/icon/shopcarhover.png");
		$(".buy_car_spec").animate({
			height: 100
		}, 200, function() {
			$(".buy_car_spec p").html("购物车中还没有商品，赶紧选购吧！");
		});
	}, function() {
		isHover = false;
		$(this).stop(timer1);
		timer1 = setTimeout(function() {
			if (!isHover) {
				$(".buy_car_spec").animate({
					height: 0
				}, 200, function() {
					$(".buy_car_spec p").html("");
				});
				$(".buy_car img").attr("src", "images/icon/shopcar.png");
				$(".cart-mini").css({"background": "#424242"});
				$(".cart-mini p ,.cart-mini span").css({"color": "#b0b0b0"});
			}
		}, 200);
	});
	
    // nav_menu 向下展开与向上收缩的切换
    var preIndex=-1;
    var curIndex=-1;
	$(".link").each(function(index,element){
        $(this).mouseover(function() {
            curIndex = index;
            if(preIndex !== curIndex){
                $(".nav_menu").slideUp(400);
                $(".nav_menu").eq(curIndex).slideDown(400);
                preIndex = curIndex;
            };  
        });
        $(".nav_list").mouseleave(function() {
            $(".nav_menu").slideUp(400);
            preIndex=-1;
        });
    })
    
    //搜索框点击，移入，移出动画
	$(document).click(function() {
		$(".search_extra").hide();
		$(".search_txt").css("border", "1px solid #e0e0e0");
		$(".search_btn").css("border", "1px solid #e0e0e0");
		$(".search_btn").css("border-left", "none");
		$(".hot_word1,.hot_word2").show();
		$(".hot_word1,.hot_word2").animate({
			opacity: 100
		}, 300);
	});
	$(".search_box").click(function() {
		$(".search_extra").show();
		$(".search_txt").css("border", "1px solid #ff6700");
		$(".search_txt").css("border-bottom", "none");
		$(".search_btn").css("border", "1px solid #ff6700");
		$(".search_btn").css("border-left", "none");
		$(".hot_word1,.hot_word2").animate({
			opacity: 0
		}, 300);
		return false;
    });
	
	//category栏的category_item_box显示隐藏
	$(".category_item").hover(function(){
		var index = $(this).index();
		$(".category_item_box:eq("+index+")").css("display","block");
			var category_item_list = $(this).find(".category_item_box").children(".category_item_list");
			var width = 248;
			var len = category_item_list.length;
			category_item_list.width(width);
			width =len*width;
			$(".category_list .category_item_box").width(width);
	},function(){
		var index = $(this).index();
		$(".category_item_box:eq("+index+")").css("display","none");
	})

	//轮播图圆
	var innerGroup = $(".category_hot_item");
	var spanGroup = $(".category_move span");
	var _index = 0;
	var timer = null;
	var flag = true;
	// 鼠标进入轮播停止，鼠标离开轮播继续
	$(".category_hot").hover(function(){
		flag=false;
		clearInterval(timer);
	},function(){
		flag=true;
		autoGo(flag);
	})
	//下一个切换
	$(".right-arrow").on("click",function(){
		_index +=1;
		if(_index>=innerGroup.length-1){
			_index = 4;
		}
		flag=false;
		clearInterval(timer);
		selectPic(_index);	
	})
	//上一个切换
	$(".left-arrow").on("click",function(){
		_index -=1;
		if(_index<0){
			_index = 0;
		}
		flag=false;
		clearInterval(timer);
		selectPic(_index);	
	})
	spanGroup.on("click", function() {
		//导航切换
		flag=false;
		_index = spanGroup.index($(this));
		clearInterval(timer);
		selectPic(_index);	
	})	
	function autoGo(bol) {
		//自动行走
		if (bol) {
			timer = setInterval(go, 3000);
		}
	}
	function go() {
		//计时器的函数
		_index++;
		selectPic(_index);
	}
	function selectPic(num) {
		$(".category_move span").removeClass("cur_move").stop().eq(num).addClass("cur_move");
		if( num == innerGroup.length-1){
			$(".category_move span").removeClass("cur_move").stop().eq(0).addClass("cur_move");
		}
		innerGroup.eq(num).animate({
			opacity: 1,
		}, 1000, function() {
			//检查是否到最后一张
			if (num == innerGroup.length-1) {
				_index = 0;
				innerGroup.css("opacity", "0").eq(0).css("opacity", "1");
			}
		}).siblings().animate({
			opacity: 0,
		}, 500, 
		)
	}
	autoGo(flag);

	// 闪购倒计时
	function countTime() {  
		//获取当前时间  
		var date = new Date();  
		var now = date.getTime();  
		//设置截止时间  
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var endDate = new Date(year,month,day+1,0,0,0); 
		var end = endDate.getTime();  
		//时间差  
		var leftTime = end-now; 
		//定义变量 d,h,m,s保存倒计时的时间  
		var h,m,s;  
		if (leftTime>=0) {  
		h = Math.floor(leftTime/1000/60/60%24);  
		m = Math.floor(leftTime/1000/60%60);  
		s = Math.floor(leftTime/1000%60);
		if (h <= 9) h = '0' + h;
		if (m <= 9) m = '0' + m;
		if (s <= 9) s = '0' + s;                 
		}  
		//将倒计时赋值到div中  
		$(".flashPurchase_h")[0].innerHTML = h;  
		$(".flashPurchase_m")[0].innerHTML = m;  
		$(".flashPurchase_s")[0].innerHTML = s;  
		//递归每秒调用countTime方法，显示动态时间效果  
		setTimeout(countTime,1000);  
		}  
	countTime();
	
    //小米闪购 左右切换
    var dir = true;
    var leftVal = 0;
	$(".star_spec .left_img").click(function() {
		if (!dir) {
			dir = true;
            leftVal=leftVal+248*3;
			$(".star_spec .right_img").css({
				"background-image": "url(images/icon/right1.png)",
				"cursor" : "pointer"
			});
			
			$(".star_spec .spec_item_list").animate({
				left: leftVal+"px"
			}, 200);
			if (dir){
				$(".star_spec .left_img").css({
					"background-image" : "url(images/icon/left2.png)",
					"cursor" : "default",
				});
			}
		}
	});
	$(".star_spec .right_img").click(function() {
		if (dir) {
            dir = false;
            leftVal=leftVal-248*3;
			$(".star_spec .left_img").css({
				"background-image": "url(images/icon/left1.png)",
				"cursor" : "pointer"
			});
			$(".star_spec .spec_item_list").animate({
				left: leftVal+"px"
			}, 200);
			if(!dir){
				$(".star_spec .right_img").css({
					"background-image" : "url(images/icon/right2.png)",
					"cursor" : "default"
				});
			}				
		}
	});

	// show页面切换
	$(".spec_type_nav li").mouseover(function(){
		var showNum = $(this).index();
		var nowEle = $(this).parents(".show");
		nowEle.find(".show_list").removeClass("display").eq(showNum).addClass("display");
		nowEle.find(".spec_type_nav li a").removeClass("curRed").eq(showNum).addClass("curRed");
	})
	
	//推荐切换
	var recommendDir = 0;
	var recommendLeftVal = 0;
	// 上一个切换
	$(".recommend .left_img").click(function() {
		if (recommendDir>0) {
			recommendDir--;
            recommendLeftVal=-248*5*recommendDir;
			$(".recommend .right_img").css({
				"background-image": "url(images/icon/right1.png)",
				"cursor" : "pointer"
		});
			$(".recommend_spec_list").animate({
				left: recommendLeftVal+"px"
			}, 200);
			if (recommendDir<=0){
				$(".recommend .left_img").css({
					"background-image" : "url(images/icon/left2.png)",
					"cursor" : "default",
				});
			}
		}
	});
	// 下一个切换
	$(".recommend .right_img").click(function() {
		if (recommendDir<2) {
			recommendDir++;
            recommendLeftVal=-248*5*recommendDir;
			$(".recommend .left_img").css({
				"background-image": "url(images/icon/left1.png)",
				"cursor" : "pointer"
			});
			$(".recommend_spec_list").animate({
				left: recommendLeftVal+"px"
			}, 200);
			$(".right_img").mouseover(function(){
		
			})		
		}
		if(recommendDir>=2){
			$(".recommend .right_img").css({
				"background-image" : "url(images/icon/right2.png)",
				"cursor" : "default"
			});
			recommendDir = 2;
		}	
	});

	//内容切换
	$(".content_spec > li").hover(function() {
		var This = $(this);
		//点击左移动
		$(this).find(".content_left").hover(function() {
			var left = This.find(".content_spec_list").position().left;
			if (left / -296 > 0) { 
				$(this).css("cursor", "pointer");
			} else {
				$(this).css("cursor", "default");
			}
			$(this).unbind('click').click(function() {
				left = This.find(".content_spec_list").position().left;

				if (!This.find(".content_spec_list").is(":animated") && left < 0) {
					This.find(".content_spec_list").animate({
						left: "+=296px"
					});
					//圆圈切换
					This.find(".content_page > li > span").removeClass("active");
					This.find(".content_page > li:eq(" + (left / -296 - 1) + ") > span").addClass("active");
				}
				left = $(".content_spec_list").position().left;
				if (left / -296 > 1) {
					$(this).css("cursor", "pointer");
				} else {
					$(this).css("cursor", "default");
				}
			});
		});
		//点击右移动
		$(this).find(".content_right").hover(function() {
			var left = This.find(".content_spec_list").position().left;
			if (left / -296 < 3) {
				$(this).css("cursor", "pointer");
			} else {
				$(this).css("cursor", "default");
			}
			$(this).unbind('click').click(function() {
				left = This.find(".content_spec_list").position().left;
				if (!This.find(".content_spec_list").is(":animated") && left > -888) {
					This.find(".content_spec_list").animate({
						left: "-=296px"
					});
					This.find(".content_page > li > span").removeClass("active");
					This.find(".content_page > li:eq(" + (left / -296 + 1) + ") > span").addClass("active");
				}
				if (left / -296 < 2) {
					$(this).css("cursor", "pointer");
				} else {
					$(this).css("cursor", "default");
				}
			});
		}, function() {
		});
	});
	//内容圆圈切换
	$(".content_page > li > span").hover(function() {
		$(this).click(function() {
			var root = $(this).parents(".content_spec_wrap");
			var This = $(this);
			var index = $(this).parent().index();
			var Left = -index * 296;
			console.log(index);
			if (!root.find(".content_spec_list").is(":animated")) {
				root.find(".content_page > li > span").removeClass("active");
				This.addClass("active");
				root.find(".content_spec_list").animate({
					left: Left + "px"
				});
			}
		});
	});

})

