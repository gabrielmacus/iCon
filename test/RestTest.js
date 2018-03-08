const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const path = require('path');


chai.use(chaiHttp);

const app = require('../app.js');


describe('REST test', function(){



    it('Tries to GET user endpoint without logging in',function(done) {
        chai.request(app)
            .get('/api/user?test=true')
            .end(function(error, response) {

                /*if (error) done(error);*/
                // Now let's check our response
                expect(response).to.have.status(401);
                done();

            });
    });

    it('Tries to POST user endpoint without logging in',function(done) {
        chai.request(app)
            .post('/api/user?test=true')
            .send({
                name:"Gabriel",
                surname:"Macus",
                password:"demodemo",
                email:"gabrielmacus@gmail.com"
            })
            .end(function(error, response) {

                /*if (error) done(error);*/
                // Now let's check our response
                expect(response).to.have.status(401);
                done();

            });
    });
    it('Register an user',function(done) {
        chai.request(app)
            .post('/api/user/register?test=true')
            .send({
                name:"Gabriel",
                surname:"Macus",
                password:"demodemo",
                email:"gabrielmacus@gmail.com",
                username:"gabrielmacus"
            })
            .end(function(error, response) {

                expect(response.body).to.have.property('status','pending-verification');
              //  expect(response.body.status).to.equal('pending-verification');
                // Now let's check our response
                expect(response).to.have.status(200);
                done();

            });
    });

    it('Logs in with email to a non validated user',function(done) {
            chai.request(app)
                .post('/api/user/token?test=true')
                .send({
                    password:"demodemo",
                    username:"gabrielmacus@gmail.com"
                })
                .end(function(error, response) {
                    // Now let's check our response

                    //expect(response.body).to.have.property('access_token');
                    expect(response).to.have.status(403);
                    done();

                });
        });

    it('Logs in with email to a validated user',function(done) {
        chai.request(app)
            .post('/api/user/token?test=true')
            .send({
                password:"demodemo",
                username:"gabrielmacus2@gmail.com"
            })
            .end(function(error, response) {

                // Now let's check our response

                expect(response.body).to.have.property('access_token');
                expect(response).to.have.status(200);
                done();

            });
    });

    var token ="";
    it('Logs in with username to a validated user',function(done) {
        chai.request(app)
            .post('/api/user/token?test=true')
            .send({
                password:"demodemo",
                username:"gabrielmacus2"
            })
            .end(function(error, response) {
                // Now let's check our response

                expect(response.body).to.have.property('access_token');
                expect(response).to.have.status(200);
                token = response.body.access_token;

                done();

            });
    });

    it("Creates a person",function (done) {

        var person = {
            name:"Juan",
            surname:"De Los Palotes"
        };
        console.log(token);
        chai.request(app)
            .post('/api/person?test=true')
            .set('Authorization', 'JWT '+token)
            .send(person)
            .end(function(error, response) {

                // Now let's check our response
                expect(response.body).to.have.property('_id');
                expect(response).to.have.status(200);

                done();

            });


    });




});