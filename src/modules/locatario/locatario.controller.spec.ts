import { Test, TestingModule } from '@nestjs/testing';
import { LocatarioController } from './locatario.controller';
import { LocatarioService } from './locatario.service';

describe('LocatarioController', () => {
  let controller: LocatarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocatarioController],
      providers: [LocatarioService],
    }).compile();

    controller = module.get<LocatarioController>(LocatarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
