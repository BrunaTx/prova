import type { HttpContext } from '@adonisjs/core/http'
import { createAplicacaoFinanceira, updateAplicacaoFinanceira } from '#validators/aplicacao_financeira'
import AplicacaoFinanceiraPolicy from '#policies/aplicacao_financeira'
import AplicacaoFinanceiraService from '#services/aplicacao_financeira_service'
import logger from '@adonisjs/core/services/logger'

export default class AplicacoesFinanceirasController {
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(AplicacaoFinanceiraPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar aplicações financeiras' })
      }

      const aplicacoes = await AplicacaoFinanceiraService.listarAplicacoes()
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
        return response.forbidden({ message: 'Você não tem permissão para criar aplicação financeira' })
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
        return response.forbidden({ message: 'Você não tem permissão para criar aplicações financeiras' })
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
      await auth.getUserOrFail()

      if (await bouncer.with(AplicacaoFinanceiraPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver aplicação financeira' })
      }

      const aplicacao = await AplicacaoFinanceiraService.buscarAplicacao(params.id)
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