import { Module } from '@nestjs/common';
import {
  ALUGUEL_REPOSITORIO,
  LIVRO_REPOSITORIO,
} from 'src/comum/constantes/constantes';
import { LivroRepositorio } from '../livro/repositorio/livro.repositorio';
import { PrismaService } from './../../../prisma/prisma.service';
import { AluguelController } from './controlador/aluguel.controller';
import { AluguelRepositorio } from './repositorio/aluguel.repositorio';
import { AluguelService } from './servico/aluguel.service';

@Module({
  controllers: [AluguelController],
  providers: [
    AluguelService,
    AluguelRepositorio,
    PrismaService,
    {
      provide: LIVRO_REPOSITORIO,
      useClass: LivroRepositorio,
    },
    {
      provide: ALUGUEL_REPOSITORIO,
      useClass: AluguelRepositorio,
    },
  ],
})
export class AluguelModule {}
