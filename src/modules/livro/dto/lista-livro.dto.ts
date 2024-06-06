import { Aluguel } from "@prisma/client";

export class ListaLivroDto {
    id: string;
    nome: string;
    isbn: string;
    dataDePublicacao: string;
    autorPorLivros: string[];
    aluguel?: Aluguel;
    aluguelId?: string;
}