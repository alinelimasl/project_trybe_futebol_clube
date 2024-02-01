import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { userWithoutPassword, users } from './mocks/Users.mock';
import { App } from '../app';

chai.use(chaiHttp);

const { expect } = chai;
const { app } = new App();

describe('Users teste', () => {
it('Deve retornar todos os usuários', async function() {
sinon.stub(SequelizeUsers, 'findAll').resolves(users as any);

const { status, body } = await chai.request(app).get('/login');

expect(status).to.be.equal(200);
expect(body).to.be.deep.equal(users);

});
it('Deve retornar um usuário por id', async function() {
sinon.stub(SequelizeUsers, 'findOne').resolves(userWithoutPassword as any);

const { status, body } = await chai.request(app).get('/login/3');

expect(status).to.be.equal(200);
expect(body).to.be.deep.equal(userWithoutPassword);
});

it('Deve retornar mensagem de erro quando usuário não for encontrado', async function() {
sinon.stub(SequelizeUsers, 'findByPk').resolves(null);
const { status, body } = await chai.request(app).get('/login/1');

expect(status).to.equal(404);
expect(body.message).to.equal('User not found');
});

afterEach(sinon.restore);
});
