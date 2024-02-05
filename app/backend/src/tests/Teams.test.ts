import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/teams/SequelizeTeams';
import { teams, team } from './mocks/Teams.mock';




chai.use(chaiHttp);

const { expect } = chai;

describe('Teams teste', () => {
  
    it('Deve retornar todos os times', async function() {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teams);

  });
  it('Deve retornar um time por id', async function() {
    sinon.stub(SequelizeTeams, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/3');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(team);
  });
  afterEach(sinon.restore);
});