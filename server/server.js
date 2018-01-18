const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const lObjectId = require('mongodb').ObjectID;

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
            res.send({
                todos
            })
        },
        (err) => {
            res.status(400).send(err);
        });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    var msg = '';

    // var id = '5a5faca942ba4d86271d4e2c';

    if (!lObjectId.isValid(id)) {
        msg = 'Id not valid.';
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        else {
            return res.send({
                todo
            });
        }
    }).catch((e) => {
        res.status(400).send();
    })

    //res.send(msg);
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!lObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        return res.status(200).send(todo);
    }).catch((e) => {
        return res.status(400).send();
    })
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!lObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then((todo) => {
            if (!todo) {
                return res.status(400).send();
            }

            res.send({todo});
        })
        .catch((e) => {
            res.status(400).send();
        })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = {app};


// var newTodo = new Todo({
//     text: 'Text 2',
//     completed: false,
//     completedAt: 6000
// });
//
// newTodo.save().then((doc) => {
//     console.log('Saved document', JSON.stringify(doc, undefined, 4));
// }, (e) => {
//     console.log('Cannot save Todo', e);
// });


// var newUser = new User({
//     email: 'rgnorthrop@gmail.com'
// });
//
// newUser.save().then((doc) => {
//     console.log('Saved User', JSON.stringify(doc, undefined, 4));
// }, (e) => {
//     console.log('Cannot save User', e);
// });
