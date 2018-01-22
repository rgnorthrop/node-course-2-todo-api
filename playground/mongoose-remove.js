const lObjectId = require('mongodb').ObjectID;

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
//const User = require('./../server/models/user').User;     // This works - traditional method
const {User} = require('../server/models/xuser');          // This works - ES6 destructuring method

// Todo.remove({}).then((result)=>{
//    console.log(result);
// });

Todo.findOneAndRemove({_id: '5a60c05ef4617ba358696282'}).then((todo) => {
    console.log(todo);
});


// Todo.findByIdAndRemove('5a60bf2cf4617ba358696267').then((todo) => {
//     console.log(todo);
// });