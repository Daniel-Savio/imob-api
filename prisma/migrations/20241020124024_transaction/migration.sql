/*
  Warnings:

  - Added the required column `transaction` to the `Imovel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Imovel" ADD COLUMN     "transaction" BOOLEAN NOT NULL;
