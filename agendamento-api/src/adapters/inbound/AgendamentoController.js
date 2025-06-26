class AgendamentoController {
  constructor(criarAgendamentoUseCase) { this.criarAgendamentoUseCase = criarAgendamentoUseCase; }
  async criar(req, res) {
    try {
      const { nomeCliente, servico, data } = req.body;
      if (!nomeCliente || !servico || !data) { return res.status(400).json({ error: 'Dados incompletos.' }); }
      const dadosAgendamento = { nomeCliente, servico, data: new Date(data) };
      const agendamento = await this.criarAgendamentoUseCase.executar(dadosAgendamento);
      return res.status(201).json(agendamento);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = AgendamentoController;