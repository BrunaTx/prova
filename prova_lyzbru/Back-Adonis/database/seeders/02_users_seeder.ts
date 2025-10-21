import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  public async run() {
 
    await User.create({
      nome_completo: 'gerente',
      email: 'gerente@gmail.com',
      senha: '1234',
      papel_id: 1, 
    })

    await User.create({
      nome_completo: 'Bruna',
      email: 'cliente1@gmail.com',
      senha: '1234',
      papel_id: 2, 
    })

    await User.create({
      nome_completo: 'Lyz', 
      email: 'cliente2@gmail.com',
      senha: '1234',
      papel_id: 2, 
    })
  }
}