const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'Test 1001'
}, {
    _id: new ObjectID(),
    text: 'Test 2002'
}, {
    _id: new ObjectID(),
    text: 'Test 3003'//,
    // completed: true,
    // completedAt: 333444
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done())
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text1 = 'some text value';

        request(app)
            .post('/todos')
            .send({
                text: text1
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text1);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text1}).then((todos) => {
                    //expect(todos.length).toBe(1);
                    //expect(todos[0].text).toBe(text1);
                    done();
                })
                    .catch((e) => {
                        done(e);
                    })
            })
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
                    done();
                })
                    .catch((e) => {
                        done(e);
                    })
            })
    });
});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(3);
            })
            .end(done);
    })
});


describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if todo not found.', (done) => {
        var hexID = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 for non-object ids.', (done) => {
        request(app)
            .get(`/todos/112233`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a to do', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                //expect(res.body.todo._id).toBe(hexId);
                console.log(res);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // return done();

                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist();
                    return done();
                })
                    .catch((e) => {
                        done(e);
                    });
                //             //done();
            });
    });
    it('should return 404 if todo not found', (done) => {
        var hexID = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete(`/todos/112233`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo',(done)=>{
        var hexId = todos[0]._id.toHexString();
        var newText = 'New Text 1001xxx';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text: newText,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(newText);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });


    it('should clear completedAt when todo is not completed',(done)=>{
        var hexId = todos[2]._id.toHexString();
        var newText = 'New Text 2002xxx';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                text: newText,
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(newText);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });
});
