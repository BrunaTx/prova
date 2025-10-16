import type { HttpContext } from '@adonisjs/core/http'
import { createMovimentacao, updateMovimentacao } from '#validators/movimentacao'
import MovimentacaoPolicy from '#policies/movimentacao_policy'
import MovimentacaoService from '#services/movimentacao_service'
import logger from '@adonisjs/core/services/logger'

export default class MovimentacoesController {
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar movimentações' })
      }

      const movimentacoes = await MovimentacaoService.listarMovimentacao()
      return response.ok({ message: 'OK', data: movimentacoes })
    } catch (error) {
      logger.error(error)
      return response.internalServerError({ message: 'ERROR' })
    }
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createMovimentacao)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar movimentações' })
      }

      const movimentacao = await MovimentacaoService.criarMovimentacao(payload)
      return response.created({ message: 'OK', data: movimentacao })
    } catch (error) {
      logger.error(error)
      if (error.message?.includes('Saldo insuficiente')) {
        return response.badRequest({ message: 'Saldo insuficiente para realizar a operação' })
      }
      return response.internalServerError({ message: 'ERROR' })
    }
  }

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('view')) {
        return response.forbidden({ message: 'Você não tem permissão para ver movimentações' })
      }

      const movimentacao = await MovimentacaoService.buscarMovimentacao(params.id)
      return response.ok({ message: 'OK', data: movimentacao })
    } catch (error) {
      logger.error(error)
      return response.internalServerError({ message: 'ERROR' })
    }
  }

  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateMovimentacao)
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('edit')) {
        return response.forbidden({ message: 'Você não tem permissão para editar movimentações' })
      }

      const movimentacao = await MovimentacaoService.atualizarMovimentacao(params.id, payload)
      return response.ok({ message: 'OK', data: movimentacao })
    } catch (error) {
      logger.error(error)
      if (error.message?.includes('Saldo insuficiente')) {
        return response.badRequest({ message: 'Saldo insuficiente para realizar a operação' })
      }
      return response.internalServerError({ message: 'ERROR' })
    }
  }

  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('delete')) {
        return response.forbidden({ message: 'Você não tem permissão para remover movimentações' })
      }

      await MovimentacaoService.deletarMovimentacao(params.id)
      return response.ok({ message: 'OK' })
    } catch (error) {
      logger.error(error)
      return response.internalServerError({ message: 'ERROR' })
    }
  }
}
