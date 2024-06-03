/*
  Warnings:

  - Added the required column `nome` to the `Autor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Autor" ADD COLUMN     "nome" VARCHAR NOT NULL;
