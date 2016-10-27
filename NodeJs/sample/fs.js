var fs = require('fs'),
    path = require('path'),
    out = process.stdout;

var filePath = 'F://rar2.rar';
var readStream = fs.createReadStream(filePath);
var writeStream = fs.createWriteStream('./TED2.rar');

var stat = fs.statSync(filePath);

var totalSize = stat.size;
var passedLength = 0;
var lastSize = 0;
var startTime = Date.now();

readStream.on('data', function(chunk) {
    passedLength += chunk.length;
    if (writeStream.write(chunk) === false) {
        readStream.pause();
    }
});
readStream.on('end', function() {
    writeStream.end();
});
writeStream.on('drain', function() {
    readStream.resume();
});
setTimeout(function show() {
    var percent = Math.ceil((passedLength / totalSize) * 100);
    var size = Math.ceil(passedLength / (1024*1024));
    var diff = size - lastSize;
    lastSize = size;
    out.clearLine();
    out.cursorTo(0);
    out.write('已完成' + size + 'MB, ' + percent + '%, 速度：' + diff * 2 + 'MB/s');
    if (passedLength < totalSize) {
        setTimeout(show, 500);
    } else {
        var endTime = Date.now();
        console.log();
        console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
    }
}, 500);




/*var fs=require('fs');
//pipe自动调用了data，end等事件
//fs.createReadStream('../../data.txt').pipe(fs.createWriteStream('./fs.txt'));
var readStream=fs.createReadStream('../../data.txt');
var writeStream=fs.createWriteStream('./fs.txt');
//数据流会自动的读入读出，不用添加额外的操作
readStream.on('data',function(chunk){	
	//如果没有写入完，暂停读取流
	if(writeStream.write(chunk)===false){
		readStream.pause();
		console.log('pause');
	}
})
//当缓冲区被输出完后，继续读取
writeStream.on('drain',function(){
	readStream.resume();
})
//当没有数据时，关闭数据流
readStream.on('end',function(){
	writeStream.end();
})	*/