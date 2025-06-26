class AgendamentoRepository {
  async salvar(agendamento) { throw new Error("Método 'salvar' não implementado" ); }
  async buscarPorData(data) { throw new Error("Método 'buscarPorData' não implementado"); }
}
module.exports = AgendamentoRepository;