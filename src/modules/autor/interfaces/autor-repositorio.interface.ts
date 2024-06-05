import { AtualizaAutorDto } from "../dto/atualiza-autor.dto";
import { CadastraAutorDto } from "../dto/cadastra-autor.dto";
import { ListaAutorDto } from "../dto/lista-autor.dto";

export interface IAutorRepositorio {
    cadastrar(data: CadastraAutorDto): Promise<ListaAutorDto>;
    atualizar(id: string, data: AtualizaAutorDto): Promise<ListaAutorDto>;
    remover(id: string);
    buscaPorNome(nome: string): Promise<ListaAutorDto | null>;
    listarTodos(): Promise<ListaAutorDto[]> | null;
    // Outros métodos...
  }