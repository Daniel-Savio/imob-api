// Esse arquivo valida minhas variáveis ambiente, para saber se ta tudo certo

import { z } from "zod"

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    ENDPOINT: z.string().url(),
    ACCESS_KEY_ID: z.string(),
    SECRET: z.string()
})

export const env = envSchema.parse(process.env) // O parse vai validar a tipagem do meu process.env com o scheema acima