import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import ContaCorrente from './conta_corrente.js' 

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome_completo: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare senha: string

  @column()
  declare cpf: string

  @column()
  declare cidade: string

  @column()
  declare estado: string

  @column()
  declare rua: string

  @column()
  declare numero_casa: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => ContaCorrente)
  declare contas: HasMany<typeof ContaCorrente>
}