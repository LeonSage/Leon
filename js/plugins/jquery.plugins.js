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
			//如果图片加载完成则直接设置
			if(tempImg.complete){
				callback(tempImg.width,tempImg.height);	
			}							
			tempImg.onload=function(){
				//这里给对象添加一个存储实际尺寸的属性
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
				//				
				$masking.bind('click',function(){
					$masking.hide();
					$img.hide();
				});
				$img.bind('mousedown',function(e){
					var mouseOffset=e.pageX-(+($(this).css('left').slice(0,-2)));
					var mouseTop=e.pageY-(+($(this).css('top').slice(0,-2)));
					$img.bind('mousemove',function(event){
						$(this).css('left',event.pageX-mouseOffset).css('top',event.pageY-mouseTop);
						return false;
					})					
				}).bind('mouseup',function(event){
					$img.unbind('mousemove');
				});
				$img.prependTo('body');
				$masking.prependTo('body');
				var oMaskImg=document.getElementById('maskImg');
				var oMasking=document.getElementById('masking');
				oMasking.onmousewheel=oMaskImg.onmousewheel=function(event){
					if(event.wheelDelta>0){
						var value=document.defaultView.getComputedStyle(oMaskImg,null).height.slice(0,-2);
						oMaskImg.style.height=(+value+100)+"px";						
					}else{
						var value=document.defaultView.getComputedStyle(oMaskImg,null).height.slice(0,-2);
						oMaskImg.style.height=(+value-100)+"px";
					}
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
					$masking.hide();
					$occurWindow.hide();
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