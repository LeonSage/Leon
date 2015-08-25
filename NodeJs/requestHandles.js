var querystring=require("querystring");
var fs=require("fs");
var formidable=require('formidable');


function index(response){
	function sleep(ms){
		var startTime=new Date().getTime();
		while(new Date().getTime()<startTime+ms);
	}
	fs.readFile('../index.html','utf-8',function(err,data){
		if(err){
			throw err;
		}
		response.setHeader('Content-Type','text/html;charset=utf-8');
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write(data);
		response.end();
	})	
	//sleep(10000);

	/*exec("ls -lah",function(error,stdout,stderr){
		response.writeHead(200,{"Content-Type":"text/plain"});
		response.write(stdout);
		console.log("stdout:"+stdout);
		response.end();
	});*/
}

function jQuery(response){
	fs.readFile('../jQuery/jquery-1.11.3.min.js','utf-8',function(err,data){
		if(err) throw err;
		response.setHeader('Content-Type','text/html;charset=utf-8');
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write(data);
		response.end();
	})
}

function textarea(response,postData){
	console.log("Request hanlder 'textarea' was called.");
	var body="<html>"+
		"<head>"+
			"<meta http-equiv='Content-Type' content='text/html' charset='UTF-8' />"+
		"</head>"+
		"<body>"+
			"<form action='/upload' method='post'>"+
				"<textarea name='text' rows='20' cols='60'></textarea>"+
				"<input type='submit' value='Submit' />"+
			"</form>"+
		"</body>"+
		"</html>";
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write("Other Domain");
	response.end();
}

function fileUpload(response){
	console.log("Request hanlder 'fileUpload' was called.");
	var body="<html>"+
		"<head>"+
			"<meta http-equiv='Content-Type' content='text/html' charset='UTF-8' />"+
		"</head>"+
		"<body>"+
			"<form action='/upload' method='post' enctype='multipart/form-data'>"+
				"<input type='file' name='upload' multiple='multiple' />"+
				"<input type='submit' value='Upload' />"+
			"</form>"+
		"</body>"+
		"</html>";
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();
}

function upload(response,request){
	console.log("Request handler 'upload' was called.");
	var form=new formidable.IncomingForm();
	console.log("about to parse.");
	form.parse(request,function(err,fields,files){
		console.log("parse done.");
		console.log("files.upload.path: "+files.upload.path);
		fs.renameSync(files.upload.path,"test.png");
		response.writeHead(200,{"Content-Type":"text/html"});
		response.write("Recieved image: \n\n");
		response.write("<img src='/show' />")
		response.end();
	});
}

function show(response){
	console.log("Request handler 'show' was called.");
	fs.readFile("tmp/test.png","binary",function(error,file){
		if(error){
			response.writeHead(500,{"Content-Type":"image/png"});
			response.write(error+"\n");
			response.end();
		}else{
			response.writeHead(200,{"Content-Type":"image/png"});
			response.write(file,"binary");
			response.end();
		}
	});
}

exports.index=index;
exports.upload=upload;
exports.textarea=textarea;
exports.show=show;
exports.fileUpload=fileUpload;