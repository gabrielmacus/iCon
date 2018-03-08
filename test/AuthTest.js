const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const path = require('path');
const User = require('../models/User');

chai.use(chaiHttp);

const app = require('../app.js');
const mongoose  =require('mongoose');


describe('Auth test', function(){

    before(function (done) {

        mongoose.connect(process.env.DB_TEST_STRING,function () {

            mongoose.connection.db.dropDatabase();
            done();
        });

    })

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
            .post('/auth/register?test=true')
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

    it('Register an user (2)',function(done) {
        chai.request(app)
            .post('/auth/register?test=true')
            .send({
                name:"Gabriel",
                surname:"Macus",
                password:"demodemo",
                email:"gabrielmacus2@gmail.com",
                username:"gabrielmacus2"
            })
            .end(function(error, response) {

                expect(response.body).to.have.property('status','pending-verification');
                //  expect(response.body.status).to.equal('pending-verification');
                // Now let's check our response
                expect(response).to.have.status(200);

                mongoose.connect(process.env.DB_TEST_STRING);

                User.update({_id:response.body._id},{'$set':{status:'active'}},function (err,result) {

                    expect(result).to.have.property('nModified',1);

                    expect(err).to.be.null;

                    done();

                });


            });
    });

    it('Logs in with email to a non validated user',function(done) {
        chai.request(app)
            .post('/auth/token?test=true')
            .send({
                password:"demodemo",
                username:"gabrielmacus@gmail.com"
            })
            .end(function(error, response) {
                // Now let's check our response

                //expect(response.body).to.have.property('access_token');
                expect(response).to.have.status(401);
                done();

            });
    });

    it('Logs in with email to a validated user',function(done) {
        chai.request(app)
            .post('/auth/token?test=true')
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

    it('Logs in with username to a validated user',function(done) {
        chai.request(app)
            .post('/auth/token?test=true')
            .send({
                password:"demodemo",
                username:"gabrielmacus2"
            })
            .end(function(error, response) {

                // Now let's check our response

                expect(response.body).to.have.property('access_token');
                expect(response).to.have.status(200);
                done();

            });
    });

    it('Logs in with wrong password to a validated user',function(done) {
        chai.request(app)
            .post('/auth/token?test=true')
            .send({
                password:"demodemo2",
                username:"gabrielmacus2"
            })
            .end(function(error, response) {

                // Now let's check our response

                expect(response).to.have.status(400);
                done();

            });
    });

    var token ="";
    it('Logs in with username to a validated user',function(done) {
        chai.request(app)
            .post('/auth/token?test=true')
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






});