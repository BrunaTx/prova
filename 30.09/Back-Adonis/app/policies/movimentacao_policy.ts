import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissoes.js'

export default class MovimentacaoPolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papel_id].listMovimentacao
  }
  view(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papel_id].viewMovimentacao
  }
  create(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papel_id].createMovimentacao
  }

  edit(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papel_id].editMovimentacao
  }

  delete(user: User | null): AuthorizerResponse {
    // Se não há usuário logado, negar acesso
    if (!user) return false
    return permissions[user.papel_id].deleteMovimentacao
  }
}
