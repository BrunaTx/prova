import type { HttpContext } from '@adonisjs/core/http'
import ClienteService from '#services/cliente_service'

export default class ClienteController {
  async index({ response }: HttpContext) {
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

  async show({ params, response }: HttpContext) {
    const cliente = await ClienteService.buscarCliente(params.id)
    return response.status(200).json({ message: 'OK', data: cliente })
  }

  async update({ params, request, response }: HttpContext) {
    const payload = request.only([
      'nome_completo', 'email', 'senha', 'cpf', 'cidade', 
      'estado', 'rua', 'numero_casa'
    ])
    const cliente = await ClienteService.atualizarCliente(params.id, payload)
    return response.status(200).json({ message: 'OK', data: cliente })
  }

  async destroy({ params, response }: HttpContext) {
    const cliente = await ClienteService.deletarCliente(params.id)
    return response.status(200).json({ message: 'OK', data: cliente })
  }
}