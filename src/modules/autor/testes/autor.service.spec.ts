import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { AutorController } from '../controladores/autor.controller';
import { CadastraAutorDto } from '../dto/cadastra-autor.dto';
import { AutorRepositorio } from '../repositorios/autor.repositorio';
import { AutorService } from '../servicos/autor.service';
import { PrismaService } from "./../../../../prisma/prisma.service";
import { AUTOR_REPOSITORIO } from './../../../common/constantes/constantes';

describe('AutorService', () => {

  let autorService: AutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [],
        controllers: [AutorController],
        providers: [AutorService,  AutorRepositorio, PrismaService,   
                      { 
                          provide: AUTOR_REPOSITORIO, 
                          useClass: AutorRepositorio  
                      } ],
      }).compile();

    autorService = module.get<AutorService>(AutorService);
  });

  describe(' - Cadastro', () => {
    it('Deve cadastrar um novo autor', async () => {
        const mockAutorDto: CadastraAutorDto = {
            nome: "Cristiano Ramos",
            sexo: "Masculino",
            anoDeNascimento: 2000,
            cpf: "547.027.780-13"
        };
        const resultado = { id: uuidv4(), ...mockAutorDto };

        jest.spyOn(autorService, 'cadastrar').mockResolvedValue(resultado);

        expect(await autorService.cadastrar(mockAutorDto)).toEqual(resultado);

        expect(autorService.cadastrar).toHaveBeenCalled();
    });

    it('Deve ocorrer erros durante o cadastro do autor', async () => {
        const mockAutorDto: CadastraAutorDto = {
            nome: "Cristiano Ramos",
            sexo: "Masculino",
            anoDeNascimento: 2000,
            cpf: "547.027.780-13"
        };
        const error = new Error('Database error');

        jest.spyOn(autorService, 'cadastrar').mockRejectedValue(error);

        await expect(autorService.cadastrar(mockAutorDto)).rejects.toThrow(error);

    });
  });

  describe(' - Atualização', () => {
    it('Deve atualizar os dados de um autor existente', async () => {
        const id: string = uuidv4();
        const mockAutorDto: CadastraAutorDto = {
            nome: "Cristiano Ramos",
            sexo: "Masculino",
            anoDeNascimento: 2000,
            cpf: "547.027.780-13"
        };
        const resultado = { id, ...mockAutorDto };

        jest.spyOn(autorService, 'atualizar').mockResolvedValue(resultado);

        expect(await autorService.atualizar(id, mockAutorDto)).toEqual(resultado);

        expect(autorService.atualizar).toHaveBeenCalled();
    });

    it('Deve ocorrer erros durante a atualização dos dados do autor', async () => {
        const id: string = uuidv4();
        const mockAutorDto: CadastraAutorDto = {
            nome: "Cristiano Ramos",
            sexo: "Masculino",
            anoDeNascimento: 2000,
            cpf: "547.027.780-13"
        };
        const error = new Error('Database error');

        jest.spyOn(autorService, 'atualizar').mockRejectedValue(error);

        await expect(autorService.atualizar(id, mockAutorDto)).rejects.toThrow(error);

    });
  });  

  describe(' - Exclusão', () => {
    it('Deve apagar os registros de um autor existente', async () => {
        const id: string = uuidv4();
        const mockAutorDto: CadastraAutorDto = {
            nome: "Cristiano Ramos",
            sexo: "Masculino",
            anoDeNascimento: 2000,
            cpf: "547.027.780-13"
        };
        const resultado = { id, ...mockAutorDto };

        jest.spyOn(autorService, 'remover').mockResolvedValue(resultado);

        expect(await autorService.remover(id)).toEqual(resultado);

        expect(autorService.remover).toHaveBeenCalled();
    });

    it('Deve ocorrer erro ao apagar um autor existente', async () => {
        const id: string = uuidv4();
        const mockAutorDto: CadastraAutorDto = {
            nome: "Cristiano Ramos",
            sexo: "Masculino",
            anoDeNascimento: 2000,
            cpf: "547.027.780-13"
        };
        const error = new Error('Database error');

        jest.spyOn(autorService, 'remover').mockRejectedValue(error);

        await expect(autorService.remover(id)).rejects.toThrow(error);

    });
  });    

  describe(' - Busca autor por nome', () => {
    it('Deve buscar por nome os registros de um autor existente', async () => {
        const id: string = uuidv4();
        const nome: string = 'Cristiano Ramos';
        const mockAutorDto: CadastraAutorDto = {
            nome: "Cristiano Ramos",
            sexo: "Masculino",
            anoDeNascimento: 2000,
            cpf: "547.027.780-13"
        };
        const resultado = { id, ...mockAutorDto };

        jest.spyOn(autorService, 'buscaAutorPorNome').mockResolvedValue(resultado);

        expect(await autorService.buscaAutorPorNome(nome)).toEqual(resultado);

        expect(autorService.buscaAutorPorNome).toHaveBeenCalled();
    });

    it('Deve ocorrer erro ao buscar um autor por nome', async () => {
        const id: string = uuidv4();
        const nome: string = 'Cristiano Ramos';
        const mockAutorDto: CadastraAutorDto = {
            nome: "Cristiano Ramos",
            sexo: "Masculino",
            anoDeNascimento: 2000,
            cpf: "547.027.780-13"
        };
        const error = new Error('Database error');

        jest.spyOn(autorService, 'buscaAutorPorNome').mockRejectedValue(error);

        await expect(autorService.buscaAutorPorNome(nome)).rejects.toThrow(error);

    });
  });      
});
