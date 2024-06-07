import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AtualizaLivroDto } from 'src/modulos/livro/dto/atualiza-livro.dto';
import { ILivroRepositorio } from '../../../modulos/livro/interface/livro-repositorio.interface';
import { CadastraAluguelDto } from '../dto/cadastra-aluguel.dto';
import { ListaAluguelDto } from '../dto/lista-aluguel.dto';
import { IAluguelRepositorio } from '../interface/aluguel-repositorio.interface';
import { ALUGUEL_REPOSITORIO, LIVRO_REPOSITORIO } from './../../../comum/constantes/constantes';

@Injectable()
export class AluguelService {
  constructor(@Inject(ALUGUEL_REPOSITORIO) private readonly aluguelRepositorio: IAluguelRepositorio,
              @Inject(LIVRO_REPOSITORIO) private readonly livroRepositorio: ILivroRepositorio) {}

              
  ////////////////////////////////////////
  private validacaoDataReserva(dataRetirada: string, dataDevolucao: string): string {
    if (new Date(dataRetirada) >= new Date(dataDevolucao)) {
      return ('Data/hora de retirada não pode ser maior que a data/hora de devolução');
    }
    if (new Date(dataRetirada) <= new Date(Date.now()) ) {
      return ('Data/hora de retirada não pode ser menor que a data/hora atual');
    }
    return '';
  }      

  ////////////////////////////////////////       
  async cadastrar(dadosAluguel: CadastraAluguelDto): Promise<ListaAluguelDto> {
  
    const { livro, dataRetirada, dataDevolucao } = dadosAluguel;

    const msg_retorno = this.validacaoDataReserva(dataRetirada, dataDevolucao);
    if (msg_retorno) {
      throw new Error(msg_retorno);
    }

    const aluguel = await this.aluguelRepositorio.cadastrar(dadosAluguel);
    
    livro.map( async (unidade) => {

      const livroDesejado = await this.livroRepositorio.buscaPorId(unidade); 
    
      const livroAtualizado: AtualizaLivroDto = { ...livroDesejado, aluguelId: aluguel.id};

      await this.livroRepositorio.atualizar(unidade, livroAtualizado );

    })

    return plainToInstance(ListaAluguelDto, aluguel);
  }

  ////////////////////////////////////////       
  async remover(id: string) {
    return await this.aluguelRepositorio.remover(id);
  }
}
