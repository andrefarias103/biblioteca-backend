import { Test, TestingModule } from "@nestjs/testing";
import { v4 as uuidv4 } from 'uuid';
import { AutorRepositorio } from "../../../modulos/autor/repositorio/autor.repositorio";
import { AutorPorLivroRepositorio } from "../../../modulos/autorPorLivro/repositorio/autorPorLivro.repositorio";
import { LivroController } from "../controlador/livro.controller";
import { CadastraLivroDto } from "../dto/cadastra-livro.dto";
import { LivroRepositorio } from "../repositorio/livro.repositorio";
import { LivroService } from "../servico/livro.service";
import { PrismaService } from "./../../../../prisma/prisma.service";
import { AUTORPORLIVRO_REPOSITORIO, AUTOR_REPOSITORIO, LIVRO_REPOSITORIO } from './../../../comum/constantes/constantes';

describe('LivroService', () => {

    let livroService: LivroService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [LivroController],
            providers: [LivroService,  LivroRepositorio, PrismaService,   
                   { provide: LIVRO_REPOSITORIO,  useClass: LivroRepositorio  },
                   { provide: AUTOR_REPOSITORIO,  useClass: AutorRepositorio  },
                   { provide: AUTORPORLIVRO_REPOSITORIO,  useClass: AutorPorLivroRepositorio },]  
          }).compile();

        livroService = module.get<LivroService>(LivroService);
    } );

    describe(' - Cadastro', () => {
        it('Deve cadastrar um novo livro', async () => {
            const mockLivroDto: CadastraLivroDto = {
                nome: "Cristiano Ramos",
                isbn: "Masculino",
                dataDePublicacao: "2000-12-05",
                autorPorLivros: uuidv4(),
            };
            const resultado = { id: uuidv4(), ...mockLivroDto };
    
            jest.spyOn(livroService, 'cadastrar').mockResolvedValue(resultado);
    
            expect(await livroService.cadastrar(mockLivroDto)).toEqual(resultado);
    
            expect(livroService.cadastrar).toHaveBeenCalled();
        });
    
        it('Deve ocorrer erros durante o cadastro do livro', async () => {
            const mockLivroDto: CadastraLivroDto = {
                nome: "Cristiano Ramos",
                isbn: "Masculino",
                dataDePublicacao: "2000-12-05",
                autorPorLivros: uuidv4(),
            };
            const error = new Error('Database error');
    
            jest.spyOn(livroService, 'cadastrar').mockRejectedValue(error);
    
            await expect(livroService.cadastrar(mockLivroDto)).rejects.toThrow(error);
    
        });
      });

      describe(' - Atualização', () => {
        it('Deve atualizar os dados de um livro existente', async () => {
            const id: string = uuidv4();
            const mockLivroDto: CadastraLivroDto = {
                nome: "Cristiano Ramos",
                isbn: "Masculino",
                dataDePublicacao: "2000-12-05",
                autorPorLivros: uuidv4(),
            };
            const resultado = { id, ...mockLivroDto };
    
            jest.spyOn(livroService, 'atualizar').mockResolvedValue(resultado);
    
            expect(await livroService.atualizar(id, mockLivroDto)).toEqual(resultado);
    
            expect(livroService.atualizar).toHaveBeenCalled();
        });
    
        it('Deve ocorrer erros durante a atualização dos dados do autor', async () => {
            const id: string = uuidv4();
            const mockLivroDto: CadastraLivroDto = {
                nome: "Cristiano Ramos",
                isbn: "Masculino",
                dataDePublicacao: "2000-12-05",
                autorPorLivros: uuidv4(),
            };
            const error = new Error('Database error');
    
            jest.spyOn(livroService, 'atualizar').mockRejectedValue(error);
    
            await expect(livroService.atualizar(id, mockLivroDto)).rejects.toThrow(error);
    
        });
      });  
    
      describe(' - Exclusão', () => {
        it('Deve apagar os registros de um livro existente', async () => {
            const id: string = uuidv4();
            const mockLivroDto: CadastraLivroDto = {
                nome: "Cristiano Ramos",
                isbn: "Masculino",
                dataDePublicacao: "2000-12-05",
                autorPorLivros: uuidv4(),
            };
            const resultado = { id, ...mockLivroDto };
    
            jest.spyOn(livroService, 'remover').mockResolvedValue(resultado);
    
            expect(await livroService.remover(id)).toEqual(resultado);
    
            expect(livroService.remover).toHaveBeenCalled();
        });
    
        it('Deve ocorrer erro ao apagar um livro existente', async () => {
            const id: string = uuidv4();
            const mockLivroDto: CadastraLivroDto = {
                nome: "Cristiano Ramos",
                isbn: "Masculino",
                dataDePublicacao: "2000-12-05",
                autorPorLivros: uuidv4(),
            };
            const error = new Error('Database error');
    
            jest.spyOn(livroService, 'remover').mockRejectedValue(error);
    
            await expect(livroService.remover(id)).rejects.toThrow(error);
    
        });
      });    
      
});