function router(handles,pathname,response,request){
	console.log("About to router a request for "+pathname+".");
	if(typeof handles[pathname]==="function"){
		return handles[pathname](response,request);
	}else{
		console.log("No request handle found for"+pathname);
		response.writeHead(404,{"Content-Type":"text/html"});
		response.write("404 Not Found.");
		response.end();
	}
}

exports.router=router;