export const policies = {
  ClientePolicy: () => import('#policies/cliente_policy'),
  MovimentacaoPolicy: () => import('#policies/movimentacao_policy'),
  ContaCorrentePolicy: () => import('#policies/conta_corrente_policy'),
  AplicacaoFinanceiraPolicy: () => import('#policies/aplicacao_financeira'),
}