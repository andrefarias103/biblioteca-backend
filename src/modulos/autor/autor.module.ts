import { Module } from '@nestjs/common';
import { PrismaService } from './../../../prisma/prisma.service';
import { AUTOR_REPOSITORIO } from './../../comum/constantes/constantes';
import { AutorController } from './controlador/autor.controller';
import { AutorRepositorio } from './repositorio/autor.repositorio';
import { AutorService } from './servico/autor.service';

@Module({
  controllers: [AutorController],
  providers: [
    AutorService,
    AutorRepositorio,
    PrismaService,
    { provide: AUTOR_REPOSITORIO, useClass: AutorRepositorio },
  ],
})
export class AutorModule {}
