const crypto=require('crypto');
const fs=require('fs');

var privatePem=fs.readFileSync('key.pem');
var publicPem=fs.readFileSync('key.pem');
var key=privatePem.toString();
var pubkey=publicPem.toString();
var data="some data to sign";

const sign=crypto.createSign('RSA-SHA256');
sign.update(data);
var sig=sign.sign(key,'hex');

const verify=crypto.createVerify('RSA-SHA256');
verify.update(data);

console.log(verify.verify(pubkey,sig,'hex'));
//输出
