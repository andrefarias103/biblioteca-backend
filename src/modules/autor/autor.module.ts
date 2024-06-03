import { Module } from '@nestjs/common';
import { PrismaService } from "./../../../prisma/prisma.service";
import { AUTOR_REPOSITORIO } from './constantes';
import { AutorController } from './controladores/autor.controller';
import { AutorRepositorio } from './repositorios/autor.repositorio';
import { AutorService } from './servicos/autor.service';

@Module({
  controllers: [AutorController],
  providers: [
    AutorService, 
    AutorRepositorio, 
    PrismaService, 
    { provide: AUTOR_REPOSITORIO, 
      useClass: AutorRepositorio  }
  ],
})
export class AutorModule {}
