import * as express from "express";
import * as supertest from 'supertest';
import {DataSource} from "typeorm";

import App from "../src/app";
import AddressController from "../src/controller/AddressController";
import {AddressDAO} from "../src/repository/dao/AddressDAO";
import UserController from "../src/controller/UserController";
import UserDAO from "../src/repository/dao/UserDAO";
import {createConnection} from "../src/repository/Datasource";

const connection = createConnection();

let dataSource: DataSource;
let app: express.Application;
let request;
let token;

describe('app', () => {

    const user = {
        name: "name",
        surname: "surname",
        login: "login",
        password: "password"
    };

    beforeAll((done) => {
        connection.initialize().then(instance => {
            dataSource = instance;
            app = new App([
                    new AddressController(new AddressDAO(dataSource)),
                    new UserController(new UserDAO(dataSource))
                ],
                3000
            ).app;
            request = supertest(app);
            done();
        })
    });


    it('Create user', (done) => {
        request.post('/user').send(user).then(response => {
            expect(response.status).toEqual(200);
            done();
        });
    });

    it('Login', (done) => {
        request.post('/user/login').send({login: user.login, password: user.password}).then(response => {
            expect(response.status).toEqual(200);
            token = response.body.token;
            done();
        });
    })


    it('Create Address', (done) => {
        const address = {
            address: 'address',
            street: 'street',
            city: 'city',
            state: 'state',
            country: 'country'
        };
        request.post('/address').set({Authorization: token}).send(address).then(response => {
            expect(response.status).toEqual(200);
            done();
        });
    })


    it('Get User', (done) => {
        request.get('/user').set({Authorization: token}).then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({name: user.name}),
                    expect.objectContaining({surname: user.surname})
                ])
            )
            const userTmp = response.body.find(userTmp => userTmp.login === user.login)
            expect(userTmp.addresses).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({street: 'street'})
                ])
            )
            done();
        })

    })

});




