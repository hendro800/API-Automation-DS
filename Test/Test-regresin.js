const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs');


const assert = chai.assert
const should = chai.should
const expect = chai.expect

describe('API TEST for "Regres.in"', () => {
    
    const UrlBase = 'https://reqres.in/api/';

    //====Sample GET Regres.in====
    it('Test - GET User', async () => {
        const res = await request(UrlBase)
        .get('users?page=2');

        //kode untuk assert
        assert.equal(res.statusCode, 200)
        assert.equal(res.body.page, '2')
        assert.equal(res.body.data[0].first_name, 'Michael')

        const schemaPath = "resources/jsonSchema/GET-Users-Schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(res.body, jsonSchema)
    });

    // ====Sample POST Regres.in====
    it('Test - POST User', async () => {
        const CreateUser = {
            "name": "Hendro Elyeser Lumombo",
            "job": "Quality Assurance"
        }
        const res = await request(UrlBase)
        .post('users')
        .send(CreateUser);

        console.log(res.body)

        //kode assert POST
        const schemaPath = "resources/jsonSchema/POST-Users-Schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(res.body, jsonSchema)
    });

    // ====Sample DELETE Regres.in====
    it('Test - DELETE User', async () => {
        const res = await request(UrlBase)
        .delete('users/2')

        //kode assert DELETE
        assert.equal(res.statusCode, 204)
        
    });

    // ====Sample PUT Regres.in======
    it('Test - PUT User', async () => {
        const UpdateUser = {
            "name": "Bunga",
            "job": "Senior Quality Assurance"
        }
        const res = await request(UrlBase)
        .put('users/2')
        .send(UpdateUser);

        console.log(res.body)

        //kode assert PUT
        assert.equal(res.statusCode, 200)
        assert.equal(res.body.name, 'Bunga')
        assert.equal(res.body.job, 'Senior Quality Assurance')
        const schemaPath = "resources/jsonSchema/PUT-Users-Schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(res.body, jsonSchema)
    });
});


