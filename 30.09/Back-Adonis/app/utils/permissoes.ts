export const permissions = [
  {
    listCliente: false,
    viewCliente: false,
    createCliente: false,
    editCliente: false,
    deleteCliente: false,

    listContaCorrente: false,
    viewContaCorrente: false,
    createContaCorrente: false,
    editContaCorrente: false,
    deleteContaCorrente: false,

    listMovimentacao: false,
    viewMovimentacao: false,
    createMovimentacao: false,
    editMovimentacao: false,
    deleteMovimentacao: false,

    listAplicacaoFinanceira: false,
    viewAplicacaoFinanceira: false,
    createAplicacaoFinanceira: false,
    editAplicacaoFinanceira: false,
    deleteAplicacaoFinanceira: false,
  },
  // Papel 1: Gerente
  {
    listCliente: true,
    viewCliente: true,
    createCliente: true,
    editCliente: true,
    deleteCliente: true,

    listContaCorrente: true,
    viewContaCorrente: true,
    createContaCorrente: true,
    editContaCorrente: true,
    deleteContaCorrente: true,

    listMovimentacao: true,
    viewMovimentacao: true,
    createMovimentacao: false,
    editMovimentacao: true,
    deleteMovimentacao: true,

    listAplicacaoFinanceira: true,
    viewAplicacaoFinanceira: true,
    createAplicacaoFinanceira: false,
    editAplicacaoFinanceira: true,
    deleteAplicacaoFinanceira: true,
  },
  // Papel 2: Cliente
  {
    listCliente: true,
    viewCliente: true,
    createCliente: false,
    editCliente: false,
    deleteCliente: false,

    listContaCorrente: true,
    viewContaCorrente: true,
    createContaCorrente: false,
    editContaCorrente: false,
    deleteContaCorrente: false,

    listMovimentacao: true,
    viewMovimentacao: true,
    createMovimentacao: true,
    editMovimentacao: false,
    deleteMovimentacao: false,

    listAplicacaoFinanceira: true,
    viewAplicacaoFinanceira: true,
    createAplicacaoFinanceira: true,
    editAplicacaoFinanceira: false,
    deleteAplicacaoFinanceira: false,
  },
]