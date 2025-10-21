import type { HttpContext } from '@adonisjs/core/http'
import ContaCorrente from '#models/conta_corrente'
import ContaCorrenteService from '#services/conta_corrente_service'
import Cliente from '#models/cliente'
import logger from '@adonisjs/core/services/logger'

export default class ContaCorrenteController {
  async index({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user
      if (!user) return response.status(401).json({ message: 'Não autorizado' })

      const numeroConta = request.input('numeroConta')
      let query = ContaCorrente.query().preload('cliente')

      // cliente logado vê a própria conta
      if (user.papel_id === 2) {
        const cliente = await Cliente.query().where('user_id', user.id).first()
        if (!cliente) return response.status(404).json({ message: 'Cliente não encontrado' })
        query = query.where('cliente_id', cliente.id)
      }

      if (numeroConta) {
        query = query.where('numeroConta', numeroConta)
      }

      const contas = await query
      return response.status(200).json({ message: 'OK', data: contas })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async show({ params, response, auth }: HttpContext) {
    try {
      const user = auth.user
      if (!user) return response.status(401).json({ message: 'Não autorizado' })

      const conta = await ContaCorrente.query()
        .where('id', params.id)
        .preload('cliente')
        .firstOrFail()

      // cliente ve conta na url
      if (user.papel_id === 2) {
        const cliente = await Cliente.query().where('user_id', user.id).first()
        if (!cliente || conta.clienteId !== cliente.id) {
          return response.status(403).json({ message: 'Acesso negado' })
        }
      }

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
      return response.created({ message: 'OK', data: conta })
    } catch (error) {
      logger.error(error)
      return response.status(400).json({ message: 'Erro ao criar conta' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const payload = request.only(['numeroConta', 'numeroAgencia', 'saldo', 'clienteId'])
      const conta = await ContaCorrenteService.atualizarConta(params.id, payload)
      return response.ok({ message: 'OK', data: conta })
    } catch (error) {
      logger.error(error)
      return response.status(400).json({ message: 'Erro ao atualizar conta' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const conta = await ContaCorrenteService.deletarConta(params.id)
      return response.ok({ message: 'Conta excluída com sucesso', data: conta })
    } catch (error) {
      logger.error(error)
      return response.status(404).json({ message: 'Conta não encontrada' })
    }
  }
}
