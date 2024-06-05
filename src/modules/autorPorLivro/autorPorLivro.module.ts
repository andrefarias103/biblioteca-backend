import { Module } from '@nestjs/common';
import { PrismaService } from "../../../prisma/prisma.service";
import { AUTORPORLIVRO_REPOSITORIO } from './../../common/constantes/constantes';
import { AutorPorLivroController } from './controladores/autorPorLivro.controller';
import { AutorPorLivroRepositorio } from './repositorios/autorPorLivro.repositorio';
import { AutorPorLivroService } from './servicos/autorPorLivro.service';


@Module({
  controllers: [AutorPorLivroController],
  providers: [
    AutorPorLivroService, 
    AutorPorLivroRepositorio, 
    PrismaService, 
    { provide: AUTORPORLIVRO_REPOSITORIO, 
      useClass: AutorPorLivroRepositorio  }
  ],
})
export class AutorPorLivroModule {}
