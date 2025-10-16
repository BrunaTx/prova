import { DateTime } from '../../node_modules/@types/luxon/index.js'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ContaCorrente from './conta_corrente.js'

export default class Movimentacao extends BaseModel {
  static table = 'movimentacoes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tipo: 'deposito' | 'saque' | 'transferencia' 

  @column()
  declare valor: number

  @column({ columnName: 'conta_origem_id' })
  declare contaOrigemId: number | null

  @column({ columnName: 'conta_destino_id' })
  declare contaDestinoId: number | null

  @column()
  declare descricao: string | null

  @column.dateTime({ columnName: 'data_movimentacao' })
  declare dataMovimentacao: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => ContaCorrente, { foreignKey: 'contaOrigemId' })
  declare contaOrigem: BelongsTo<typeof ContaCorrente>

  @belongsTo(() => ContaCorrente, { foreignKey: 'contaDestinoId' })
  declare contaDestino: BelongsTo<typeof ContaCorrente>
}
