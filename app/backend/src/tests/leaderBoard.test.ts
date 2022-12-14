import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
describe('Testando rotas de leaderboard', () => {
    it('Deve retornar todos as estatisticas dos times da casa e o status "200"', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard/home')

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body[0]).to.deep.equal(
        {
          name: "Santos",
          totalPoints: 9,
          totalGames: 3,
          totalVictories: 3,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 9,
          goalsOwn: 3,
          goalsBalance: 6,
          efficiency: 100.00
        },
      );

    });
    it('Deve retornar todos as estatisticas dos times da visitantes e o status "200"', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard/away')

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body[0]).to.deep.equal(
        {
          name: "Palmeiras",
          totalPoints: 6,
          totalGames: 2,
          totalVictories: 2,
          totalDraws: 0,
          goalsFavor: 7,
          goalsOwn: 0,
          goalsBalance: 7,
          efficiency: 100,
          totalLosses: 0
        },
      );

    });
});
