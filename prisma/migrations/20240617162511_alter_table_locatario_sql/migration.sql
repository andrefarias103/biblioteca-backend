/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Locatario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Locatario_nome_key" ON "Locatario"("nome");
