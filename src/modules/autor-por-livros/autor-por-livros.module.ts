import { Module } from '@nestjs/common';
import { AutorPorLivrosService } from './autor-por-livros.service';
import { AutorPorLivrosController } from './autor-por-livros.controller';

@Module({
  controllers: [AutorPorLivrosController],
  providers: [AutorPorLivrosService],
})
export class AutorPorLivrosModule {}
