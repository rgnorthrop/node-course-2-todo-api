const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server!!!');
    }

    console.log('Connected to MongoDb server.');

    // db.collection('Todos').deleteMany({text: 'To do 100'})
    //     .then((result) => {
    //         console.log(result);
    //     });

    // db.collection('Todos').deleteOne({text: 'TODO 100'})
    //     .then((result) => {
    //         console.log(result);
    //     });

    // db.collection('Todos').findOneAndDelete({completed: false})
    //     .then((result) => {
    //         console.log(result);
    //     });

    db.collection('Users').findOneAndDelete({_id: new ObjectID("5a5f61aff4617ba3586930cd")})
        .then((result) => {
            console.log(JSON.stringify(result, undefined, 4));
        });

    //db.close();
});