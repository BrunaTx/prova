import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Movimentacao from '#models/movimentacao'
import { DateTime } from 'luxon'

export default class MovimentacaoSeeder extends BaseSeeder {
  public async run() {
    await Movimentacao.createMany([
      {
        tipo: 'deposito',
        valor: 1000.00,
        contaOrigemId: 1,
        contaDestinoId: 1, 
        descricao: 'Depósito inicial',
        dataMovimentacao: DateTime.local(),
      },
      {
        tipo: 'saque',
        valor: 200.00,
        contaOrigemId: 1,
        contaDestinoId: null,
        descricao: 'Saque caixa eletrônico',
        dataMovimentacao: DateTime.local(),
      },
      {
        tipo: 'transferencia',
        valor: 150.00,
        contaOrigemId: 1,
        contaDestinoId: 2, 
        descricao: 'Transferência PIX',
        dataMovimentacao: DateTime.local(),
      },
    ])
  }
}