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
describe('Testando rotas de matches', () => {
    it('Deve retornar todos as matches e o status "200"', async () => {
      const httpResponse = await chai.request(app).get('/matches')

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body[0]).to.deep.equal( {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      });
    });
    it('Deve retornar todos um matches filtradas e o status "200"', async () => {
      const httpResponse = await chai.request(app).get('/matches/?inProgress=false')

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body[0]).to.deep.equal({
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      });

    });
});
