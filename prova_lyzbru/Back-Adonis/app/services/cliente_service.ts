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

// import Cliente from '#models/cliente'
// import User from '#models/user'

// export default class ClienteService {
//   // Criar cliente + (opcionalmente) usuário vinculado
//   static async criarCliente(payload: any) {
//     let user

//     if (payload.user_id) {
//       // 🩵 Já veio com user_id (cliente logado criando seu próprio registro)
//       user = await User.find(payload.user_id)
//       if (!user) throw new Error('Usuário não encontrado')
//       console.log('Usando usuário logado:', user.toJSON())
//     } else {
//       // 🧑‍💼 Criado por um gerente — precisa gerar o user
//       user = await User.create({
//         nome_completo: payload.nome_completo,
//         email: payload.email,
//         senha: payload.senha || '1234',
//         papel_id: 2,
//       })
//       console.log('Usuário criado automaticamente:', user.toJSON())
//     }

//     const cliente = await Cliente.create({
//       nome_completo: payload.nome_completo,
//       email: payload.email,
//       senha: payload.senha || '1234',
//       cpf: payload.cpf,
//       cidade: payload.cidade,
//       estado: payload.estado,
//       rua: payload.rua,
//       numero_casa: payload.numero_casa,
//       user_id: Number(user.id),
//     })

//     console.log('Cliente criado e vinculado:', cliente.toJSON())
//     return cliente.toJSON()
//   }

//   // Buscar cliente por ID
//   static async buscarCliente(id: number) {
//     const cliente = await Cliente.query().where('id', id).first()
//     return cliente ? cliente.toJSON() : null
//   }

//   // Buscar cliente pelo user_id (para login ou index)
//   static async buscarClientePorUserId(userId: number) {
//     console.log('Buscando cliente para userId:', userId)
//     const cliente = await Cliente.query().where('user_id', userId).first()
//     if (cliente) {
//       console.log('Cliente encontrado:', cliente.toJSON())
//       return cliente.toJSON()
//     }
//     console.log('Nenhum cliente encontrado para userId:', userId)
//     return null
//   }

//   // Listar todos os clientes
//   static async listarClientes() {
//     const clientes = await Cliente.all()
//     return clientes.map(c => c.toJSON())
//   }

//   // Atualizar cliente
//   static async atualizarCliente(id: number, payload: any) {
//     const cliente = await Cliente.query().where('id', id).firstOrFail()
//     cliente.merge(payload)
//     await cliente.save()
//     return cliente.toJSON()
//   }

//   // Deletar cliente
//   static async deletarCliente(id: number) {
//     const cliente = await Cliente.query().where('id', id).firstOrFail()
//     const data = cliente.toJSON()
//     await cliente.delete()
//     return data
//   }
// }
