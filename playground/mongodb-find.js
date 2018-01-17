const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server!!!');
    }

    console.log('Connected to MongoDb server.');

    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('All Todos:');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, (err) => {
    //     console.log('Unable to fetch todos.', err);
    // });
    //
    // db.collection('Todos').find({completed: true}).toArray().then((docs) => {
    //     console.log('Completed Todos:');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, (err) => {
    //     console.log('Unable to fetch todos.', err);
    // });

    // db.collection('Todos').find({
    //     _id: new ObjectID('5a5e50205684531d2ce39f8f')
    // }).toArray()
    //     .then((docs) => {
    //         console.log('Todos By ID:');
    //         console.log(JSON.stringify(docs, undefined, 4));
    //     }, (err) => {
    //         console.log('Unable to fetch todos.', err);
    //     });

    // db.collection('Users').find().count()
    //     .then((count) => {
    //         console.log(`Users Count: ${count}`);
    //     }, (err) => {
    //         console.log('Unable to fetch todos.', err);
    //     });

    db.collection('Users').find({name: 'Rob'}).toArray()
        .then((users) => {
            console.log(`Users:`);
            console.log(JSON.stringify(users, undefined, 4));
        }, (err) => {
            console.log('Unable to fetch users.', err);
        });
    //db.close();
});