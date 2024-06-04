import { Module } from '@nestjs/common';
import { AluguelModule } from './modules/aluguel/aluguel.module';
import { AutorPorLivrosModule } from './modules/autor-por-livros/autor-por-livros.module';
import { AutorModule } from './modules/autor/autor.module';
import { LivroModule } from './modules/livro/livro.module';
import { LocatarioModule } from './modules/locatario/locatario.module';

@Module({
  imports: [
    LocatarioModule,
    AluguelModule,
    AutorModule,
    LivroModule,
    AutorPorLivrosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
