/*
	初始化页面
	参数：初始化元素，初始化页面背景色
*/
pageEngine.init('.wrapper', ['#FF5F45', '#0798EC', '#FC6C7C', '#FEC401'])
			//创建主页
			.addSection('section1')
				//创建页面内容，可多次调用
				.addComponent({
						type: 'nest',
						select: 'div',
						className:  'content',
						children: [
							{
								select: 'h1',
								className:  'title',
								text: 'fullPage',
							},
							{
								select: 'h2',
								text: '创建美丽的全屏滚动网站',
								css: {
									color: 'rgba(255,255,255,.7)',
									fontSize: '1.73em',
									fontWeight: '100',
									margin: '-10px 30px 10px',
								}
							},
							{
								select: 'ul',
								className:  'download',
								children:[
									{
										select: 'li',
										children: [
											{
												select: 'a',
												text: 'fullpage.js 插件',
												attr:{
													href: '#'
												}
											}
										]
									},
									{
										select: 'li',
										children: [
											{
												select: 'a',
												text: '下载',
												css: {
													background: '#004f69',
													color: '#fff',
												},
												attr:{
													href: '#'
												}
											}
										]
									},
									{
										select: 'li',
										children: [
											{
												select: 'a',
												text: '在GitHub上查看',
												attr:{
													href: '#'
												}
											}
										]
									},
								]
							},
							{
								select: 'div',
								children:[
									{
										select: 'iframe',
										css: {
											width: '152px',
											height: '30px',
										},
										attr: {
											src: 'https://ghbtns.com/github-btn.html?user=alvarotrigo&repo=fullpage.js&type=star&count=true&size=large',
											scrolling: '0',
											frameborder: '0',
										}
									}
									
								],
							},
							{
								select: 'div',
								className: 'big-image',
								css: {
									    backgroundImage: 'url(https://alvarotrigo.com/fullPage/imgs/trusted-by.png)',
										width: '80%',
										maxWidth: '536px',
										height: '36px',
										display: 'block',
										margin: '0 auto',
										position: 'absolute',
										bottom: '-130px',
										left: '0',
										right: '0',
								}
							}
						]
					})
			.addSection('section2')
				//创建分页
				.addSlide('slide1')
					.addComponent({
						type: 'JSX',
						className: 'intro',
						templete: 
								`<div>
									<h1 class="sliderT">打开</h1>
									<p>fullPage.js会经常维护更新，适应大众需求</p>
									<p>自2013年起解决开发者问题</p>
									<ul>
										<li class="github_data github_data_1">
											<h4>1,650+</h4>
											<span>提交</span>
										</li>
										<li class="github_data github_data_2">
											<h4>3,070+</h4>
											<span>不公开的问题</span>
										</li>
										<li class="github_data github_data_3">
											<h4>115</h4>
											<span>贡献者</span>
										</li>
									</ul>
								</div>`,
					})
				.addSlide('slide2')
					.addComponent({
						type: 'JSX',
						className: 'intro',
						templete: 
								`<div>
									<h1 class="sliderT">最好的</h1>
									<p>很荣幸我们的框架是最完整的
										已获全球最创新企业信赖</p>
									<div class="bg-image sponsor"></div>
								</div>`,
					})
				.addSlide('slide3')
					.addComponent({
						type: 'JSX',
						className: 'intro',
						templete: 
								`<div>
									<h1 class="sliderT">兼容</h1>
									<p>
										兼容现代和旧版浏览器中 包括IE 9
										为所有人打造一个漂亮的网站 而非少数人
									</p>
									<div class="bg-image compatible"></div>
								</div>`,
					})
			.addSection('section3')
				.addComponent({
						type: 'JSX',
						className: 'intro',
						templete: 
								`<div>
									<h1 class="sliderT">简单</h1>
									<p>
										fullPage.js易于使用，可自定义
										包含数十个例子，出色的文档，可社区和个人
									</p>
								</div>`,
					})
				.addComponent({
					type: 'nest',
					select: 'img',
					className: 'htmlPhoto',
					attr: {
						src: './src/img/html.png'
					}
					
				})
			.addSection('section4')
				.addComponent({
						type: 'JSX',
						templete: 
								`<div class='bg_head'>
									<div class="intro">
										<h1 class="sliderT">来吧!</h1>
										<p>专为手机和平板电脑设计，完全响应</p>
										<p>不仅仅孩子喜欢抓东西</p>
									</div>
								</div>`,
					})
				.load();
/*
	创建页面内容参数。参数可选
	{
					type: 'base',//页面类型
					className: 'duyi',
					width: 522,
					height: 336,
					text: '渡一教育创立于2615年!在成哥邓哥彤哥的带领下已经向着高端编程教育公司大踏步的,渡一',
					center: true,//是否居中
					css: {//页面样式
						position:'absolute',
						opacity: 0,
						top: 0,
						backgroundImage: 'url(./src/img/123.png)',
						backgroundSize: '100% 100%',
						padding: '10px 15px 10px 15px',
						textAlign: 'justify',
						fontSize: '18px',
						fontWeight: '900',
						lineHeight: '25px'
						},
					animateIn: {//页面进入方式
						opacity : 1,
						top: 150,
					},
					animateOut: {//页面离开样式
						opacity: 0,
						top: 0,
					},
					delay: 250,//进入离开动画延迟
					event: {//页面事件
						click: function () {
							alert($(this).text());
						}
					}
				}
*/