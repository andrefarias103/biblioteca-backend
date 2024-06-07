import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../../../prisma/prisma.service";
import { CadastraAluguelDto } from '../dto/cadastra-aluguel.dto';
import { ListaAluguelDto } from '../dto/lista-aluguel.dto';
import { IAluguelRepositorio } from '../interface/aluguel-repositorio.interface';


@Injectable()
export class AluguelRepositorio implements IAluguelRepositorio {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastraAluguelDto): Promise<ListaAluguelDto> {
    const aluguel = await this.prisma.aluguel.create( { data: {
                                                                dataRetirada: data.dataRetirada,
                                                                dataDevolucao: data.dataDevolucao,
                                                                locatarioId: data.locatarioId
                                                              } 
                                                    } );
    return aluguel;                                      
  }

  
  async remover(id: string) {
    return await this.prisma.aluguel.delete({ where: { id } });
  }

}
