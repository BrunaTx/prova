import { DateTime } from '../../node_modules/@types/luxon/index.js'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ContaCorrente from './conta_corrente.js'

export default class AplicacaoFinanceira extends BaseModel {
   static table = 'aplicacoes_financeiras'
   
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tipo: 'poupanca' | 'titulos_governo' | 'acoes'

  @column()
  declare valor: number

  @column()
  declare status: 'ativa' | 'resgatada'

  @column()
  declare conta_corrente_id: number

  @belongsTo(() => ContaCorrente, { foreignKey: 'conta_corrente_id' })
  declare contaCorrente: BelongsTo<typeof ContaCorrente>  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}