import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Papel from '#models/papel'

export default class extends BaseSeeder {
  async run() {
    await Papel.createMany([
      {
        nome: 'Gerente',
      },
      {
        nome: 'Cliente',
      },
    ])
  }
}
