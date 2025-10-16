import type { HttpContext } from '@adonisjs/core/http'
import ClienteService from '#services/cliente_service'

export default class ClienteController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) return response.status(401).json({ message: 'Não autorizado' })

    if (user.papel_id === 2) {
      // Cliente logado vê apenas o próprio registro
      const cliente = await ClienteService.buscarClientePorUserId(user.id)
      return response.status(200).json({ message: 'OK', data: cliente ? [cliente] : [] })
    }

    // Gerente/admin vê todos os clientes
    const clientes = await ClienteService.listarClientes()
    return response.status(200).json({ message: 'OK', data: clientes })
  }

  async store({ request, response }: HttpContext) {
    const payload = request.only([
      'nome_completo', 'email', 'senha', 'cpf', 'cidade',
      'estado', 'rua', 'numero_casa'
    ])

    const cliente = await ClienteService.criarCliente(payload)
    return response.status(201).json({ message: 'OK', data: cliente })
  }

  async show({ params, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) return response.status(401).json({ message: 'Não autorizado' })

    const cliente = await ClienteService.buscarCliente(params.id)
    if (!cliente) return response.status(404).json({ message: 'Cliente não encontrado' })

    if (user.papel_id === 2 && cliente.user_id !== user.id) {
      return response.status(403).json({ message: 'Acesso negado' })
    }

    return response.status(200).json({ message: 'OK', data: cliente })
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) return response.status(401).json({ message: 'Não autorizado' })

    const cliente = await ClienteService.buscarCliente(params.id)
    if (!cliente) return response.status(404).json({ message: 'Cliente não encontrado' })

    if (user.papel_id === 2 && cliente.user_id !== user.id) {
      return response.status(403).json({ message: 'Acesso negado' })
    }

    const payload = request.only([
      'nome_completo', 'email', 'senha', 'cpf', 'cidade',
      'estado', 'rua', 'numero_casa'
    ])
    const clienteAtualizado = await ClienteService.atualizarCliente(params.id, payload)
    return response.status(200).json({ message: 'OK', data: clienteAtualizado })
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user
    if (!user) return response.status(401).json({ message: 'Não autorizado' })

    const cliente = await ClienteService.buscarCliente(params.id)
    if (!cliente) return response.status(404).json({ message: 'Cliente não encontrado' })

    if (user.papel_id === 2 && cliente.user_id !== user.id) {
      return response.status(403).json({ message: 'Acesso negado' })
    }

    const clienteDeletado = await ClienteService.deletarCliente(params.id)
    return response.status(200).json({ message: 'OK', data: clienteDeletado })
  }
}
