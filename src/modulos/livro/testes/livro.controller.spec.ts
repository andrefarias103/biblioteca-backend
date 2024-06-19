import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AutorRepositorio } from '../../../modulos/autor/repositorio/autor.repositorio';
import { AutorPorLivroRepositorio } from '../../../modulos/autorPorLivro/repositorio/autorPorLivro.repositorio';
import { LivroController } from '../controlador/livro.controller';
import { AtualizaLivroDto } from '../dto/atualiza-livro.dto';
import { CadastraLivroDto } from '../dto/cadastra-livro.dto';
import { ListaLivroDto } from '../dto/lista-livro.dto';
import { LivroRepositorio } from '../repositorio/livro.repositorio';
import { LivroService } from '../servico/livro.service';
import {
    AUTORPORLIVRO_REPOSITORIO,
    AUTOR_REPOSITORIO,
    LIVRO_REPOSITORIO,
} from './../../../comum/constantes/constantes';

describe('LivroController', () => {
  let livroController: LivroController;
  let livroService: LivroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [LivroController],
      providers: [
        LivroService,
        LivroRepositorio,
        PrismaService,
        { provide: LIVRO_REPOSITORIO, useClass: LivroRepositorio },
        { provide: AUTOR_REPOSITORIO, useClass: AutorRepositorio },
        {
          provide: AUTORPORLIVRO_REPOSITORIO,
          useClass: AutorPorLivroRepositorio,
        },
      ],
    }).compile();

    livroController = module.get<LivroController>(LivroController);
    livroService = module.get<LivroService>(LivroService);
  });

  it('deve ser definido', () => {
    expect(livroController).toBeDefined();
  });

  describe(' - Cadastro', () => {
    it('Deve cadastrar um novo livro com sucesso', async () => {
      const mockLivroDto: CadastraLivroDto = {
        nome: 'Cristiano Ramos',
        isbn: 'Masculino',
        dataDePublicacao: '2000-12-05',
        autorPorLivros: [uuidv4()],
      };
      const mockLivroResposta: ListaLivroDto = {
        id: uuidv4(),
        nome: 'Cristiano Ramos',
        isbn: 'Masculino',
        dataDePublicacao: '2000-12-05',
        autorPorLivros: [
          {
            autorId: uuidv4(),
            livroId: uuidv4(),
            autor: {
              id: uuidv4(),
              nome: 'Casemiro de Abreu',
            },
          },
        ],
      };

      jest
        .spyOn(livroService, 'cadastrar')
        .mockResolvedValue(mockLivroResposta);

      expect(await livroController.cadastrar(mockLivroDto)).toEqual(
        mockLivroResposta,
      );
    });

    it('Deve ocorrer erros durante o cadastro do livro', async () => {
      const mockLivroDto: CadastraLivroDto = {
        nome: 'Cristiano Ramos',
        isbn: 'Masculino',
        dataDePublicacao: '2000-12-05',
        autorPorLivros: uuidv4(),
      };
      const error = new Error('Database error');

      jest.spyOn(livroService, 'cadastrar').mockRejectedValue(error);

      await expect(livroController.cadastrar(mockLivroDto)).rejects.toThrow(
        error,
      );
    });
  });

  describe(' - Atualização', () => {
    it('Deve atualizar os dados de um livro existente', async () => {
      const id: string = uuidv4();
      const mockLivroDto: AtualizaLivroDto = {
        nome: 'O Continente',
        isbn: '999-454-1545',
        dataDePublicacao: '2000-12-05',
        autorPorLivros: [
          {
            autorId: '1',
            livroId: '123',
            autor: {
              id: '1',
              nome: 'Manuel Bandeira',
            },
          },
        ],
      };

      const resultado = { id: uuidv4(), ...mockLivroDto };

      jest.spyOn(livroService, 'atualizar').mockResolvedValue(resultado);

      expect(await livroController.atualizar(id, mockLivroDto)).toEqual(
        resultado,
      );
    });

    it('Deve ocorrer erros durante a atualização dos dados do livro', async () => {
      const id: string = uuidv4();
      const mockLivroDto: AtualizaLivroDto = {
        nome: 'Cristiano Ramos',
        isbn: 'Masculino',
        dataDePublicacao: '2000-12-05',
        autorPorLivros: [
          {
            autorId: '1',
            livroId: '123',
            autor: {
              id: '1',
              nome: 'Manuel Bandeira',
            },
          },
        ],
      };
      const error = new Error('Database error');

      jest.spyOn(livroService, 'atualizar').mockRejectedValue(error);

      await expect(livroController.atualizar(id, mockLivroDto)).rejects.toThrow(
        error,
      );
    });
  });

  describe(' - Exclusão', () => {
    it('Deve apagar os registros de um livro existente', async () => {
      const id: string = uuidv4();
      const mockLivroDto: CadastraLivroDto = {
        nome: 'Cristiano Ramos',
        isbn: 'Masculino',
        dataDePublicacao: '2000-12-05',
        autorPorLivros: uuidv4(),
      };

      const resultado = { id: uuidv4(), ...mockLivroDto };

      jest.spyOn(livroService, 'remover').mockResolvedValue(resultado);

      expect(await livroController.remover(id)).toEqual(resultado);
    });

    it('Deve ocorrer erro ao apagar um livro existente', async () => {
      const id: string = uuidv4();
      const mockLivroDto: CadastraLivroDto = {
        nome: 'Cristiano Ramos',
        isbn: 'Masculino',
        dataDePublicacao: '2000-12-05',
        autorPorLivros: uuidv4(),
      };
      const error = new Error('Database error');

      jest.spyOn(livroService, 'remover').mockRejectedValue(error);

      await expect(livroController.remover(id)).rejects.toThrow(error);
    });
  });
});
