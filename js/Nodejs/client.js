var router=require('./router');
var requestHandles=require('./requestHandles');

var handlers={};
handlers["/"]=requestHandles.startwork;
handlers["/startwork"]=requestHandles.startwork;
handlers["/upload"]=requestHandles.upload;
handlers["/textarea"]=requestHandles.textarea;
handlers["/show"]=requestHandles.show;	
handlers["/fileUpload"]=requestHandles.fileUpload;



var http=require('http');
var url=require('url');

function start(router,handles){
	
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;
		console.log('Request for '+pathname+' recieved.');
		console.log("You`re at IP address "+response.ip+" ,which is in "+response.city+" , "+response.region_name);
		router(handles,pathname,response,request);
	}
	http.createServer(onRequest).listen(1338,'127.0.0.1');
	console.log('Server running at http://127.0.0.1:1338/');
}

start(router.router,handlers);