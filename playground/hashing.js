const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log(decoded);


// var msg = 'i am user 3';
// var hash = SHA256(msg).toString();
//
// console.log(`Msg: ${msg}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//     id: 4
// };
// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'my saltvalue').toString()
// };
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'my saltvalue').toString();
// if (resultHash === token.hash){
//     console.log('Data was not changed');
// }else{
//     console.log('Data was CHANGED.')
// }
