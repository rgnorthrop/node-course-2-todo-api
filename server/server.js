var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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


app.listen(3000, () => {
    console.log('Server started on port 3000');
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
