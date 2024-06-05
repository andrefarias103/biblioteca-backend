import { Aluguel } from "@prisma/client";

export class ListaLivroDto {
    id: string;
    nome: string;
    isbn: string;
    dataDePublicacao: Date;
    autor: string[];
    autorId: string;
    aluguel?: Aluguel;
    aluguelId?: string;
}