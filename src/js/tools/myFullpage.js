//实例方法
$.fn.extend({
	myFullpage: function(config){
		//config.colorsArray
		//初始化变量
		var colorsArr = config.colorsArray;
		//频繁使用的变量。减少代码量，提高性能
		var $W = $(this);
		var $Section = $W.find('.section');
		var commonStyle = {
			width: '100%',
			height: '100%',
		}
		var clientWidth = $(window).outerWidth();
		var clientHeight = $(window).outerHeight();
		
		var lock = true;
		
		//索引 纵向页面第一个
		var curIndex = 0;
		//初始化样式
		
		//主页面导航按钮
		var $sectionList = $('<ul class="page_list"></ul>');
		//分页面导航按钮
		var $sliderList = $('<ul class="slider_list"></ul>');
		//分页面向左按钮
		var $sliderLeftBtn = $(`<div class="left_btn controlBtn"><svg class="left" width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve">
                <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="
                    45.63,75.8 0.375,38.087 45.63,0.375 ">
            </polyline></svg></div>`);
		//分页面向右按钮
		var $sliderRightBtn = $(`<div class="right_btn controlBtn"><svg class="right" width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve">
                <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="
                    0.375,0.375 45.63,38.087 0.375,75.8 ">
            </polyline></svg></div>`);
			
		
		$('html')
			.add('body')
				.css({
					position: 'relative',
					overflow: 'hidden',
					margin:  0,
				})
					.add($W)
						.add($Section)
							.css(commonStyle);
		$W.css({position: 'absolute', left: 0, top: 0})
			.append($sectionList)
			.find('.section')
				.each( function (index, ele) {
					$(ele).css({
						background: colorsArr[index],
						position: 'relative',
						//这里必须在循环内查找slide，因为其他section中也有可能 有slide，若在循环外find(),
						//则会将每个section中的slide集中一起
					}).find('.slide')
						.css({float: 'left', width: clientWidth, height: clientHeight, position: 'relative'})
							.wrapAll('<div class="sliderWrapper"></div>')
				});
		
		$Section.find('.sliderWrapper').parent()
			.append($sliderList).append($sliderLeftBtn).append($sliderRightBtn).end()
			.css({position: 'relative', left: 0, top: 0})
				.each(function (index, ele) {
					$(ele).css({width: $(ele).find('.slide').length * clientWidth, height: clientHeight});
				})
		
		//js控制移动
		//active
		//先给第一section active
		//给每一个section 下面的第一个slide innerActive
		
		$Section.eq(0)
			.addClass('active')
				.end().find('.sliderWrapper').each(function (index, ele) {
					$(ele).find('.slide').eq(0).addClass('innerActive')
				});
		
		//键盘控制移动
		$(document).on('keydown', controlMove);
		//鼠标滚轮控制
		$(document).on('mousewheel', controlMove);
		//左右键移动控制
		$('.left_btn').on('click', {'controlBtn' : 'left'}, controlMove);
		$('.right_btn').on('click', {'controlBtn' : 'right'}, controlMove);
		
		//导航条点击控制页面
		$('.page_list').on('click','.page_item', function() {
			lock = false;
			pageMove($(this).index(), this);
		})
		$('.slider_list').on('click','.slider_item', function() {
			lock = false;
			pageMove($(this).index(), this)
		})
		
		//点击页面移动函数
		function pageMove(index, target) {
			if(target.className == 'page_item'){
				$W.animate({
					top: -index * clientHeight,
				}, 600 , 'swing', function(){
					lock = true;
					$Section.removeClass('active');
					$Section.eq(index).addClass('active');
					pageListMove(index, 'section');
					curIndex = index;
					//当动画执行完成后，执行回调函数，将进入页面函数触发
					config.afterLoad(index);
				})
			}else if(target.className == 'slider_item'){
				var $SW = $('.active').find('.sliderWrapper');
				var curShowDom = $SW.find('.innerActive');
				$SW.animate({
					left: -index * clientWidth
				}, 600, 'swing', function() {
					lock = true;
					pageListMove(index, 'slider');
					curShowDom.removeClass('innerActive');
					curShowDom.eq(index).addClass('innerActive');
				})
			}
		}
		
		//页面移动后导航按钮变化
		function pageListMove(index, target){
			var $list = target == 'section' ? $('.page_item') : $('.slider_item');
			$list.eq(index).addClass('listActive').siblings().removeClass('listActive');
		}
		
		//键盘鼠标控制移动函数
		function controlMove(e) {
				//e.which
				// left 37 top 38 rihtt 39 bottom 0
				if (e.which == 38 || e.which == 40 || e.deltaY){
					//垂直移动 $W
					if(lock){
						lock = false;
						var newTop = $W.offset().top;
						//direction用作标示，当页移动为top时，curIndex+1即为前一页
						//当页移动为botom时，curIndex-1即为前一页
						var direction = '';
						if((e.which == 38 || e.deltaY > 0 ) && curIndex != 0){
							direction = 'top';
							//离开页面函数，需要在curIndex变化之前执行
							config.onLeave(curIndex, direction);
							curIndex--;
							newTop += clientHeight;
							
						}else if((e.which == 40 || e.deltaY < 0) && curIndex != $Section.length -1){
							direction = 'bottom';
							config.onLeave(curIndex, direction);
							curIndex++;
							newTop -= clientHeight;
						}
						$W.animate({
							top: newTop,
						}, 600 , 'swing', function(){
							lock = true;
							$Section.eq(curIndex).addClass('active');
							pageListMove(curIndex, 'section');
							if(direction == 'top'){
								$Section.eq(curIndex + 1).removeClass('active');
							}else{
								$Section.eq(curIndex - 1).removeClass('active');
							}
							//当动画执行完成后，执行回调函数，将进入页面函数触发
							config.afterLoad(curIndex, direction);
						})
					}
				}
				if($Section.eq(curIndex).find('.slide').length){
					if (e.which == 37 || e.which == 39 || e.data){
						//水平移动  $W
						//无法使用垂直移动相同方法，垂直页面只有一个，横向页面可能有多个
						if(lock) {
							lock = false;
							var $SW = $('.active').find('.sliderWrapper');
							var curShowDom = $SW.find('.innerActive');
							var newLeft = $SW.offset().left;
							var direction = '';
							if(( e.which == 37 || e.data.controlBtn == 'left') && curShowDom.index() != 0){
								//left
								newLeft += clientWidth;
								direction = 'left';
							}else if((e.which == 39 ||  e.data.controlBtn == 'right') &&  curShowDom.index() != $SW.find('.slide').length - 1){
								//right
								newLeft -= clientWidth;
								direction  = 'right'
							}
							$SW.animate({
								left: newLeft
							}, 600, 'swing', function() {
								lock = true;
								//先判断是否平行移动过，若移动再进行增删类名
								direction != '' ? curShowDom.removeClass('innerActive') : '';
								var nowIndex = curShowDom.index();
								if(direction == 'left'){
									curShowDom.prev().addClass('innerActive');
									pageListMove(nowIndex - 1, 'slider');
								}else if(direction == 'right'){
									curShowDom.next().addClass('innerActive');
									pageListMove(nowIndex + 1, 'slider');
								}
							})
							
						}
					}
				}
			}
	},
	
})   