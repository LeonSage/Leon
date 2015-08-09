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
		"striped":function(){
			$(this).find('thead').css('backgroundColor','lightblue');
			var $evenTr=$(this).find('tbody tr:even');
			$evenTr.css('backgroundColor',"lightgray");
		},
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