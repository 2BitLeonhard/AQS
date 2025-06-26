const express = require('express');
const CriarAgendamento = require('./core/usecases/CriarAgendamento');
const AgendamentoRepositoryInMemory = require('./adapters/outbound/AgendamentoRepositoryInMemory');
const AgendamentoController = require('./adapters/inbound/AgendamentoController');

const agendamentoRepository = new AgendamentoRepositoryInMemory();
const criarAgendamentoUseCase = new CriarAgendamento(agendamentoRepository);
const agendamentoController = new AgendamentoController(criarAgendamentoUseCase);

const app = express();
app.use(express.json());

app.post('/agendamentos', (req, res) => agendamentoController.criar(req, res));

module.exports = app;