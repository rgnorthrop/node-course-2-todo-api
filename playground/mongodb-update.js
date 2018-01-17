const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server!!!');
    }

    console.log('Connected to MongoDb server.');

    // db.collection('Todos').findOneAndUpdate(
    //     {_id: new ObjectID('5a5e54def4617ba358692639')},
    //     {
    //         $set:
    //             {
    //                 completed: true
    //             }
    //     }
    //     ,
    //     {
    //         returnOriginal: false
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     }, (err) => {
    //         console.log('Unable to fetch users.', err);
    //     });

    db.collection('Users').findOneAndUpdate(
        {_id: new ObjectID('5a5e52bc370df21d5651135a')},
        {
            $set:
                {
                    name: 'Rob*'
                },
            $inc:
                {
                    age: 13
                }
        },
        {
            returnOriginal: false
        })
        .then((result) => {
            console.log(result);
        }, (err) => {
            console.log('Unable to fetch users.', err);
        });

    //db.close();
});