//为了防止其他人不规则的编辑本插件,需要在开头处分号防止出现无法使用.
//此处将$作为匿名函数的形参.
;(function($){
	//扩展全局函数
	$.fn.extend({
		"color":function(value){
			if(value==undefined){
				//return本对象以便插件的链式操作.
				return this.css('color');				
			}else{
				return this.css("color",value);
			}
		},
		//这是我自己定义的插件,可以由外界来调用这个函数
		//这个函数可以用来查询图片的原始尺寸--用来完成图片放大镜的功能
		"imgReal": function(callback){
			//定义一个图片并将路径添加后加载
			var tempImg=new Image();
			tempImg.src=$(this).attr('src');
			//如果图片加载完成则使用回调函数传回对应的宽度和高度
			if(tempImg.complete){
				callback(tempImg.width,tempImg.height);	
			}
			//如果图片未加载则在加载时使用回调函数(回调函数是必须的,因为这里是异步加载,不能保证调用时获取到的正确值,所以要在执行后返回,使用回调).						
			tempImg.onload=function(){
				callback(tempImg.width,tempImg.height);
			}			
		},
		"striped":function(){
			$(this).find('thead').css('backgroundColor','lightblue');
			var $evenTr=$(this).find('tbody tr:even');
			$evenTr.css('backgroundColor',"lightgray");
		},

		//对页面中的内容添加蒙版方法,分别可以指定图片对象,含有文本的对象,或传入一段文本
		//其格式分别为$img.mask();$text.mask();$().mask(text);
		//其中第三个是由于本插件作为对象方法插件而不是全局方法,所以需要添加到一个对象上来发挥作用,这里的$()指的是document对象.
		"mask":function(text){
			//先完成页面周围蒙版的效果,其中设置透明度为0.8,位置为固定,层次为20.
			var $masking=$("<div id='masking' style='width: 100%;height: 100%;background-color: rgba(50,50,50,0.8);z-index: 20;position: fixed'></div>");
			//通过检测对象是否含有路径属性来检测是否为图片对象
			if($(this).attr('src')){
				//生成图片,设置路径,添加到页面中去.
				var $img=$("<img id='maskImg' style='height:60%;width:auto;z-index:20;position:fixed;top:10%;left:20%;cursor:pointer;' />");
				$img.attr('src',$(this).attr('src'));
				//当点击外侧蒙版时,移除元素(如果只是隐藏的话会带来内存的额外消耗,所以应当使用remove()方法).			
				$masking.bind('click',function(){
					$masking.remove();
					$img.remove();
				});

				//当在图片上按下鼠标左键时可以拖动图片移动
				$img.bind('mousedown',function(e){
					//使用slice方法获取不含有px的数字
					var mouseOffset=e.pageX-(+($(this).css('left').slice(0,-2)));
					var mouseTop=e.pageY-(+($(this).css('top').slice(0,-2)));
					//当鼠标按下且移动时拖动图片
					$img.bind('mousemove',function(event){
						$(this).css('left',event.pageX-mouseOffset).css('top',event.pageY-mouseTop);
						//并取消冒泡和默认事件
						return false;
					})					
				}).bind('mouseup',function(event){
					//当鼠标松开时,取消绑定的鼠标移动事件.
					$img.unbind('mousemove');
				});
				//将图片和蒙版添加到页面中去.
				$img.prependTo('body');
				$masking.prependTo('body');
				
				//鼠标滚轮控制图片大小的功能(jQuery使用鼠标滚动需要一个插件,太麻烦,直接用js自己写一个).
				//当鼠标在蒙版或图片上滚动时均可控制图片大小.
				var oMasking=document.getElementById('masking');
				var oMaskImg=document.getElementById('maskImg');
				oMasking.onmousewheel=oMaskImg.onmousewheel=function(event){
					//如果鼠标向上滚动(wheelDelta是120的倍数,如果为正,则向上,为负则向下滚动).
					if(event.wheelDelta>0){
						var value=document.defaultView.getComputedStyle(oMaskImg,null).height.slice(0,-2);
						oMaskImg.style.height=(+value+100)+"px";						
					}else{
						var value=document.defaultView.getComputedStyle(oMaskImg,null).height.slice(0,-2);
						oMaskImg.style.height=(+value-100)+"px";
					}
					//取消冒泡和默认行为(这里直接设置鼠标在蒙版上滚动时后面页面上的内容禁止滚动).
					return false;
				};

			}else{
				//当为文本对象时则设置格式,其中为了美观使用到了bootstrap中的panel
				var $occurWindow=$("<div class='panel panel-primary container' style='position: fixed;top: 20%;left: 20%;width:60%;right: auto;height: 40%;z-index:20;'></div>");
				var $panelHead=$("<div class='panel-heading'>感谢您的购买.</div>");
				var $panelBody=$("<div class='panel-body' style='padding: 20px;height: 70%;'></div>");
				var $panelFoot=$("<div class='panel-footer'></div>");
				var $closeBtn=$("<button class='btn btn-default'>关闭</button>");
				$closeBtn.appendTo($panelFoot);
				$closeBtn.bind('click',function(){
					$masking.remove();
					$occurWindow.remove();
				});
				//检测当为文本对象时,则设置其内容为蒙版内容,否则将字符串传递给蒙版文本.
				if(text){
					$panelBody.text(text);
				}else{
					$panelBody.text($(this).text());
				}				
				$panelHead.appendTo($occurWindow);
				$panelBody.appendTo($occurWindow);
				$panelFoot.appendTo($occurWindow);
				$occurWindow.appendTo('body');
				$masking.prependTo('body');	
			}					
		}

	});
	
	//扩展全局选择器
	$.extend(jQuery.expr[":"],{		

		//下面这三个markFunction(),createPositionalPseudo(),和gt:选择器是jQuery实现选择器的3个关键函数,但今天实践时发现自己写的没有createPositionalPseudo()的between选择器不能实现功能,
		//怀疑是不是缺少配套函数的原因,等以后有机会回来继续研习选择器插件.
		/**
		 * Mark a function for special use by Sizzle
		 * @param {Function} fn The function to mark
		 */
		/*function markFunction( fn ) {
			fn[ expando ] = true;
			return fn;
		}

		function createPositionalPseudo( fn ) {
			return markFunction(function( argument ) {
				argument = +argument;
				return markFunction(function( seed, matches ) {
					var j,
						matchIndexes = fn( [], seed.length, argument ),
						i = matchIndexes.length;

					// Match elements found at the specified indexes
					while ( i-- ) {
						if ( seed[ (j = matchIndexes[i]) ] ) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			alert(length);
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
		
		//在jQuery库中直接使用这个可以完成功能,但并不能称其为插件
		"between": createPositionalPseudo(function(matchIndexes,length,argument){			
			argument=argument.toString();
			var port=argument.split('00');
			for(;+port[0]++<=+port[1];){
				matchIndexes.push(+port[0]);
			}
			return matchIndexes;
		})*/


		//并不能实现功能,返回的length一直是0,不知道为什么,不是当前遍历到的索引值吗?
		/*"between": function(matchIndexes,length,argument){	
			var port=argument[3].split(',');
			return +port[0]<<length&&length<=+port[1];
		}*/
	});
//将(jQuery)作为实参传递给本匿名函数,引入本插件中形成闭包,可以在插件中使用$,也可以使用jQuery中的一些定义.
})(jQuery);