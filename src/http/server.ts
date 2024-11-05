import fastify from "fastify";

import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3" //Put é o upload de arquivo
import { cloudflare } from "../utils/cloudFlare";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import imovelSchema from "../schemas/imovelSchema";
import { env } from "process";

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


//Routes
app.post("/upload", async (req, res) => {

    const imagens = imagensSchema.parse(req.body)

    const signedUrls = await Promise.all(
        imagens.map(async (imagem) => {
            const signedUrl = await getSignedUrl(
                cloudflare,
                new PutObjectCommand({
                    Bucket: "imob",
                    Key: imagem,
                    ContentType: "image/jpeg" //+ imagem.match(/\.\w+$/)?.at(0), // Pega a extensão do nome do arquivo
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
                imagens: imovel.imagens,
                transaction: imovel.transaction,
                titulo: imovel.titulo,
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
                room: imovel.room


            }
        })
        res.status(200).send(`Imóvel para ${imovel.transaction} em ${imovel.cidade} / ${imovel.estado} criado com sucesso!`)
    } catch (e) {
        res.status(500).send(`Erro ao escrever no Banco de Dados: \n ${e.message}`)
        return
    }
})

app.get('/', async (req, res) => {
    return prisma.imovel.findMany({ orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }] })
})

app.get('/:imovelId', async (req, res) => {
    const { imovelId } = req.params;
    return prisma.imovel.findUnique({ where: { id: imovelId } })
})

app.delete("/:imovelId", async (req, res,) => {
    const { imovelId } = req.params;
    const imovel = await prisma.imovel.findUnique({ where: { id: imovelId } })
    const images = imovel?.imageList

    images?.forEach(async (image) => {
        console.log("Images to be deleted:  " + image)
        const delteCommand = new DeleteObjectCommand({ Bucket: "imob", Key: image })
        await cloudflare.send(delteCommand)

    })

    await prisma.imovel.delete({ where: { id: imovelId } })
    return res.status(200).send("Imóvel deletado com sucesso")
})

app.put("/:imovelId", async (req, res) => {
    console.log(req.body)
})

app.listen({
    port: process.env.PORT ? Number(process.env.PORT) : 3030,
    host: "0.0.0.0"
}).then(() => { console.log(`Alive and kicking, listening on port: ${process.env.PORT ? Number(process.env.PORT) : 3030}`) });


