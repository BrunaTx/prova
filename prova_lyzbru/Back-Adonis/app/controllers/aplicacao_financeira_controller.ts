import type { HttpContext } from '@adonisjs/core/http'
import { createAplicacaoFinanceira, updateAplicacaoFinanceira } from '#validators/aplicacao_financeira'
import AplicacaoFinanceiraPolicy from '#policies/aplicacao_financeira'
import AplicacaoFinanceiraService from '#services/aplicacao_financeira_service'
import Cliente from '#models/cliente'
import logger from '@adonisjs/core/services/logger'

export default class AplicacoesFinanceirasController {
  async index({ response, auth, bouncer, request }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(AplicacaoFinanceiraPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar aplicações financeiras' })
      }

      let aplicacoes = await AplicacaoFinanceiraService.listarAplicacoes()

       // filtra aplicacoes do cliente logado
      if (user.papel_id === 2) {
        const cliente = await Cliente.query().where('user_id', user.id).first()
        if (!cliente) return response.status(404).json({ message: 'Cliente não encontrado' })
        aplicacoes = aplicacoes.filter(a => a.contaCorrente.cliente.id === cliente.id)
      }

      // Filtro conta corrente id
      const contaCorrenteId = request.input('contaCorrenteId')
      if (contaCorrenteId) {
        aplicacoes = aplicacoes.filter(a => a.contaCorrente.id === Number(contaCorrenteId))
      }

      return response.status(200).json({ message: 'OK', data: aplicacoes })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async create({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(AplicacaoFinanceiraPolicy).denies('create')) {
        return response.forbidden({ message: 'Sem permissão' })
      }

      return response.status(200).json({ message: 'OK', data: [] })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createAplicacaoFinanceira)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(AplicacaoFinanceiraPolicy).denies('create')) {
        return response.forbidden({ message: 'Sem permissão' })
      }

      const aplicacao = await AplicacaoFinanceiraService.criarAplicacao(payload)
      return response.status(201).json({ message: 'OK', data: aplicacao })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()

      if (await bouncer.with(AplicacaoFinanceiraPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver aplicação financeira' })
      }

      const aplicacao = await AplicacaoFinanceiraService.buscarAplicacao(params.id)

      // Cliente so ve suas aplicações
      if (user.papel_id === 2 && aplicacao.contaCorrente.cliente.user_id !== user.id) {
        return response.status(403).json({ message: 'Acesso negado' })
      }

      return response.status(200).json({ message: 'OK', data: aplicacao })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async edit({ auth, bouncer, response }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(AplicacaoFinanceiraPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar aplicação financeira' })
      }

      return response.status(200).json({ message: 'OK', data: [] })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateAplicacaoFinanceira)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(AplicacaoFinanceiraPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para alterar aplicação financeira' })
      }

      const aplicacao = await AplicacaoFinanceiraService.atualizarAplicacao(params.id, payload)
      return response.status(200).json({ message: 'OK', data: aplicacao })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }

  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(AplicacaoFinanceiraPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover aplicação financeira' })
      }

      await AplicacaoFinanceiraService.deletarAplicacao(params.id)
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({ message: 'ERROR' })
    }
  }
}
