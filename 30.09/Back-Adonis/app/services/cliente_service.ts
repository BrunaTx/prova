import Cliente from "#models/cliente"

export default class ClienteService {
  static async listarClientes() {
    const clientes = await Cliente.all()
    return clientes.map(c => c.toJSON())
  }

  static async buscarCliente(id: number) {
    const cliente = await Cliente.findOrFail(id)
    return cliente.toJSON()
  }

  static async criarCliente(payload: any) {
    const cliente = await Cliente.create(payload)
    return cliente.toJSON()
  }

  static async atualizarCliente(id: number, payload: any) {
    const cliente = await Cliente.findOrFail(id)
    cliente.merge(payload)
    await cliente.save()
    return cliente.toJSON()
  }

  static async deletarCliente(id: number) {
    const cliente = await Cliente.findOrFail(id)
    const data = cliente.toJSON()
    await cliente.delete() 
    return data
  }
}