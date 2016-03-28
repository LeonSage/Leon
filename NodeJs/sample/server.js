//这个服务器是作为PC端和手机端通过服务器来进行通讯的实现，现在的功能可以完成远程传输信息和打开网页

var http=require('http')
	,path=require('path')
	,url=require('url')
	,net=require('net')
	,sio=require('socket.io')
	,npm=require('getmac');
var fs=require('fs');

var server=http.createServer(function(req,res){

	if(req.url=='/get'){
		/*var chatServer=net.createServer()
			,clientList=[];
		console.log('emit');
		chatServer.on('connection',function(client){
			clientList.push(client);
			console.log(req.connection.remoteAddress+" is in.");
			client.on('data',function(data){
				for(var count=0;count<clientList.length;count++){
					clientList[count].write("slideUp");
				}
			})
		});
		chatServer.listen(9000);*/
		console.log(req.connection.remoteAddress+" request get.");
		var options={
			host:'192.168.1.102',
			port:8080,
			path:'/.index.html'
		}
		var req=http.get(options,function(data){
			//console.log(data);
		})
		res.writeHead(200,{"content-type":"text/plain"});
		res.write('slideUp');
		res.end();
	}else{
		normalResponse(req,res);
	}
		
}).listen(8080);
var io=sio.listen(server);
io.sockets.on('connection',function(socket){

	console.log('a user is connected.');

	socket.on('message',function(msg){
		console.log("recived: "+msg);
		npm.getMac(function(err,macAddress){
			if(err){
				console.log(err)
			}else{
				console.log(macAddress);
			}
		})
		socket.broadcast.emit('message',msg);
	})
})
console.log('Server is running at 127.0.0.1:8080');


var normalResponse=function(req,res){
	var pathname='';
	if(req.url=='/'){
		pathname="../../index.html";
	}else{
		pathname="../.."+req.url;
	}
	fs.exists(pathname,function(exists){
		if(!exists){
			res.writeHead(404,{"content-type":"text/plain"});
			res.write("404 NOT Found");
			console	.log("Request for "+pathname+" is not found,404");
			res.end();
		}else{
			fs.readFile(pathname,function(err,data){
				if(err){
					console.log(err);
				}else{
					var contentType="";
					var ext=path.extname(pathname);
					switch(ext){
						case ".html" :contentType="text/html";break;
						case ".css" :contentType="text/css";break;
						case ".js" :contentType="text/javascript";break;
						case ".png" :contentType="images";break;
					}
					res.writeHead(200,{"content-type":contentType});
					res.write(data,"binary");
					res.end();
					console.log("Request for "+pathname+" is ok,200");
				}			
			})
		}
	})
}