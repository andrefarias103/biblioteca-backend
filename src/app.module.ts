import { Module } from '@nestjs/common';
import { AluguelModule } from './modulos/aluguel/aluguel.module';
import { AutorModule } from './modulos/autor/autor.module';
import { LivroModule } from './modulos/livro/livro.module';
import { LocatarioModule } from './modulos/locatario/locatario.module';

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
