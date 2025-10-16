import { DateTime } from '../../node_modules/@types/luxon/index.js'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Cliente from './cliente.js'
import Movimentacao from './movimentacao.js'
import AplicacaoFinanceira from './aplicacao_financeira.js'

export default class ContaCorrente extends BaseModel {
  static table = 'contas_correntes'

  @column({ isPrimary: true })
  declare id: number
  
  @column({ columnName: 'numero_conta' })
  declare numeroConta: string
  
  @column({ columnName: 'numero_agencia' })
  declare numeroAgencia: string

  @column()
  declare saldo: number

  @column({ columnName: 'cliente_id' })
  declare clienteId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Cliente, { foreignKey: 'clienteId'})
  declare cliente: BelongsTo<typeof Cliente>

  @hasMany(() => Movimentacao, { foreignKey: 'conta_origem_id' })
  declare movimentacoesOrigem: HasMany<typeof Movimentacao>

  @hasMany(() => Movimentacao, { foreignKey: 'conta_destino_id' })
  declare movimentacoesDestino: HasMany<typeof Movimentacao>

  @hasMany(() => AplicacaoFinanceira, { foreignKey: 'conta_corrente_id' })
  declare aplicacoes: HasMany<typeof AplicacaoFinanceira>
}