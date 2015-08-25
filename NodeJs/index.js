var server=require('./server');
var requestHandles=require('./requestHandles')
	,fs=require('fs')
	,path=require('path')
	,url=require('url')
	,http=require('http');

var handlers={};
handlers["/"]=requestHandles.index;
handlers["/upload"]=requestHandles.upload;
handlers["/textarea"]=requestHandles.textarea;
handlers["/show"]=requestHandles.show;	
handlers["/fileUpload"]=requestHandles.fileUpload;

server.start(handlers);