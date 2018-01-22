// START MONGDB AFTER A REBOOT WITH THE FOLLOWING LINE IN THE TERMAINAL APP !!!!!!!
// DO NOT EXECUTE THE FOLLOWING LINE IN THE TERMINAL PANE OF WEBSTORM !!!!!!!
// mongod --dbpath /Users/rob/mongo-data

require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

// app.get('/users/me', authenticate, (req, res) => {
//     res.send(req.user);
// });

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// Below code works
// app.get('/users/me', (req, res) => {
//     var token = req.header('x-auth');
//     console.log('HERE1000');
//     User.findByToken(token).then((user) => {
//         if (!user) {
//             console.log('User NOT found.');
//             return Promise.reject();
//         }
//         console.log('User: ', user);
//
//         //req.user = user;
//         // req.token = token;
//         // next();
//         res.send(user);
//     }).catch((e) => {
//         res.status(401).send(e);
//     })
//
//     //res.send(req.user);
// });

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {app};


// {
//     "name": "todo-api",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.js",
//     "scripts": {
//     "start": "node server/server.js",
//         "test": "export NODE_ENV=test && mocha **/*.test.js",
//         "test-watch": "nodemon --exec 'npm test'"
// },
//     "engines": {
//     "node": "9.4.0"
// },
//     "author": "",
//     "license": "ISC",
//     "dependencies": {
//     "body-parser": "^1.15.2",
//         "crypto-js": "^3.1.6",
//         "express": "^4.14.0",
//         "jsonwebtoken": "^7.1.9",
//         "lodash": "^4.15.0",
//         "mongodb": "^2.2.34",
//         "mongoose": "^4.5.9",
//         "validator": "^9.2.0"
// },
//     "devDependencies": {
//     "expect": "^1.20.2",
//         "mocha": "^3.0.2",
//         "nodemon": "^1.10.2",
//         "supertest": "^2.0.0",
//         "tap": "^11.0.1"
// }
// }
