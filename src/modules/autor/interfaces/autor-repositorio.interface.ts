import { Autor } from "../autor.entity";
import { AtualizaAutorDto } from "../dto/atualiza-autor.dto";
import { CriaAutorDto } from "../dto/cria-autor.dto";

export interface IAutorRepositorio {
    cadastrar(data: CriaAutorDto): Promise<Autor>;
    atualizar(id: string, data: AtualizaAutorDto): Promise<Autor>;
    remover(id: string);
    buscaPorCondicao(nome: string): Promise<Autor | null>;
    // Outros métodos...
  }