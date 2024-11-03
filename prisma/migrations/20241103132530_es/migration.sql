/*
  Warnings:

  - You are about to drop the column `imageList` on the `Imovel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Imovel" DROP COLUMN "imageList",
ADD COLUMN     "imagens" TEXT[];
