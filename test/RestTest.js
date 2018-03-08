const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const path = require('path');
const User = require('../models/User');

chai.use(chaiHttp);

const app = require('../app.js');
const mongoose  =require('mongoose');


describe('REST test', function(){

    var token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjE1NTQ2ODgsImRhdGEiOnsiX2lkIjoiNWFhMDM3N2Y0ZjZhOGRiZjNlMmUzOGFjIn0sImlhdCI6MTUyMDUxNzg4OH0.ypJbudkZg3QLbK_u4AdqOncL9h-vsHIQWsErvsb7J3w";
    before(function (done) {

        mongoose.connect(process.env.DB_TEST_STRING,function () {

            mongoose.connection.db.dropDatabase();


            User.create({
                "_id" :"5aa0377f4f6a8dbf3e2e38ac",
                "name" : "Gabriel",
                "surname" : "Macus",
                "password" : "$2a$10$OifALVmTyPP2YBBUrZzlZ.l2uQcydcEx81/MLh3m67QHwrSPCiRLi",
                "email" : "gabrielmacus2@gmail.com",
                "username" : "gabrielmacus2",
                "role" : "User",
                "status" : "active",
                "__v" : 0
            },function (err,user) {


                done();

            });



        });

    })

    var idToUpdate="";

    it("Creates a person",function (done) {

        var person = {
            name:"Juan",
            surname:"De Los Palotes"
        };
        chai.request(app)
            .post('/api/person?test=true')
            .set('Authorization', 'JWT '+token)
            .send(person)
            .end(function(error, response) {

                // Now let's check our response
                expect(response).to.have.status(200);
                expect(response.body).to.have.property('_id');

                idToUpdate = response.body._id;
                done();

            });

    });


    it("Updates a person",function (done) {

        var person = {
            name:"John"
        };
        chai.request(app)
            .put('/api/person/'+idToUpdate+'?test=true')
            .set('Authorization', 'JWT '+token)
            .send(person)
            .end(function(error, response) {

                // Now let's check our response
                expect(response).to.have.status(200);
                console.log(response);
                done();

            });

    });



});