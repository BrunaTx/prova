import Cliente from '#models/cliente'
import User from '#models/user'

export default class ClienteService {

  // Criar cliente + usuário vinculado (sem hash)
  static async criarCliente(payload: any) {
    // Criar usuário correspondente
    const user = await User.create({
      nome_completo: payload.nome_completo,
      email: payload.email,          // pode repetir email
      senha: payload.senha || '1234', // senha padrão em texto puro
      papel_id: 2,                   // papel de cliente
    })

    //  Criar cliente e vincular ao usuário
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

  static async listarClientes() {
    const clientes = await Cliente.all()
    return clientes.map(c => c.toJSON())
  }

  // Atualizar cliente
  static async atualizarCliente(id: number, payload: any) {
  // 1. Buscar o cliente
  const cliente = await Cliente.findOrFail(id)

  // 2. Buscar o usuário vinculado
  const user = await User.findOrFail(cliente.user_id)

  // 3. Atualizar usuário
  if (payload.nome_completo) user.nome_completo = payload.nome_completo
  if (payload.email) user.email = payload.email
  if (payload.senha) user.senha = payload.senha
  await user.save()

  // 4. Atualizar cliente
  cliente.merge(payload)
  await cliente.save()

  // 5. Retornar cliente atualizado
  return cliente.toJSON()
}

  // Deletar cliente
// Deletar cliente e o usuário vinculado
static async deletarCliente(id: number) {
  // 1. Buscar cliente
  const cliente = await Cliente.findOrFail(id)

  // 2. Buscar o usuário vinculado
  const user = await User.findOrFail(cliente.user_id)

  // 3. Salvar dados antes de deletar (caso queira retornar)
  const data = cliente.toJSON()

  // 4. Deletar cliente
  await cliente.delete()

  // 5. Deletar usuário
  await user.delete()

  // 6. Retornar os dados do cliente deletado
  return data
}

}

