class CriarAgendamento {
  constructor(agendamentoRepository) { this.agendamentoRepository = agendamentoRepository; }
  async executar({ nomeCliente, servico, data }) {
    if (!nomeCliente || !data) { throw new Error("Nome do cliente e data são obrigatórios."); }
    const agendamentosNoMesmoHorario = await this.agendamentoRepository.buscarPorData(data);
    if (agendamentosNoMesmoHorario.length > 0) { throw new Error("Horário já ocupado."); }
    const novoAgendamento = { id: Date.now(), nomeCliente, servico, data };
    await this.agendamentoRepository.salvar(novoAgendamento);
    return novoAgendamento;
  }
}
module.exports = CriarAgendamento;