var http=require('http');
var url=require('url');

function start(router){
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;
		console.log('Request for '+pathname+' recieved.');

		router(pathname);

		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write("hello world");
		response.end();
	}
	http.createServer(onRequest).listen(1337,'127.0.0.1');
	console.log('Server running at http://127.0.0.1:1337/');
}

exports.start=start;