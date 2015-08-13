function startwork(){
	console.log("Request handler 'startwork' was called.");
}

function upload(){
	console.log("Request handler 'upload' was called.");
}

exports.startwork=startwork;
exports.upload=upload;