var pageEngine = {
	/*
	  	初始化fullpage插件
	 	@method init
	 	@param {string} select 主入口标签
	 	@parem {array} colorsArray 页面背景色
	 	@return this 便于链式调用
	 * */
	init : function (select, colorsArray) {
		//由于入口文件调用方式为pageEngine.init，因此将数据绑定在this方便后续函数中获取
		this.$W = $(select);
		this.colorsArray = colorsArray;
		//判断是非是slide标签，方便后续component函数插入
		this.slideFlag = false;
		this.sectionStr = '';
		this.sectionTop = 0;
		this.sliderStr = '';
		this.sliderLeft = 0;
		
		this.n = 1;
		return this;
	},
	
/*
	 	添加section分页面
	 	@method addSection
	 	@param {string} calssName 分页面类名
	 	@return this 便于链式调用
	 * */
	addSection : function (className) {
		this.slideFlag = false;
		this.$page = $('<div class="section"></div>').addClass(className);
		this.$page.appendTo(this.$W);
		this.sectionStr += '<li class="page_item"></li>';
		this.sectionTop += 30;
		
		return this;
	},
	
	/*
	 	添加section下slide分页面
	 	@method addSlide
	 	@param {string} className 分页面 类名
	 	@return this 便于链式调用
	 * */
	addSlide : function (className) {
		this.slideFlag = true;
		this.$slide = $('<div class="slide"></div>').addClass(className);
		this.$slide.appendTo(this.$page);
		this.sliderStr += '<li class="slider_item"></li>';
		this.sliderLeft += 30;
		
		return this;
	},
	
	/*
	 	添加分页面内容
	 	@method addComponent 
	 	@param {object} config 分页面内容所有样式
	 	@return this 便于链式调用
	 * */
	addComponent : function (config) {
		var oCp = null;
		//留有接口，方便后续添加新的工厂方法
		switch (config.type) {
			case 'nest':
				oCp = ComponentNest(config);
				break;
			case 'JSX':
				oCp = ComponentJSX(config);
				break;
			case '工厂类型':
				oCp = 工厂方法;
				break;
		}
		this.slideFlag ? this.$slide.append(oCp) : this.$page.append(oCp);
		
		return this;
	},
	
	/*
	 	分页面内容动作接口函数，这样便于后续存在新的内容工厂添加新动作的执行
	 	@method bindEvent
	 * */
	bindEvent: function () {
		this.$W.find('.section').on({
			_leave: function() {
				$(this).find('.component').trigger('cpLeave');
			},
			_load: function() {
				$(this).find('.component').trigger('cpLoad');
			}
		});
	},
	
	/*
	 	启动分页面内容动作函数 
	 	@method load
	 * */
	load: function () {
		var self = this;
		this.bindEvent();
		this.$W.myFullpage({
			colorsArray: this.colorsArray,
			onLeave: function (index) {
				self.$W.find('.section').eq(index).trigger('_leave');
			},
			afterLoad: function (index) {
				self.$W.find('.section').eq(index).trigger('_load');
			}
		});
		$('.page_list').append($(this.sectionStr)).css('top', 'calc(50% - ' + this.sectionTop / 2 + 'px)')
				.children().eq(0).addClass('listActive');
		$('.slider_list').append($(this.sliderStr)).css('left', ($('.slide').width() - this.sliderLeft) / 2 + 'px')
				.children().eq(0).addClass('listActive');
		this.$W.find('.section').eq(0).trigger('_load');
	}
}
