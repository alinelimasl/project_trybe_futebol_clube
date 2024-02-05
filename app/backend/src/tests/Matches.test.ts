import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { finishedGame, matchGames, matchPlay, validMatch, createMatch } from '../tests/mocks/Match.mock';

import SequelizeMatches from '../database/models/matches/SequelizeMatches';
import Validations from '../middlewares/authMiddleware';


chai.use(chaiHttp);

const { expect } = chai;

describe('Matches teste', () => {
    beforeEach(() => {
        sinon.stub(Validations, 'validateLogin').resolves();
    });
  it('Deve retornar todos os matches', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchGames as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
    expect(body).to.be.deep.equal(matchGames);
  });

//   it('Deve retornar um erro 404 quando nenhum match for encontrado', async function () {
//     sinon.stub(SequelizeMatches, 'findAll').resolves(undefined);
  
//     const { status, body } = await chai.request(app).get('/matches');
  
//     expect(status).to.be.equal(404); 
//     expect(body.message).to.be.equal('Matches not found');
//   });

  it('Deve retornar todos os matches com inProgress', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchPlay as any);

    const { status, body } = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchPlay);
  });

  it('Deve retornar os matches finalizados', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(finishedGame as any);

    const { status, body } = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(finishedGame);
  });
  

afterEach(sinon.restore);
});
