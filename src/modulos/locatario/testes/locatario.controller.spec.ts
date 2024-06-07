import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { LocatarioController } from '../controlador/locatario.controller';
import { CadastraLocatarioDto } from '../dto/cadastra-locatario.dto';
import { LocatarioRepositorio } from '../repositorio/locatario.repositorio';
import { LocatarioService } from '../servico/locatario.service';
import { PrismaService } from "./../../../../prisma/prisma.service";
import { LOCATARIO_REPOSITORIO } from './../../../comum/constantes/constantes';


describe('LocatarioController', () => {
  let locatarioController: LocatarioController;
  let locatarioService: LocatarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [LocatarioController],
      providers: [LocatarioService, LocatarioRepositorio, PrismaService,
                  { provide: LOCATARIO_REPOSITORIO,  useClass: LocatarioRepositorio  },
      ],
    }).compile();

    locatarioController = module.get<LocatarioController>(LocatarioController);
    locatarioService = module.get<LocatarioService>(LocatarioService);
  });

  it('deve ser definido', () => {
    expect(locatarioController).toBeDefined();
  });      

  describe(' - Cadastro', () => {
    it('Deve cadastrar um novo locatario com sucesso', async () => {
        const id: string = uuidv4();
        const mockLocatarioDto: CadastraLocatarioDto = {
          nome: "Maria Eduardo do Nascimento",
          sexo: "Feminino",
          telefone: "5198118-0588",
          email: "maria_nascimento@gmail.com",
          dataDeNascimento: "1988-05-16",
          cpf: "483.462.240-10"
      };

        const resultado = { id, ...mockLocatarioDto};

        jest.spyOn(locatarioService, 'cadastrar').mockResolvedValue(resultado);

        expect(await locatarioController.cadastrar(mockLocatarioDto)).toEqual(resultado);
    });


    it('Deve ocorrer erros durante o cadastro do locatario', async () => {
        const mockLocatarioDto: CadastraLocatarioDto = {
          nome: "Maria Eduardo do Nascimento",
          sexo: "Feminino",
          telefone: "5198118-0588",
          email: "maria_nascimento@gmail.com",
          dataDeNascimento: "1988-05-16",
          cpf: "483.462.240-10"
      };
        const error = new Error('Database error');

        jest.spyOn(locatarioService, 'cadastrar').mockRejectedValue(error);

        await expect(locatarioController.cadastrar(mockLocatarioDto)).rejects.toThrow(error);
    });        
});  

describe(' - Atualização', () => {
    it('Deve atualizar os dados de um locatario existente', async () => {
        const id: string = uuidv4();
        const mockLocatarioDto: CadastraLocatarioDto = {
          nome: "Maria Eduardo do Nascimento",
          sexo: "Feminino",
          telefone: "5198118-0588",
          email: "maria_nascimento@gmail.com",
          dataDeNascimento: "1988-05-16",
          cpf: "483.462.240-10"
      };

        const resultado = { id: uuidv4(), ...mockLocatarioDto};

        jest.spyOn(locatarioService, 'atualizar').mockResolvedValue(resultado);

        expect(await locatarioController.atualizar(id, mockLocatarioDto)).toEqual(resultado);
    });

    
    it('Deve ocorrer erros durante a atualização dos dados do locatario', async () => {
        const id: string = uuidv4();
        const mockLocatarioDto: CadastraLocatarioDto = {
          nome: "Maria Eduardo do Nascimento",
          sexo: "Feminino",
          telefone: "5198118-0588",
          email: "maria_nascimento@gmail.com",
          dataDeNascimento: "1988-05-16",
          cpf: "483.462.240-10"
      };
        const error = new Error('Database error');

        jest.spyOn(locatarioService, 'atualizar').mockRejectedValue(error);

        await expect(locatarioController.atualizar(id, mockLocatarioDto)).rejects.toThrow(error);
    });        
});      

describe(' - Exclusão', () => {
    it('Deve apagar os registros de um locatario existente', async () => {
        const id: string = uuidv4();
        const mockLocatarioDto: CadastraLocatarioDto = {
          nome: "Maria Eduardo do Nascimento",
          sexo: "Feminino",
          telefone: "5198118-0588",
          email: "maria_nascimento@gmail.com",
          dataDeNascimento: "1988-05-16",
          cpf: "483.462.240-10"
      };

        const resultado = { id: uuidv4(), ...mockLocatarioDto};

        jest.spyOn(locatarioService, 'remover').mockResolvedValue(resultado);

        expect(await locatarioController.remover(id)).toEqual(resultado);
    });

    
    it('Deve ocorrer erro ao apagar um locatario existente', async () => {
        const id: string = uuidv4();
        const mockLocatarioDto: CadastraLocatarioDto = {
          nome: "Maria Eduardo do Nascimento",
          sexo: "Feminino",
          telefone: "5198118-0588",
          email: "maria_nascimento@gmail.com",
          dataDeNascimento: "1988-05-16",
          cpf: "483.462.240-10"
      };
        const error = new Error('Database error');

        jest.spyOn(locatarioService, 'remover').mockRejectedValue(error);

        await expect(locatarioController.remover(id)).rejects.toThrow(error);
    });        
});    



});
