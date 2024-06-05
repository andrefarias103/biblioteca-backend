/*
  Warnings:

  - You are about to drop the column `livroId` on the `Autor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Autor" DROP CONSTRAINT "Autor_livroId_fkey";

-- DropIndex
DROP INDEX "Autor_livroId_key";

-- AlterTable
ALTER TABLE "Autor" DROP COLUMN "livroId";

-- CreateTable
CREATE TABLE "AutorPorLivros" (
    "autorId" VARCHAR NOT NULL,
    "livroId" VARCHAR NOT NULL,

    CONSTRAINT "AutorPorLivros_pkey" PRIMARY KEY ("autorId","livroId")
);

-- AddForeignKey
ALTER TABLE "AutorPorLivros" ADD CONSTRAINT "AutorPorLivros_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutorPorLivros" ADD CONSTRAINT "AutorPorLivros_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
