const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => {
        done();
    })
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

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text1);
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
                    expect(todos.length).toBe(0);
                    done();
                })
                    .catch((e) => {
                        done(e);
                    })
            })
    });
});