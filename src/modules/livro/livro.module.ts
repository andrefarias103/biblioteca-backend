import { Module } from '@nestjs/common';
import { AutorPorLivroRepositorio } from '../autorPorLivro/repositorios/autorPorLivro.repositorio';
import { PrismaService } from "./../../../prisma/prisma.service";
import { AUTORPORLIVRO_REPOSITORIO, LIVRO_REPOSITORIO } from './../../common/constantes/constantes';
import { LivroController } from './controladores/livro.controller';
import { LivroRepositorio } from './repositorios/livro.repositorio';
import { LivroService } from './servicos/livro.service';

@Module({
  controllers: [LivroController],
  providers: [
    LivroService, 
    LivroRepositorio, 
    PrismaService, 
    { provide: LIVRO_REPOSITORIO, 
      useClass: LivroRepositorio  },
      { provide: AUTORPORLIVRO_REPOSITORIO, 
        useClass: AutorPorLivroRepositorio  }
  ],
})
export class LivroModule {}
