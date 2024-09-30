import fastify from "fastify";

import { GetObjectCommand, ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3" //Put é o upload de arquivo
import { cloudflare } from "../utils/cloudFlare";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";
import { sign } from "crypto";
import imovelSchema from "../schemas/imovelSchema";

const multipart = require('fastify-multipart')
const cors = require('fastify-cors');

const app = fastify()
const prisma = new PrismaClient();

//Fastify Client configuration
app.register(cors, {
    origin: '*', // Permite qualquer origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
});
app.register(multipart)

const imagensSchema = z.array(z.string())


app.post("/upload", async (req, res) => {

    const imagens = imagensSchema.parse(req.body)

    const signedUrls = await Promise.all(
        imagens.map(async (imagem) => {
            const signedUrl = await getSignedUrl(
                cloudflare,
                new PutObjectCommand({
                    Bucket: "imob",
                    Key: imagem,
                    ContentType: "image/" + imagem.match(/\.\w+$/)?.at(0), // Pega a extensão do nome do arquivo
                }),
                { expiresIn: 600 }
            );
            return signedUrl;
        })
    );

    res.status(200).send(signedUrls)
})

app.post("/imovel", async (req, res) => {
    const imovel = imovelSchema.parse(req.body)
    try {
        await prisma.imovel.create({
            data: {
                imageList: imovel.imagens,
                preco: imovel.preco,
                bairro: imovel.bairro,
                cep: imovel.cep,
                cidade: imovel.cidade,
                desc: imovel.desc,
                estado: imovel.estado,
                geral: imovel.geral,
                logradouro: imovel.logradouro,
                numero: imovel.numero,
                tipo: imovel.tipo,
            }
        })
        res.status(200).send(`Imóvel em ${imovel.cidade} / ${imovel.estado} criado com sucesso!`)
    } catch (e) {
        res.status(500).send(`Erro ao escrever no Banco de Dados: \n ${e.message}`)
        console.log(e.message)
        return
    }
})



app.get('/', async (req, res) => {
    const command = new ListObjectsCommand({
        "Bucket": "imob",
    });
    const response = await cloudflare.send(command);
    return response
})

app.listen({
    port: 3030,
    host: "0.0.0.0"
}).then(() => { console.log("listening on port 3030") });


