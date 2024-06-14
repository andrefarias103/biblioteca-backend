/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Livro` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Livro_nome_key" ON "Livro"("nome");
