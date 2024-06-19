import { Module } from '@nestjs/common';
import { PrismaService } from './../../../prisma/prisma.service';
import { LOCATARIO_REPOSITORIO } from './../../comum/constantes/constantes';
import { LocatarioController } from './controlador/locatario.controller';
import { LocatarioRepositorio } from './repositorio/locatario.repositorio';
import { LocatarioService } from './servico/locatario.service';

@Module({
  controllers: [LocatarioController],
  providers: [
    LocatarioService,
    LocatarioRepositorio,
    PrismaService,
    { provide: LOCATARIO_REPOSITORIO, useClass: LocatarioRepositorio },
  ],
})
export class LocatarioModule {}
