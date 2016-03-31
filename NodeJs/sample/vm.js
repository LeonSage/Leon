var vm=require('vm');
const util=require('util');
const fs=require('fs');

var code=fs.readFileSync('vmCode.js');
console.log(code.toString());

const sandbox={
	animals:'cat',
	age:3
}
var script=new vm.Script(code);
script.runInNewContext(sandbox);

console.log(util.inspect(sandbox));