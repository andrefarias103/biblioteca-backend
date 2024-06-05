import { Module } from '@nestjs/common';
import { AluguelModule } from './modules/aluguel/aluguel.module';
import { AutorModule } from './modules/autor/autor.module';
import { LivroModule } from './modules/livro/livro.module';
import { LocatarioModule } from './modules/locatario/locatario.module';

@Module({
  imports: [
    LocatarioModule,
    AluguelModule,
    AutorModule,
    LivroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
