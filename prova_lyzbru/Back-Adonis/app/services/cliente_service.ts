import Cliente from '#models/cliente'
import User from '#models/user'

export default class ClienteService {

  // Criar cliente e usuário  
  static async criarCliente(payload: any) {
    const user = await User.create({
      nome_completo: payload.nome_completo,
      email: payload.email,          
      senha: payload.senha || '1234', 
      papel_id: 2,                  
    })

    //  criar cliente e vincular ao usuário
    const cliente = await Cliente.create({
      ...payload,
      user_id: user.id,
    })

    return cliente.toJSON()
  }

  // busca cliente por id
  static async buscarCliente(id: number) {
    const cliente = await Cliente.query().where('id', id).first()
    if (!cliente) return null
    return cliente.toJSON()
  }

  // busca cliente e user pelo id logado
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

  const cliente = await Cliente.findOrFail(id)
  const user = await User.findOrFail(cliente.user_id)


  if (payload.nome_completo) user.nome_completo = payload.nome_completo
  if (payload.email) user.email = payload.email
  if (payload.senha) user.senha = payload.senha
  await user.save()

  cliente.merge(payload)
  await cliente.save()

  return cliente.toJSON()
}

  // Deletar cliente

static async deletarCliente(id: number) {
 
  const cliente = await Cliente.findOrFail(id)
  const user = await User.findOrFail(cliente.user_id)

  const data = cliente.toJSON()

  await cliente.delete()
  await user.delete()

  return data
}

}

