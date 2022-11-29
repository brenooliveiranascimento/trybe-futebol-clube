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
describe('Testando fluxo de autenticação', () => {
  describe('credenciais erradas,', () => {
    it('deve retornar um status "400" ao tentar acessar sem o campo "email"', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        password: 'Acabaci_lendário_123',
      });

      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    });
    it('deve retornar um status "401" ao enviar um email de usuario não existente', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: 'capitãoNascimento@gmail.com',
        password: 'Acabaci_lendário_123',
      });

      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
    });
    it('deve retornar um status "401" ao enviar uma senha iunválida', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: 'Acabaci_lendário_123',
      });

      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
    });

  });
});
