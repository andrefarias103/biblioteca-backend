import { Module } from '@nestjs/common';
import { AluguelService } from './aluguel.service';
import { AluguelController } from './aluguel.controller';

@Module({
  controllers: [AluguelController],
  providers: [AluguelService],
})
export class AluguelModule {}
