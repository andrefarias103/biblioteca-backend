/*
  Warnings:

  - You are about to drop the `AutorPorLivros` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[livroId]` on the table `Autor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `autorId` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AutorPorLivros" DROP CONSTRAINT "AutorPorLivros_autorId_fkey";

-- DropForeignKey
ALTER TABLE "AutorPorLivros" DROP CONSTRAINT "AutorPorLivros_livroId_fkey";

-- AlterTable
ALTER TABLE "Autor" ADD COLUMN     "livroId" VARCHAR;

-- AlterTable
ALTER TABLE "Livro" ADD COLUMN     "autorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AutorPorLivros";

-- CreateIndex
CREATE UNIQUE INDEX "Autor_livroId_key" ON "Autor"("livroId");

-- AddForeignKey
ALTER TABLE "Autor" ADD CONSTRAINT "Autor_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE SET NULL ON UPDATE CASCADE;
