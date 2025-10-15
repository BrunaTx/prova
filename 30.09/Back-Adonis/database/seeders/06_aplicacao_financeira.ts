import { BaseSeeder } from '@adonisjs/lucid/seeders'
import AplicacaoFinanceira from '#models/aplicacao_financeira'

export default class AplicacaoFinanceiraSeeder extends BaseSeeder {
  public async run() {
    await AplicacaoFinanceira.createMany([
      {
        tipo: 'poupanca',
        valor: 1000,
        conta_corrente_id: 1,
        status: 'ativa',
      },
      {
        tipo: 'acoes',
        valor: 500,
        conta_corrente_id: 1,
        status: 'ativa',
      },
      {
        tipo: 'titulos_governo',
        valor: 2000,
        conta_corrente_id: 2,
        status: 'ativa',
      },
    ])
  }
}