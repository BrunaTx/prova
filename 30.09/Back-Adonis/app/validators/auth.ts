import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    // CORREÇÃO: Mudar 'fullName' para 'nomeCompleto' ou adicionar o campo correto
    nomeCompleto: vine.string().trim().minLength(2).maxLength(100).optional(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    senha: vine.string().minLength(6),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    senha: vine.string(),
  })
)