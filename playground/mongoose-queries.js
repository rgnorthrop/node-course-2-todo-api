const lObjectId = require('mongodb').ObjectID;

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
//const User = require('./../server/models/user').User;     // This works - traditional method
const {User} = require('./../server/models/user');          // This works - ES6 destructuring method

var id = '5a5faca942ba4d86271d4e2c';
var userId = '5a5f6f6bace667ec210e1eb1';

if (!lObjectId.isValid(id)){
    console.log('Id not valid.');
}


// Todo.find({
//     _id: id
// }).then((todos) => {
//     return console.log('Todos: ', todos);
// }, (err)=>{
//     console.log(err);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo: ', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('TodoById: ', todo);
// }).catch((e)=>{
//     console.log(e);
// });

User.findById(userId).then((user) => {
    if(!user){
        return console.log('Id not found');
    }
    console.log('UserById: ', user);
}).catch((e)=>{
    console.log('Error calling User.findById:\n',e);
});

