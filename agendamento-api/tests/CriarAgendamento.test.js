// tests/CriarAgendamento.test.js

const CriarAgendamento = require('../src/core/usecases/CriarAgendamento');

// describe -> Define um "conjunto de testes" ou "test suite"
describe('CriarAgendamento UseCase', () => {

  // um "mock" do repositório para os testes.
  // Assim, testamos a lógica de negócio em total isolamento, sem base de dados real.
  const mockRepository = {
    agendamentos: [],
    salvar: jest.fn(function(agendamento) { this.agendamentos.push(agendamento) }),
    buscarPorData: jest.fn(function(data) { 
      return this.agendamentos.filter(a => a.data.getTime() === data.getTime());
    }),
    limpar: function() {
      this.agendamentos = [];
      this.salvar.mockClear();
      this.buscarPorData.mockClear();
    }
  };

  // beforeEach é executado antes de cada 'it'garantindo que um teste não interfira no outro.
  beforeEach(() => {
    mockRepository.limpar();
  });

  // it -> Define um "teste individual"
  it('deve criar um agendamento com sucesso se o horário estiver livre', async () => {
    const criarAgendamento = new CriarAgendamento(mockRepository);
    const dados = { 
      nomeCliente: 'João Silva', 
      servico: 'Corte', 
      data: new Date('2025-06-10T10:00:00Z') 
    };

    const agendamento = await criarAgendamento.executar(dados);

    expect(agendamento).toBeDefined(); // Verifica se o agendamento foi criado
    expect(mockRepository.salvar).toHaveBeenCalledTimes(1); // Verifica se o método salvar foi chamado
  });

  // it -> Define outro "teste individual"
  it('deve lançar um erro se o horário já estiver ocupado', async () => {
    const criarAgendamento = new CriarAgendamento(mockRepository);
    const dataOcupada = new Date('2025-06-10T11:00:00Z');

    // Primeiro, criamos um agendamento para ocupar o horário
    await criarAgendamento.executar({ nomeCliente: 'Maria', servico: 'Pintura', data: dataOcupada });

    // Agora, tentamos criar outro no mesmo horário
    const dadosConflitantes = { nomeCliente: 'Ana', servico: 'Manicure', data: dataOcupada };

    // A nossa expectativa é que esta execução REJEITE a promessa e lance um erro.
    await expect(criarAgendamento.executar(dadosConflitantes)).rejects.toThrow('Horário já ocupado.');
  });

});