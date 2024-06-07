import { Module } from '@nestjs/common';
import { AutorRepositorio } from '../autor/repositorio/autor.repositorio';
import { AutorPorLivroRepositorio } from '../autorPorLivro/repositorio/autorPorLivro.repositorio';
import { PrismaService } from "./../../../prisma/prisma.service";
import { AUTORPORLIVRO_REPOSITORIO, AUTOR_REPOSITORIO, LIVRO_REPOSITORIO } from './../../comum/constantes/constantes';
import { LivroController } from './controlador/livro.controller';
import { LivroRepositorio } from './repositorio/livro.repositorio';
import { LivroService } from './servico/livro.service';

@Module({
  controllers: [LivroController],
  providers: [
    LivroService, 
    LivroRepositorio, 
    PrismaService, 
    { provide: LIVRO_REPOSITORIO, 
      useClass: LivroRepositorio  },
      { provide: AUTOR_REPOSITORIO, 
        useClass: AutorRepositorio  },
        { provide: AUTORPORLIVRO_REPOSITORIO, 
          useClass: AutorPorLivroRepositorio  },        
  ],
})
export class LivroModule {}
