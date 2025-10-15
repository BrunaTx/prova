import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'aplicacoes_financeiras'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.enum('tipo', ['poupanca', 'titulos_governo', 'acoes']).notNullable()
      table.decimal('valor', 12, 2).notNullable()
      table.enum('status', ['ativa', 'resgatada']).defaultTo('ativa')
      table.integer('conta_corrente_id')
        .unsigned()
        .references('id')
        .inTable('contas_correntes')
        .onDelete('CASCADE') 
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
