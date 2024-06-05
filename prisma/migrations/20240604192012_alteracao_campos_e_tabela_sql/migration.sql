/*
  Warnings:

  - You are about to drop the column `autorId` on the `Livro` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Autor" ALTER COLUMN "sexo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Livro" DROP COLUMN "autorId";

-- AlterTable
ALTER TABLE "Locatario" ALTER COLUMN "sexo" DROP NOT NULL;
