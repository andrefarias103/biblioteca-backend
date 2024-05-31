-- CreateTable
CREATE TABLE "Locatario" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR NOT NULL,
    "sexo" BOOLEAN NOT NULL,
    "telefone" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "dataDeNascimento" DATE NOT NULL,
    "cpf" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Locatario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluguel" (
    "id" TEXT NOT NULL,
    "dataRetirada" TIMESTAMP NOT NULL,
    "dataDevolucao" TIMESTAMP NOT NULL,
    "locatarioId" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluguel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autor" (
    "id" TEXT NOT NULL,
    "sexo" BOOLEAN NOT NULL,
    "anoDeNascimento" INTEGER NOT NULL,
    "cpf" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livro" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR NOT NULL,
    "isbn" TEXT NOT NULL,
    "dataDePublicacao" DATE NOT NULL,
    "aluguelId" VARCHAR,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutorPorLivros" (
    "autorId" VARCHAR NOT NULL,
    "livroId" VARCHAR NOT NULL,

    CONSTRAINT "AutorPorLivros_pkey" PRIMARY KEY ("autorId","livroId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Locatario_email_key" ON "Locatario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Locatario_cpf_key" ON "Locatario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Autor_cpf_key" ON "Autor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Livro_isbn_key" ON "Livro"("isbn");

-- AddForeignKey
ALTER TABLE "Aluguel" ADD CONSTRAINT "Aluguel_locatarioId_fkey" FOREIGN KEY ("locatarioId") REFERENCES "Locatario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_aluguelId_fkey" FOREIGN KEY ("aluguelId") REFERENCES "Aluguel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutorPorLivros" ADD CONSTRAINT "AutorPorLivros_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutorPorLivros" ADD CONSTRAINT "AutorPorLivros_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
