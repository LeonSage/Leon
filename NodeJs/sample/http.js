var http=require('http');
var opts={
	host:'www.baidu.com',
	port:80,
	path:'/submit',
	method:'POST'
};
var req=http.request(opts,function(res){
	res.setEncoding('utf8');
	res.on('data',function(chunk){
		console.log('Body : '+chunk);
	})
});
req.write('my data');
req.write('more of my data');
req.end();