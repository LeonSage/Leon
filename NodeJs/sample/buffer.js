console.log(new Buffer('footbarbaz'));
console.log(new Buffer('footbarbaz','ascii'));
console.log(new Buffer('é'));
console.log(new Buffer('é','ascii'));


var buffer=new Buffer(5);
buffer.write('fffff')
console.log(buffer);
buffer.write('ab',1,'ascii');
console.log(buffer);