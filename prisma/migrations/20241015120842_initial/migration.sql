/*
  Warnings:

  - The `imageList` column on the `Imovel` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Imovel" DROP COLUMN "imageList",
ADD COLUMN     "imageList" TEXT[],
ALTER COLUMN "cep" DROP NOT NULL;
