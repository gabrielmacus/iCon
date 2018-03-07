
var chaiHttp = require('chai-http');
var chai = require('chai');
var should = chai.should;
var RoleService = require('../services/RoleService');
var path = require('path');
var server  = require('../app');
var testConnectionString ="mongodb://localhost:27017/test_db";

chai.use(chaiHttp);
describe('REST', function() {

    describe("User",function () {

        it('Should POST an user', function (done) {


            done();
            /*chai.request(server)
                .post('/api/user')
                .end(function (err, res) {

                    if(err)
                    {
                        console.error(err);
                    }
                    //res.should.have.status(200);
                    //res.body.should.be.a('array');
                    done();
                });*/

        });
        it('Should GET all the users', function (done) {

            /*
            chai.request(server)
                .get('/api/user')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });*/
            done();

        });
    });




});