import Cliente from '#models/cliente'
import User from '#models/user'

export default class ClienteService {

  // Criar cliente + usuário vinculado (sem hash)
  static async criarCliente(payload: any) {
    // 1️⃣ Criar usuário correspondente
    const user = await User.create({
      nome_completo: payload.nome_completo,
      email: payload.email,          // pode repetir email
      senha: payload.senha || '1234', // senha padrão em texto puro
      papel_id: 2,                   // papel de cliente
    })

    // 2️⃣ Criar cliente e vincular ao usuário
    const cliente = await Cliente.create({
      ...payload,
      user_id: user.id,
    })

    return cliente.toJSON()
  }

  // Buscar cliente por ID
  static async buscarCliente(id: number) {
    const cliente = await Cliente.query().where('id', id).first()
    if (!cliente) return null
    return cliente.toJSON()
  }

  // Buscar cliente pelo user_id (para clientes logados)
  static async buscarClientePorUserId(userId: number) {
    const cliente = await Cliente.query().where('user_id', userId).first()
    if (!cliente) return null
    return cliente.toJSON()
  }

  // Listar todos os clientes (para gerente/admin)
  static async listarClientes() {
    const clientes = await Cliente.all()
    return clientes.map(c => c.toJSON())
  }

  // Atualizar cliente
  static async atualizarCliente(id: number, payload: any) {
    const cliente = await Cliente.query().where('id', id).firstOrFail()
    cliente.merge(payload)
    await cliente.save()
    return cliente.toJSON()
  }

  // Deletar cliente
  static async deletarCliente(id: number) {
    const cliente = await Cliente.query().where('id', id).firstOrFail()
    const data = cliente.toJSON()
    await cliente.delete()
    return data
  }
}

