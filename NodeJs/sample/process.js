process.on('uncaughtException',function(e){
	console.log(e);
});
process.nextTick(function(){
	console.log('tick');
});
process.nextTick(function(){
	noExistFunc();
	console.log('tock');
});
process.nextTick(function(){
	console.log('tick tock');
});
console.log('End of last loop');