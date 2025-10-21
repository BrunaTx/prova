import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Cliente from '#models/cliente'

export default class ClienteSeeder extends BaseSeeder {
  public async run() {
    await Cliente.create({
      nome_completo: 'Bruna',
      email: 'cliente1@gmail.com',
      senha: '1234',
      cpf: '09922050925',
      cidade: 'Pontal do Paraná',
      estado: 'PR',
      rua: 'Rua porra de codigo, odio',
      numero_casa: '123',
    })
    
    await Cliente.create({
      nome_completo: 'Lyz',
      email: 'cliente2@gmail.com',
      senha: '1234',
      cpf: '03522050674',
      cidade: 'Matinhos',
      estado: 'PR',
      rua: 'Rua Nao Aguento mais tbm',
      numero_casa: '456',
    })    
  }
}