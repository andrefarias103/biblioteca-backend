export class ListaLivroDto {
    id: string;
    nome: string;
    isbn: string;
    dataDePublicacao: string;
    // autorPorLivros: string[];
    autorPorLivros: { 
        autorId: string;
        livroId: string;
        autor: {
                id: string;
                nome: string;
        }
    }[];
    aluguelId?: string;
}