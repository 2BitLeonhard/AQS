const AgendamentoRepository = require('../../core/ports/AgendamentoRepository');
class AgendamentoRepositoryInMemory extends AgendamentoRepository {
  constructor() {
    super();
    this.agendamentos = [];
  }
  async salvar(agendamento) {
    this.agendamentos.push(agendamento);
    return agendamento;
  }
  async buscarPorData(data) {
    return this.agendamentos.filter(a => a.data.getTime() === data.getTime());
  }
}
module.exports = AgendamentoRepositoryInMemory;