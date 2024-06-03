import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
