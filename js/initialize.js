//初始化HTML5元素,使得IE8以下页面可以正常显示
var HtmlTagname=["header","footer",'article','nav'],count;
for(count=0;count<HtmlTagname.length;count++){
	document.createElement(HtmlTagname[count]);
}