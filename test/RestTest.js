const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const path = require('path');
const User = require('../models/User');

chai.use(chaiHttp);

const app = require('../app.js');
const mongoose  =require('mongoose');


describe('REST test', function() {

    var token = "";
    before(function (done) {

        mongoose.connect(process.env.DB_TEST_STRING, function () {

            mongoose.connection.db.dropDatabase();


            User.create({
                "_id": "5aa0377f4f6a8dbf3e2e38ac",
                "name": "Gabriel",
                "surname": "Macus",
                "password": "demodemo",
                "email": "gabrielmacus2@gmail.com",
                "username": "gabrielmacus2",
                "role": "User",
                "status": "active",
                "__v": 0
            }, function (err, user) {

                console.log(user);

                chai.request(app)
                    .post('/auth/token?test=true')
                    .send({
                        password: "demodemo",
                        username: "gabrielmacus2"
                    })
                    .end(function (error, response) {
                        // Now let's check our response

                        expect(response.body).to.have.property('access_token');
                        expect(response).to.have.status(200);
                        token = response.body.access_token;
                        done();

                    });


            });


        });

    })


    var idToUpdate = "";

    it("Creates a person", function (done) {

        var person = {
            name: "Juan",
            surname: "De Los Palotes"
        };
        chai.request(app)
            .post('/api/person?test=true')
            .set('Authorization', 'JWT ' + token)
            .send(person)
            .end(function (error, response) {

                // Now let's check our response
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('_id');
                idToUpdate = response.body._id;
                done();

            });

    });

    it("Creates another person", function (done) {

        var person = {
            name: "Roberto",
            surname: "Diaz"
        };
        chai.request(app)
            .post('/api/person?test=true')
            .set('Authorization', 'JWT ' + token)
            .send(person)
            .end(function (error, response) {

                // Now let's check our response
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('_id');
                done();

            });

    });

    it("Reads a person",function (done) {

        chai.request(app)
            .get('/api/person/' + idToUpdate + '?test=true')
            .set('Authorization', 'JWT ' + token)
            .end(function (error, response) {

                expect(response.body).to.have.property('name','Juan');
                expect(response.body).to.have.property('surname','De Los Palotes');
                // Now let's check our response
                expect(response).to.have.status(200);
                done();

            });
    });

    it("Reads many persons",function (done) {

        chai.request(app)
            .get('/api/person/?test=true')
            .set('Authorization', 'JWT ' + token)
            .end(function (error, response) {

                expect(response.body).to.have.property('docs');

                expect(response.body.docs).to.have.lengthOf(2);

                // Now let's check our response
                expect(response).to.have.status(200);
                done();

            });
    });

    it("Updates a person", function (done) {

        var person = {
            name: "John"
        };
        chai.request(app)
            .put('/api/person/' + idToUpdate + '?test=true')
            .set('Authorization', 'JWT ' + token)
            .send(person)
            .end(function (error, response) {


                // Now let's check our response
                expect(response).to.have.status(200);
                done();

            });

    })

    it("Deletes a person", function (done) {


        chai.request(app)
            .delete('/api/person/'+idToUpdate+'?test=true')
            .set('Authorization', 'JWT ' + token)
            .end(function (error, response) {


                // Now let's check our response
                expect(response).to.have.status(200);
                done();

            });

    });


    it("GET  person assignments", function (done) {


        chai.request(app)
            .get('/api/person/45cbc4a0e4123f6920000002/assignments?test=true')
            .set('Authorization', 'JWT ' + token)
            .end(function (error, response) {


                // Now let's check our response
                expect(response).to.have.status(200);
                done();

            });

    });

    it("POST  person demo", function (done) {


        chai.request(app)
            .post('/api/person/demo?test=true')
            .set('Authorization', 'JWT ' + token)
            .end(function (error, response) {


                // Now let's check our response
                expect(response).to.have.status(200);
                done();

            });

    });

    it("tries to GET  person demo", function (done) {


        chai.request(app)
            .get('/api/person/demo?test=true')
            .set('Authorization', 'JWT ' + token)
            .end(function (error, response) {


                // Now let's check our response
                expect(response).to.have.status(403);
                done();

            });

    });












});