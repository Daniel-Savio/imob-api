import { z } from "zod";

const imovelSchema = z.object({
    imagens: z.array(z.string()),
    preco: z
        .string()
        .regex(/^\d{1,3}(\.\d{3})*(,\d{2})?$/),
    transaction: z.string().default("Venda"),
    estado: z.string(),
    cidade: z.string(),
    bairro: z.string(),
    logradouro: z.string(),
    numero: z.string(),
    cep: z.string().regex(/^\d{5}-\d{3}$/),
    tipo: z.string(),
    geral: z.string(),
    desc: z.string()
});

export default imovelSchema