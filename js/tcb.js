/*阻止a默认行为*/
//每次给a绑定事件都要组织一次默认事件，因为每次的绑定事件都对它来说都是一个新的
$("a").click(function(e) {
	e = e || window.event;
	e.preventDefault();
});

/*---li的鼠标经过事件--*/
$("#myul li").mouseover(function() {
	$(this).addClass("change");
	$(this).parent().next().children().eq($(this).index()).show();
});
$("#myul li").mouseout(function() {
	$(this).removeClass("change");
	$(this).parent().next().children().hide();
});
/*----放到div上显示跟隐藏--*/
$("#div>div").mouseover(function() {
	$(this).show();
});
$("#div>div").mouseout(function() {
	$("#div>div").hide();
});
/*----图片轮播----*/
var str = ["imgs/1.png", "imgs/2.jpg"];
var t = setInterval(f1, 1000);
var n = 1;
function f1() {
	$("#img").prop({
		src: str[n]
	});
	if (n > str.length - 1) {
		n = 0;
	} else {
		n = n + 1;
	}
};



/*----获取城市数据----*/
var citydata;
$.get("data/city.json", function(data) {
		citydata = data;
	/*---赋值进入模板--*/
	$("#tmp").load("tmp/city.html", function() {
		var str = baidu.template("citytmp", citydata);
		$("#changecity").html(str);
		/*--点击出现城市--*/
		$("#clkcity").click(function() {
			$("#changecity").css({
				top: "30px",
				left: "250px"
			});
			$("#changecity").show();
		});
		//点击关闭消失
		$("#span1").click(function() {
			$("#changecity").hide();
		});
		/*---第二部分--*/
		//下面部分城市出现
		$("#bj").click(function() {
			$("#changecity").css({
				top: "1490px",
				left: "189px"
			});
			$("#changecity").show();
		});
		$("#span2").click(function() {
			$("#changecity").hide();
		});
		/*-----出现区县----*/
		$("#qx").click(function() {
			$("#quxinan").show();
		});
		$("#span2").click(function() {
			$("#quxinan").hide();
		});
		/*-----点击字母出现下面城市--*/
		$("#eg a").click(function(e) {
			e.preventDefault(); //a标签的#号默认跳到屏幕的顶部,要阻止a标签的默认的行为
			$(".xiacity").hide();
			$(".xiacity").eq($(this).index()).show();
			$("#eg a").css({
				color: "",
				border: "none",
				borderBottom: "1px solid #cfcfcf"
			});
			$(this).css({
				color: "#ff6600",
				borderTop: "1px solid #cfcfcf",
				borderRight: "1px solid #cfcfcf",
				borderLeft: "1px solid #cfcfcf",
				borderBottom: "none"
			});
		});
		//点击热门城市出现区县
		$("#re").on("click","a",function(e){
			e.preventDefault();
			var strcode = e.target.title;
			console.log(strcode);
			post(strcode);
		});	
		//点击字母下面的城市出现区县
		$("#xiacity a").click(function(e) {
			e.preventDefault();
			var strcode = e.target.title;
			console.log(strcode);
			post(strcode);
		});
		/*---清除模板里面的内容--*/
		$(this).find("#citytmp").remove();
	});
});

	//定义一个回调函数处理返回的jsonp数据
		function getCity(data){
			window.cityData = data;
			$("#tmp").load("tmp/quxian.html",function(){
				var str = baidu.template("quxiantmp", cityData);
				$("#quxianbt").html(str);
				$(this).find("#quxiantmp").remove();
			})
		};
		//发送jsonp请求
		function post(code){
		var targ = document.createElement("script");
		targ.src = "http://www.bang.360.cn/aj/get_area/?citycode="+code+"&callback=getCity";
		document.body.appendChild(targ);
		}

/*---shop部分抓取数据----*/
/*---先获取数据---*/

var shopdata;
$.getJSON("data/shop.json",function(data) {
	shopdata = data;
	/*---赋值进入模板--*/
	$("#tmp").load("tmp/shop.html", function() {
		var str = baidu.template("shoptmp", shopdata);
		$("#neirong").html(str);
		$(this).find("#shoptmp").remove();
		//鼠标经过显示
		$("#neirong li").mouseenter(function() {
			$(".see").eq($(this).index()).show();
		});
		$("#neirong li").mouseleave(function() {
			$(".see").hide();
		});

	});
});


/*------修手机部分数据抓取上传---*/
var xiushoujidata;
$.get("data/xiushouji.json", {}, function(data) {
	xiushoujidata = data;
	$("#tmp").load("tmp/xiushouji.html", function() {
		var str = baidu.template("xiushoujitmp", xiushoujidata);
		$("#showone").html(str);
		$(this).find("#xiushoujitmp").remove();
	});
});

/*-----修电脑部分数据抓取上传---*/
var xiudiannaodata;
$.get("data/xiudiannao.json", {}, function(data) {
	xiudiannaodata = data;
	/*---赋值进入模板--*/
	$("#tmp").load("tmp/xiudiannao.html", function() {
		var str = baidu.template("xiudiannaotmp", xiudiannaodata);
		$("#showtwo").html(str);
		$(this).find("#xiudiannaotmp").remove();
	});
});

/*----卖手机部分数据抓取上传----*/
var maishoujidata;
$.get("data/maishouji.json", {}, function(data) {
	maishoujidata = data;
	/*---赋值进入模板--*/
	$("#tmp").load("tmp/maishouji.html", function() {
		var str = baidu.template("maishoujitmp", maishoujidata);
		$("#showthree").html(str);
		$(this).find("#maishoujitmp").remove();
	});
});

/*----买手机部分数据抓取上传----*/
var buydata;
$.get("data/shoujixinghao.json", {}, function(data) {
	buydata = data;
});
/*---赋值进入模板--*/
$("#tmp").load("tmp/buyshouji.html", function() {
	var str = baidu.template("buytmp", buydata);
	$("#showfour").html(str);
	$(this).find("#buytmp").remove();
});
/*---热门手机回收数据抓取上传--*/
var huishoudata;
$.get("data/huishou.json", {}, function(data) {
	huishoudata = data;
});
/*---赋值进入模板--*/
$("#tmp").load("tmp/huishou.html", function() {
	var str = baidu.template("huishoutmp", huishoudata);
	$("#huishou").html(str);
	$(this).find("#buytmp").remove();
});

/*-----地图----*/
$("#anniu").click(function() {
	var cx = parseInt($(window).width());
	var cy = parseInt($(window).height());
	var sx = parseInt($("#dt").width());
	var sy = parseInt($("#dt").height());
	var l = (cx - sx) / 2 + "px";
	var t = (cy - sy) / 2 + "px";
	$("#dt").css({
		left: l,
		top: t
	});
	$("#zhe").show();
});
$("#span3").click(function() {
	$("#zhe").hide();
});
//调用高德地图
$(function(){
	var map = new AMap.Map("dtbt", {
		resizeEnable: true,
		zoom: 11,
		center: [116.397428, 39.90923]
	});
	//设置地图语言 英文："en" 中英混合 "zh_en" 中文'zh_cn'
	map.setLang("zh_en");
	//创建控件
	//比例尺
	var scale = new AMap.Scale({
			visible: true
		}),
		//工具条
		toolBar = new AMap.ToolBar({
			visible: true
		}),
		//鹰眼
		overView = new AMap.OverView({
			visible: true
		});
	map.addControl(scale);
	map.addControl(toolBar);
	map.addControl(overView);
	//工具条操作
	//方向盘显示隐藏
	toolBar.hideDirection();
	toolBar.showDirection();
	//工具条标尺显示隐藏
	toolBar.hideRuler();
	toolBar.showRuler();
	//鹰眼操作
	//显示隐藏鹰眼按钮
	overView.show();
	overView.hide();
	//打开或关闭鹰眼
	overView.open();
	overView.close();
	// window.maps=map;
	// 使用setCity设置地图中心城市
	// map.setCity("德州");
	//设置中心和缩放
	map.setZoomAndCenter(14, [116.205467, 39.907761]);
	map.setZoom(12);
	map.setCenter([116.205467, 39.907761]);
	//平移像素
	map.panBy(200, 200);
	//平移到某坐标
	map.panTo([116.397428, 39.90923]);
	//创建自动提示输入框
	var auto = new AMap.Autocomplete({
		input: "tipinput"
	});

	AMap.event.addListener(auto, "select", function(e) {
		if (e.poi && e.poi.location) {
			map.setZoom(15);
			map.setCenter(e.poi.location);
			console.log(e);
			var marker = new AMap.Marker({
				map: map,
				position: e.poi.location,
				title: e.poi.name
			});
		}
	});

	$.get("data/shop.json", {}, function(data) {
		var shopdata = data.shop_data;
		for (var n in shopdata) {
			map.setZoom(9);
			var marker = new AMap.Marker({
				position: [shopdata[n].map_longitude, shopdata[n].map_latitude],
				title: shopdata[n].shop_name,
				map: map,
				icon: 'http://vdata.amap.com/icons/b18/1/2.png'
			});
		}
	});
});
//360同城帮登录界面
$("#denglu").click(function() {
	var cx = parseInt($(window).width());
	var cy = parseInt($(window).height());
	var sx = parseInt($("#dl").width());
	var sy = parseInt($("#dl").height());
	var l = (cx - sx) / 2 + "px";
	var t = (cy - sy) / 2 + "px";
	$("#dl").css({
		left: l,
		top: t
	});
	$("#dlzhe").show();
});
//点击关闭标签
$("#dlspan").click(function() {
	$("#dlzhe").hide();
});
//360同城帮注册界面
$("#zhuce").click(function() {
	var cx = parseInt($(window).width());
	var cy = parseInt($(window).height());
	var sx = parseInt($("#zcshow").width());
	var sy = parseInt($("#zcshow").height());
	var l = (cx - sx) / 2 + "px";
	var t = (cy - sy) / 2 + "px";
	$("#zcshow").css({
		left: l,
		top: t
	});
	$("#zczhe").show();
});
//点击关闭标签
$("#zcspan").click(function() {
	$("#zczhe").hide();
});

// 翻页效果
$(function() {
	function pager(pageId, pageSize, totleNum, currentPage) {
		var pageCount = Math.ceil(totleNum / pageSize),
			currentPage = currentPage || "1",
			barFrame = '<li id="shou"><a href="#">首页</a></li>' +
			'<li id="shang"><a href="#">&gt;&gt;上一页</a></li>' +
			'<li><a href="#">下一页&gt;&gt;</a></li>'+
			'<li id="wei"><a href="#">尾页</a></li>';
		//构建分页工具主结构
		$("#" + pageId).html(barFrame);
		//构建页码
		//初始化起始页码
		var startIndex = currentPage <= 5 ? 1 : currentPage - 4;
		// console.log(startIndex);
		//隐形数据转换
		// var str;
		// str+="1";
		// console.log(str);
		var str = "";
		for (var n = 0; n < 10 && startIndex <= pageCount; n++) {
			str += startIndex == currentPage ? "<li><a href='#' class='libg'>" + startIndex + "</a></li>" : "<li><a href='#'>" + startIndex + "</a></li>";
			startIndex++;
		}
		$("#" + pageId).find("a").eq(2).before(str);

		// $(".libg").html()==1 ? $("#shang").hide() : $("#shang").show();
		// $(".libg").html()<6 ? $("#shou").hide() : $("#shou").show();
		// $(".libg").html()<11 ? $("#wei").hide() : $("#wei").show();
		// $("#myul2 a").click(function(e){
		// 	e.preventDefault();
		// 	var ht = $(this).html();
		// 	switch (ht) {
		// 		case "首页":
		// 			pager("myul2", 5, 100, 1);
		// 			break;
		// 		case "下一页&gt;&gt;":
		// 			pager("myul2", 5, 100, parseInt($(".libg").html()) + 1);
		// 			break;
		// 		case "&gt;&gt;上一页":
		// 			pager("myul2", 5, 100, $(".libg").html() - 1);
		// 			break;
		// 		case "尾页":
		// 			pager("myul2", 5, 100, pageCount);
		// 			break;	
		// 		default:
		// 			pager("myul2", 5, 100, ht);
		// 			break;
		// 	}
		// 	$(".libg").html()==1 ? $("#shang").hide() : $("#shang").show();
		// 	$(".libg").html()<6 ? $("#shou").hide() : $("#shou").show();
		// 	$(".libg").html()<11 ? $("#wei").hide() : $("#wei").show();
		// });

	}
	pager("myul2", 5, 100, 1);
	$(".libg").html()==1 ? $("#shang").hide() : $("#shang").show();
	$(".libg").html()<6 ? $("#shou").hide() : $("#shou").show();
	$(".libg").html()<11 ? $("#wei").hide() : $("#wei").show();
	$("#myul2").on("click","a",function(e){
		e = e||window.event;
		e.preventDefault();
		var ht = $(this).html();
			switch (ht) {
				case "首页":
					pager("myul2", 5, 100, 1);
					break;
				case "下一页&gt;&gt;":
					pager("myul2", 5, 100, parseInt($(".libg").html()) + 1);
					break;
				case "&gt;&gt;上一页":
					pager("myul2", 5, 100, $(".libg").html() - 1);
					break;
				case "尾页":
					pager("myul2", 5, 100, Math.ceil(100/5));
					break;	
				default:
					pager("myul2", 5, 100, ht);
					break;
			}
			$(".libg").html()==1 ? $("#shang").hide() : $("#shang").show();
			$(".libg").html()<6 ? $("#shou").hide() : $("#shou").show();
			$(".libg").html()<11 ? $("#wei").hide() : $("#wei").show(); 
	});
});
