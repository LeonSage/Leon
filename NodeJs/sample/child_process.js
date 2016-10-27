var cp=require('child_process');
var child=cp.spawn('cat',[],{customFds:[0,1,2]});