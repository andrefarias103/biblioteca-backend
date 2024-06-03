/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Autor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Autor_nome_key" ON "Autor"("nome");
