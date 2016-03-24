/*var url=require('url');
console.log(url.resolve('/one/two/three','four'));
url.resolve('http://example.com/','one');
url.resolve('http://example.com/one','two');*/


var qs=require('querystring');
var equal=qs.stringify({foo:'bar',baz:['qux','quux'],corge:''});
var colon=qs.stringify({foo:'bar',baz:'qux'},';',':');

console.log(qs.parse(equal));			//输出{foo:'bar',baz:['qux','quux'],corge:''}
console.log(qs.parse(colon));			//输出{'foo:bar;baz:qux':''}
console.log(qs.parse(colon,';',':'));		//输出{foo:'bar',baz:'qux'}

console.log(equal);			//输出foo=bar&baz=qux&baz=quxx&corge=
var escapeEqual=qs.escape(equal);
console.log(escapeEqual);			//输出foo%3Dbar%26baz%3Dqux%26baz%3Dquux%26corge%3D
console.log(qs.unescape(escapeEqual));		//输出foo=bar&baz=qux&baz=quxx&corge=

console.log(qs.stringify({foo:'bar',baz:['qux','quux'],func:function(){console.log('dogs')}}));