import vine from '@vinejs/vine'

export const createContaCorrente = vine.compile(
  vine.object({
    numero_conta: vine.string().trim().minLength(4),
    numero_agencia: vine.string().trim().minLength(1),
    saldo: vine.number().positive().optional(),
    cliente_id: vine.number().positive().withoutDecimals(),
  })
)

export const updateContaCorrente = vine.compile(
  vine.object({
    numero_conta: vine.string().trim().minLength(4).optional(),
    numero_agencia: vine.string().trim().minLength(1).optional(),
    saldo: vine.number().positive().optional(),
    cliente_id: vine.number().positive().withoutDecimals().optional(),
  })
)
