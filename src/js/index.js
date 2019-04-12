var lineLeft = $('.menu_line').position().left;
var lineWidth = $('.menu_line').width();

$('.language_current').on('click',function(){
	if($(this).parent().hasClass('hide')){
		$(this).parent().css('background-color', '#fff')
			.removeClass('hide');
		$('.language-triangle').css('border-color', '#000 transparent transparent transparent')
			.next().show();
	}else{
		$(this).parent().css('backgroundColor', 'transparent')
			.addClass('hide');
		$('.language-triangle').css('border-color', '#fff transparent transparent transparent')
			.next().hide();
	}
})

$('#menu').on('mouseenter','.item' ,function() {
	$('.menu_line').css({
		left: $(this).position().left + 24,
		width: $(this).width() - 48,
	})
}).on('mouseout','.item' ,function() {
	$('.menu_line').css({
		left: lineLeft,
		width: lineWidth,
	})
})