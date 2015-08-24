var http=require('http');
var url=require('url')
	,path=require('path');

function start(router,handles){
	
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;

		//url.parse将一个字符串转换为对象并返回
	
		/*url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
		urlStr:url字符串,parseQueryString:为true时将使用查询模块分析查询字符串，默认为false.
		slashesDenoteHost:默认为false，//foo/bar 形式的字符串将被解释成 { pathname: ‘//foo/bar' }
						如果设置成true，//foo/bar 形式的字符串将被解释成  { host: ‘foo', pathname: ‘/bar' }

		var url = require('url');
		var a = url.parse('http://example.com:8080/one?a=index&t=article&m=default');
		console.log(a);
		 
		//输出结果：
		{ 
		    protocol : 'http' ,
		    auth : null ,
		    host : 'example.com:8080' ,
		    port : '8080' ,
		    hostname : 'example.com' ,
		    hash : null ,
		    search : '?a=index&t=article&m=default',
		    query : 'a=index&t=article&m=default',
		    pathname : '/one',
		    path : '/one?a=index&t=article&m=default',
		    href : 'http://example.com:8080/one?a=index&t=article&m=default'
		}*/


		var filename=path.join(__dirname,'..',pathname);
		console.log("Request for "+filename);
		//console.log("You`re at IP address "+response.ip+" ,which is in "+response.city+" , "+response.region_name);
		router(handles,pathname,response,request);
	}
	http.createServer(onRequest).listen(1337,'127.0.0.1');
	console.log('Server running at http://127.0.0.1:1337/');
}

exports.start=start;