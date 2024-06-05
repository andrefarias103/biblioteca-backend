import { CadastraAutorPorLivroDto } from "../dto/cadastra-autorPorLivro.dto";
import { ListaAutorPorLivroDto } from "../dto/lista-autorPorLivro.dto";

export interface IAutorPorLivroRepositorio {
    cadastrar(data: CadastraAutorPorLivroDto): Promise<ListaAutorPorLivroDto>;
  }