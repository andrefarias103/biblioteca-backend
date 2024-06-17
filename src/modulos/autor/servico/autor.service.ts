import { Inject, Injectable } from '@nestjs/common';
import { AtualizaAutorDto } from '../dto/atualiza-autor.dto';
import { CadastraAutorDto } from '../dto/cadastra-autor.dto';
import { ListaAutorDto } from '../dto/lista-autor.dto';
import { IAutorRepositorio } from '../interface/autor-repositorio.interface';
import { AUTOR_REPOSITORIO } from './../../../comum/constantes/constantes';

@Injectable()
export class AutorService {
  constructor(@Inject(AUTOR_REPOSITORIO) private readonly autorRepositorio: IAutorRepositorio) {}

  async cadastrar(dadosAutor: CadastraAutorDto):Promise<ListaAutorDto> {
    return await this.autorRepositorio.cadastrar(dadosAutor);
  }

  async listarTodos(): Promise<ListaAutorDto[]> {
    return this.autorRepositorio.listarTodos();
  }

  async buscaPorId(id: string): Promise<ListaAutorDto> {
    return this.autorRepositorio.buscaPorId(id);
  }

  async atualizar(id: string, dadosAutor: AtualizaAutorDto) {
    return await this.autorRepositorio.atualizar(id, dadosAutor);
  }

  async remover(id: string) {
    return await this.autorRepositorio.remover(id);
  }

  async buscaAutorPorNome(nome: string): Promise<ListaAutorDto> {
    const autor = await this.autorRepositorio.buscaPorNome(nome);
    return autor;
  }

}
