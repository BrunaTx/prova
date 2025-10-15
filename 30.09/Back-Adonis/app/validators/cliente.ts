import vine from '@vinejs/vine'

export const createCliente = vine.compile(
  vine.object({
    nome_completo: vine.string().trim().minLength(4),
    email: vine.string().email(),
    senha: vine.string().minLength(4),
    cpf: vine.string().minLength(11).maxLength(14),
    cidade: vine.string().trim(),
    estado: vine.string().trim(),
    rua: vine.string().trim(),
    numero_casa: vine.string().trim(),
  })
)

export const updateCliente = vine.compile(
  vine.object({
    nome_completo: vine.string().trim().minLength(4).optional(),
    email: vine.string().email().optional(),
    senha: vine.string().minLength(4).optional(),
    cpf: vine.string().minLength(11).maxLength(14).optional(),
    cidade: vine.string().trim().optional(),
    estado: vine.string().trim().optional(),
    rua: vine.string().trim().optional(),
    numero_casa: vine.string().trim().optional(),
  })
)