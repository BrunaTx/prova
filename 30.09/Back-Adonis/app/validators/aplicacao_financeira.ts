import vine from '@vinejs/vine'

export const createAplicacaoFinanceira = vine.compile(
  vine.object({
    tipo: vine.enum(['poupanca', 'titulos_governo', 'acoes']),
    valor: vine.number().positive(),
    conta_corrente_id: vine.number().positive().withoutDecimals(),
    status: vine.enum(['ativa', 'resgatada']).optional(),
  })
)

export const updateAplicacaoFinanceira = vine.compile(
  vine.object({
    tipo: vine.enum(['poupanca', 'titulos_governo', 'acoes']).optional(),
    valor: vine.number().positive().optional(),
    conta_corrente_id: vine.number().positive().withoutDecimals().optional(),
    status: vine.enum(['ativa', 'resgatada']).optional(),
  })
)