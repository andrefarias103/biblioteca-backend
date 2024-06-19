import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import {
    ALUGUEL_REPOSITORIO,
    LIVRO_REPOSITORIO,
} from '../../../comum/constantes/constantes';
import { LivroRepositorio } from '../../../modulos/livro/repositorio/livro.repositorio';
import { AluguelController } from '../controlador/aluguel.controller';
import { CadastraAluguelDto } from '../dto/cadastra-aluguel.dto';
import { AluguelRepositorio } from '../repositorio/aluguel.repositorio';
import { AluguelService } from '../servico/aluguel.service';
import { PrismaService } from './../../../../prisma/prisma.service';

describe('AluguelService', () => {
  let aluguelService: AluguelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AluguelController],
      providers: [
        AluguelService,
        AluguelRepositorio,
        PrismaService,
        {
          provide: LIVRO_REPOSITORIO,
          useClass: LivroRepositorio,
        },
        {
          provide: ALUGUEL_REPOSITORIO,
          useClass: AluguelRepositorio,
        },
      ],
    }).compile();

    aluguelService = module.get<AluguelService>(AluguelService);
  });

  describe(' - Cadastro', () => {
    it('Deve realizar um reserva de livro com sucesso', async () => {
      const mockAluguelDto: CadastraAluguelDto = {
        dataRetirada: '2024-06-06 18:00:00',
        dataDevolucao: '2024-06-16 18:00:00',
        locatarioId: uuidv4(),
        livro: ['2cd4a57a-db26-4641-92c5-89163162a991'],
      };
      const resultado = { id: uuidv4(), ...mockAluguelDto };

      jest.spyOn(aluguelService, 'cadastrar').mockResolvedValue(resultado);

      expect(await aluguelService.cadastrar(mockAluguelDto)).toEqual(resultado);

      expect(aluguelService.cadastrar).toHaveBeenCalled();
    });

    it('Deve ocorrer erros durante a reserva do livro', async () => {
      const mockAluguelDto: CadastraAluguelDto = {
        dataRetirada: '2024-06-06 18:00:00',
        dataDevolucao: '2024-06-16 18:00:00',
        locatarioId: uuidv4(),
        livro: ['2cd4a57a-db26-4641-92c5-89163162a991'],
      };
      const error = new Error('Database error');

      jest.spyOn(aluguelService, 'cadastrar').mockRejectedValue(error);

      await expect(aluguelService.cadastrar(mockAluguelDto)).rejects.toThrow(
        error,
      );
    });
  });

  describe(' - Exclusão', () => {
    it('Deve desfazer uma reserva de livro com sucesso', async () => {
      const id: string = uuidv4();
      const mockAluguelDto: CadastraAluguelDto = {
        dataRetirada: '2024-06-06 18:00:00',
        dataDevolucao: '2024-06-16 18:00:00',
        locatarioId: uuidv4(),
        livro: ['2cd4a57a-db26-4641-92c5-89163162a991'],
      };
      const resultado = { id, ...mockAluguelDto };

      jest.spyOn(aluguelService, 'remover').mockResolvedValue(resultado);

      expect(await aluguelService.remover(id)).toEqual(resultado);

      expect(aluguelService.remover).toHaveBeenCalled();
    });

    it('Deve ocorrer erros ao fazer desfazer a reserva do livro', async () => {
      const id: string = uuidv4();
      const mockAluguelDto: CadastraAluguelDto = {
        dataRetirada: '2024-06-06 18:00:00',
        dataDevolucao: '2024-06-16 18:00:00',
        locatarioId: uuidv4(),
        livro: ['2cd4a57a-db26-4641-92c5-89163162a991'],
      };
      const error = new Error('Database error');

      jest.spyOn(aluguelService, 'remover').mockRejectedValue(error);

      await expect(aluguelService.remover(id)).rejects.toThrow(error);
    });
  });
});
