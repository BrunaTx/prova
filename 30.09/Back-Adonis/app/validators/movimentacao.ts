import vine from '@vinejs/vine'

export const createMovimentacao = vine.compile(
  vine.object({
    tipo: vine.enum(['deposito','saque','transferencia','aplicacao']),
    valor: vine.number().positive(),
    conta_origem_id: vine.number().positive().withoutDecimals().optional(),
    conta_destino_id: vine.number().positive().withoutDecimals().optional(),
    descricao: vine.string().optional(),
    data_movimentacao: vine.date(),
  })
)

export const updateMovimentacao = vine.compile(
  vine.object({
    tipo: vine.enum(['deposito','saque','transferencia','aplicacao']).optional(),
    valor: vine.number().positive().optional(),
    conta_origem_id: vine.number().positive().withoutDecimals().optional(),
    conta_destino_id: vine.number().positive().withoutDecimals().optional(),
    descricao: vine.string().optional(),
    data_movimentacao: vine.date().optional(),
  })
)