import { Module } from '@nestjs/common';
import { LocatarioService } from './locatario.service';
import { LocatarioController } from './locatario.controller';

@Module({
  controllers: [LocatarioController],
  providers: [LocatarioService],
})
export class LocatarioModule {}
