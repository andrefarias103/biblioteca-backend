import { Inject, Injectable } from '@nestjs/common';
import { Autor } from '../autor.entity';
import { AUTOR_REPOSITORIO } from '../constantes';
import { AtualizaAutorDto } from '../dto/atualiza-autor.dto';
import { CriaAutorDto } from '../dto/cria-autor.dto';
import { IAutorRepositorio } from '../interfaces/autor-repositorio.interface';

@Injectable()
export class AutorService {

  constructor(@Inject(AUTOR_REPOSITORIO) private readonly autorRepositorio: IAutorRepositorio) {}

  async cadastrar(dadosAutor: CriaAutorDto):Promise<CriaAutorDto> {
    return await this.autorRepositorio.cadastrar(dadosAutor);
  }

  findAll() {
    return `This action returns all autor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autor`;
  }

  async atualizar(id: string, dadosAutor: AtualizaAutorDto) {
    return await this.autorRepositorio.atualizar(id, dadosAutor);
  }

  async remover(id: string) {
    return await this.autorRepositorio.remover(id);
  }


  async buscaAutorPorNome(nome: string): Promise<Autor> {
    const autor = await this.autorRepositorio.buscaPorCondicao(nome);
    return autor;
  }
}
