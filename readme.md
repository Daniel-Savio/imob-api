# Info

## Sobre a Aplicação

Para iniciar a aplicação:`npm run dev`

Para inicar o prisma studio:` npx prisma studio`

Para migrar o database`npx prisma migrate`

Para alterar onde o nodeJs vai ler as variáveis de ambiente basta colocar o comando de run deste jeto:

`tsx watch --env-file .env src/http/server.ts`

## Sobre o banco de dados

A senha não pode conter caracteres especiais

## New residence post type:

```javascript
data:

{

  imagem: FileList {

    0: File {

      name: 'Ana Letícia-Carteirinha.png',
      lastModified: 1694698452887,
      lastModifiedDate: new Date('2023-09-14T13:34:12.000Z'),
      webkitRelativePath: '',
      size: 293980,
      type: 'image/png'

    },

    1: File {
      name: 'Daniel Sávio-Carteirinha.png',
      lastModified: 1694698429995,
      lastModifiedDate: new Date('2023-09-14T13:33:49.000Z'),
      webkitRelativePath: '',
      size: 341729,
      type: 'image/png'

    },

    length: 2

  },
  preco: '10.000',
  estado: 'Alagoas',
  cidade: 'Anadia',
  bairro: 'Alvorada 2',
  logradouro: 'Rua Olinda dias Grunwald',
  numero: '109',
  cep: '12970--000',
  tipo: 'Apartamento',
  geral: 'Comerciais',
  desc: 'adfsdfads '

}
```
