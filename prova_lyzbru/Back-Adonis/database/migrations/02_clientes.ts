import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clientes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome_completo').notNullable()
      table.string('email').notNullable()
      table.string('senha').notNullable()
      table.string('cpf').notNullable().unique()
      table.string('cidade').notNullable()
      table.string('estado').notNullable()
      table.string('rua').notNullable()
      table.string('numero_casa').notNullable()
      table.integer('user_id').unsigned().nullable()

      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
