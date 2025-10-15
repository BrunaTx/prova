import AplicacaoFinanceira from '#models/aplicacao_financeira'
import ContaCorrente from '#models/conta_corrente'

export default class AplicacaoFinanceiraService {
  static async listarAplicacoes() {
    const aplicacoes = await AplicacaoFinanceira.query()
      .preload('contaCorrente', c => c.preload('cliente'))
    return aplicacoes.map(a => a.toJSON())
  }

  static async buscarAplicacao(id: number) {
    const aplicacao = await AplicacaoFinanceira.query()
      .where('id', id)
      .preload('contaCorrente', c => c.preload('cliente'))
      .firstOrFail()
    return aplicacao.toJSON()
  }

  static async criarAplicacao(payload: any) {
    const conta = await ContaCorrente.findOrFail(payload.conta_corrente_id)
    if (Number(conta.saldo) < Number(payload.valor)) throw new Error('Saldo insuficiente.')
    conta.saldo -= Number(payload.valor)
    await conta.save()

    const aplicacao = await AplicacaoFinanceira.create(payload)
    await aplicacao.load('contaCorrente', c => c.preload('cliente'))
    return aplicacao.toJSON()
  }

  static async atualizarAplicacao(id: number, payload: any) {
    const aplicacao = await AplicacaoFinanceira.query()
      .where('id', id)
      .preload('contaCorrente', c => c.preload('cliente'))
      .firstOrFail()

    const conta = await ContaCorrente.findOrFail(aplicacao.conta_corrente_id)
    conta.saldo += Number(aplicacao.valor)

    if (payload.valor) {
      if (Number(conta.saldo) < Number(payload.valor)) throw new Error('Saldo insuficiente.')
      conta.saldo -= Number(payload.valor)
    }

    await conta.save()
    aplicacao.merge(payload)
    await aplicacao.save()
    await aplicacao.load('contaCorrente', c => c.preload('cliente'))
    return aplicacao.toJSON()
  }

  static async deletarAplicacao(id: number) {
    const aplicacao = await AplicacaoFinanceira.query()
      .where('id', id)
      .preload('contaCorrente')
      .firstOrFail()

    const conta = await ContaCorrente.findOrFail(aplicacao.conta_corrente_id)

    // Garantindo que seja number
    const valorAplicacao = Number(aplicacao.valor) || 0
    conta.saldo = Number(conta.saldo) + valorAplicacao

    await conta.save()
    await aplicacao.delete()

    return aplicacao.toJSON()
  }
}