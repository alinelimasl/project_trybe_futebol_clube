import * as sinon from 'sinon';
import * as chai from 'chai';
import SequelizeUsers from '../database/models/users/SequelizeUsers';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import { user } from './mocks/Users.mock';

chai.use(chaiHttp);

const { expect } = chai;
const { app } = new App();

describe('Users teste', () => {
  it('Deve retornar um token, quando o usuário for autenticado', async function() {
    const response = await chai.request(app)
    .post('/login')
    .send({ email: user.email, password: user.password });
    
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');

  });

  it('Deve retornar um erro, quando o usuário não for autenticado', async function() {
    const response = await chai.request(app)
    .post('/login')
    .send({ email: 'invalid_email', password: 'invalid_password' });

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Invalid email or password');
  });
    
    

afterEach(sinon.restore);
});
