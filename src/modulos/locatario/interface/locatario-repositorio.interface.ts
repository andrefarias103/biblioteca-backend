import { AtualizaLocatarioDto } from '../dto/atualiza-locatario.dto';
import { CadastraLocatarioDto } from '../dto/cadastra-locatario.dto';
import { ListaLocatarioDto } from '../dto/lista-locatario.dto';

export interface ILocatarioRepositorio {
  cadastrar(data: CadastraLocatarioDto): Promise<ListaLocatarioDto>;
  atualizar(id: string, data: AtualizaLocatarioDto): Promise<ListaLocatarioDto>;
  remover(id: string);
  buscaPorId(id: string): Promise<ListaLocatarioDto | null>;
  buscaPorNome(nome: string): Promise<ListaLocatarioDto[] | null>;
}
