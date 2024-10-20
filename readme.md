# Info

## Sobre a Aplicação

Para iniciar a aplicação:`npm run dev`

Para inicar o prisma studio:` npx prisma studio`

Para migrar o database `npx prisma migrate`

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

`user={ email:"eudps@gmail.com", password:"daniel#admin123"};`

ENDPOINT="https://bc775897bb7da823f6b5f68020045c66.r2.cloudflarestorage.com/imob"
ACCESS_KEY_ID = "5c3c9993566c81638bcb9b789ba69b79"
SECRET= "cb63fbe063f1fecfccadc5730c2b4e0975ae3b97a60598738eb5cd46463851b1"

DATABASE_URL="postgresql://root:zLhPSBChIwnQJV3FdalpKiaeOCcfH8XK@dpg-csaek03qf0us739t9kdg-a.oregon-postgres.render.com/imob_08xg"
