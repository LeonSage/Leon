var http=require('http');
var url=require('url')
	,path=require('path')
	,fs=require('fs')
	,util=require('util');

function start(handles){	
	http.createServer(function (request,response){
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

		if(typeof(handles[pathname])==="function"){
			return handles[pathname](response,request);
		}
		var filename=path.join(__dirname,'..',pathname);
		fs.exists(filename,function(exists){
			if(!exists){
				console.error("Request for "+filename+" : 404 Not Found.");
				/*response.setHeader('Content-Type','text/plain;charset=utf-8');*/
				response.writeHead(404,{"Content-Type":"text/plain"});
				response.write("404 Not Found");
				response.end();
				return;
			}else{
				fs.readFile(filename,'binary',function(err,file){
					if(err){
						console.error("Request for "+filename+" : 500 "+err);
						response.writeHead(500,{"Content-Type":"text/plain"});
						response.write(err);
						response.end();
						return;
					}
					var contentType="none";
					var ext=path.extname(filename);
					switch(ext){
						case ".html": contentType="text/html";break;
						case ".js": contentType="text/javascript";break;
						case ".css": contentType="text/css";break;
					}
					//response.setHeader('Content-Type','text/html;charset=utf-8');
					response.writeHead(200,{"Content-Type":contentType,"Access-Control-Allow-Origin":"http://localhost:1338"});
					response.write(file,"binary");
					response.end();
					console.log("Request for "+filename+" : 200 OK.");
				})
			}			
		});
	}).listen(1337,'127.0.0.1');
	console.log('Server running at http://127.0.0.1:1337/');
}

function client(handles){	
	http.createServer(function (request,response){
		var pathname=url.parse(request.url).pathname;
		if(typeof(handles[pathname])==="function"){
			return handles[pathname](response,request);
		}
		var filename=path.join(__dirname,'..',pathname);
		fs.exists(filename,function(exists){
			if(!exists){
				console.error("Request for "+filename+" : 404 Not Found.");
				/*response.setHeader('Content-Type','text/plain;charset=utf-8');*/
				response.writeHead(404,{"Content-Type":"text/plain"});
				response.write("404 Not Found");
				response.end();
				return;
			}else{
				//输出文件的状态信息
				/*fs.stat(filename,function(err,stats){
					if(err) throw err;
					console.log(stats);
				})*/
				fs.readFile(filename,'binary',function(err,file){
					if(err){
						console.error("Request for "+filename+" : 500 "+err);
						response.writeHead(500,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"http://localhost:1338/"});
						response.write(err);
						response.end();
						return;
					}
					var contentType="none";
					var ext=path.extname(filename);
					switch(ext){
						case ".html": contentType="text/html";break;
						case ".js": contentType="text/javascript";break;
						case ".css": contentType="text/css";break;
						case ".txt": contentType="text";break;
					}
					//response.setHeader('Content-Type','text/html;charset=utf-8');
					response.writeHead(200,{"Content-Type":contentType});
					response.write(file,"binary");
					response.end();
					console.log("Request for "+filename+" : 200 OK.");
				})
			}			
		});
	}).listen(1338,'127.0.0.1');
	console.log('Server running at http://127.0.0.1:1338/');
}

exports.start=start;
exports.client=client;