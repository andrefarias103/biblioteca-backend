import { Inject, Injectable } from '@nestjs/common';
import { LOCATARIO_REPOSITORIO } from '../../../comum/constantes/constantes';
import { AtualizaLocatarioDto } from '../dto/atualiza-locatario.dto';
import { CadastraLocatarioDto } from '../dto/cadastra-locatario.dto';
import { ListaLocatarioDto } from '../dto/lista-locatario.dto';
import { ILocatarioRepositorio } from '../interface/locatario-repositorio.interface';

@Injectable()
export class LocatarioService {
  constructor(@Inject(LOCATARIO_REPOSITORIO) private readonly locatarioRepositorio: ILocatarioRepositorio) {}

  async cadastrar(dadosLocatario: CadastraLocatarioDto): Promise<ListaLocatarioDto> {
    const locatario = await this.locatarioRepositorio.cadastrar(dadosLocatario);
    return locatario;
  }

  findAll() {
    return `This action returns all locatario`;
  }

  findOne(id: string) {
    return `This action returns a #${id} locatario`;
  }

  async atualizar(id: string, dadosLocatario: AtualizaLocatarioDto) {
    return await this.locatarioRepositorio.atualizar(id, dadosLocatario);
  }

  async remover(id: string) {
    return await this.locatarioRepositorio.remover(id);
  }

  async buscaPorId(id: string): Promise<ListaLocatarioDto> {
    return this.locatarioRepositorio.buscaPorId(id);
  }

  async buscaAutorPorNome(nome: string): Promise<ListaLocatarioDto> {
    const autor = await this.locatarioRepositorio.buscaPorNome(nome);
    return autor;
  }
}
