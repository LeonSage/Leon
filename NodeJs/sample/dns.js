const dns=require('dns');
/*dns.resolve('www.yahoo.com','AAAA',function(e,r){
	if(e){
		console.log(e);
	}
	console.log(r);
})*/
/*dns.resolveMx('yahoo.com',function(e,r){
	if(e){
		console.log(e);
	}
	console.log(r);
})*/
/*dns.resolveTxt('yahoo.com',function(e,r){
	if(e){
		console.log(e);
	}
	console.log(r);
})*/
dns.resolve('yahoo.com','A',(e,a)=>{
	console.log(a);
	for(i in a){
		dns.reverse(a[i],function(e,host){
			console.log(host);
		});
	}
	
})
