// Object destructuring example
// var user = {name: 'Name1', age:34};
// var {name} = user;
// console.log(name);

//const MongoClient = require('mongodb').MongoClient;       // Normal declaration
const {MongoClient, ObjectID} = require('mongodb');         // Destructuring declaration

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server!!!');
    }

    console.log('Connected to MongoDb server.');

    // db.collection('Todos').insertOne({
    //     text: 'test data',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert to do.', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 4));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Rob Northrop',
    //     age: 35,
    //     location: 'Hawthorne NY'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user.', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 4));
    // });

    db.close();
});