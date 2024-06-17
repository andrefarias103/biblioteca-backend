import { AtualizaLivroDto } from "../dto/atualiza-livro.dto";
import { CadastraLivroDto } from "../dto/cadastra-livro.dto";
import { ListaLivroDto } from "../dto/lista-livro.dto";

export interface ILivroRepositorio {
    cadastrar(data: CadastraLivroDto): Promise<ListaLivroDto>;
    atualizar(id: string, data: AtualizaLivroDto): Promise<ListaLivroDto>;
    remover(id: string);
    buscaPorId(id: string): Promise<ListaLivroDto | null>;
    buscaPorNome(nome: string): Promise<ListaLivroDto | null>;
    listarTodos(): Promise<ListaLivroDto[]> | null;
    ObtemlistarPorId(listaId: string[]): Promise<ListaLivroDto[] | null>;
    ObtemlistaReservados(): Promise<ListaLivroDto[] | null> 
    ObtemlistaDisponiveis(): Promise<ListaLivroDto[] | null> 
}