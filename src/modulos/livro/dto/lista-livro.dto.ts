export class ListaLivroDto {
    id: string;
    nome: string;
    isbn: string;
    dataDePublicacao: string;
    autorPorLivros: string[];
    aluguelId?: string;
}