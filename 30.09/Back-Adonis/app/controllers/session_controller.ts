import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SessionController {
  async store({ request, auth, response }: HttpContext) {

    // Obtém as credenciais do corpo da requisição
    const { email, senha } = request.only(['email', 'senha'])
    // Verifica as credencias - Efetua Login
    const user = await User.verifyCredentials(email, senha)
    // Gera o Token
    return await auth.use('api').createToken(user)
  }

  async destroy({ request, auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
  }
}