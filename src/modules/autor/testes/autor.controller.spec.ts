import { Test, TestingModule } from "@nestjs/testing";
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from "../../../../prisma/prisma.service";
import { CadastraAutorDto } from "../dto/cadastra-autor.dto";
import { AutorRepositorio } from "../repositorios/autor.repositorio";
import { AutorService } from "../servicos/autor.service";
import { AUTOR_REPOSITORIO } from './../../../common/constantes/constantes';
import { AutorController } from './../controladores/autor.controller';

describe('AutorController', () => {

    let autorController: AutorController;
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
    
        autorController = module.get<AutorController>(AutorController);
        autorService = module.get<AutorService>(AutorService);
      });

      it('deve ser definido', () => {
        expect(autorController).toBeDefined();
      });

      describe(' - Cadastro', () => {
        it('Deve cadastrar um novo autor com sucesso', async () => {
            const mockAutorDto: CadastraAutorDto = {
                nome: "Cristiano Ramos",
                sexo: "Masculino",
                anoDeNascimento: 2000,
                cpf: "547.027.780-13"
            };

            const resultado = { id: uuidv4(), ...mockAutorDto};

            jest.spyOn(autorService, 'cadastrar').mockResolvedValue(resultado);

            expect(await autorController.cadastrar(mockAutorDto)).toEqual(resultado);
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
    
            await expect(autorController.cadastrar(mockAutorDto)).rejects.toThrow(error);
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

            const resultado = { id: uuidv4(), ...mockAutorDto};

            jest.spyOn(autorService, 'atualizar').mockResolvedValue(resultado);

            expect(await autorController.atualizar(id, mockAutorDto)).toEqual(resultado);
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
    
            await expect(autorController.atualizar(id, mockAutorDto)).rejects.toThrow(error);
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

            const resultado = { id: uuidv4(), ...mockAutorDto};

            jest.spyOn(autorService, 'remover').mockResolvedValue(resultado);

            expect(await autorController.remover(id)).toEqual(resultado);
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
    
            await expect(autorController.remover(id)).rejects.toThrow(error);
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

            const resultado = { id: uuidv4(), ...mockAutorDto};

            jest.spyOn(autorService, 'buscaAutorPorNome').mockResolvedValue(resultado);

            expect(await autorController.buscaAutorPorNome(nome)).toEqual(resultado);
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
    
            await expect(autorController.buscaAutorPorNome(nome)).rejects.toThrow(error);
        });        
    });     
});