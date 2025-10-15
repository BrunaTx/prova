import type { HttpContext } from '@adonisjs/core/http'
import ContaCorrente from '#models/conta_corrente'
import logger from '@adonisjs/core/services/logger'
import ContaCorrenteService from '#services/conta_corrente_service'

export default class ContaCorrenteController {
  async index({ request, response }: HttpContext) {
    try {
      const numeroConta = request.input('numero_conta')

      let contas = ContaCorrente.query().preload('cliente')

      if (numeroConta) {
        contas = contas.where('numero_conta', numeroConta)
      }

      const resultado = await contas
      return response.status(200).json({ message: 'OK', data: resultado })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const conta = await ContaCorrente.query()
        .where('id', params.id)
        .preload('cliente')
        .firstOrFail()

      return response.status(200).json({ message: 'OK', data: conta })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = request.only(['numeroConta', 'numeroAgencia', 'saldo', 'clienteId'])
      const conta = await ContaCorrenteService.criarConta(payload)
      return response.created({ data: conta })
    } catch (error) {
      console.error(error)
      return response.status(400).send({ error: 'Erro ao criar conta' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const payload = request.only(['numeroConta', 'numeroAgencia', 'saldo', 'clienteId'])
      const conta = await ContaCorrenteService.atualizarConta(params.id, payload)
      return response.ok({ data: conta })
    } catch (error) {
      console.error(error)
      return response.status(400).send({ error: 'Erro ao atualizar conta' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const conta = await ContaCorrenteService.deletarConta(params.id)
      return response.ok({ message: 'Conta excluída com sucesso', data: conta })
    } catch (error) {
      console.error(error)
      return response.status(404).send({ error: 'Conta não encontrada' })
    }
  }
}
