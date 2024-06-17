import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { PrismaService } from "../../../../prisma/prisma.service";
import { AtualizaLivroDto } from "../dto/atualiza-livro.dto";
import { CadastraLivroDto } from "../dto/cadastra-livro.dto";
import { ListaLivroDto } from "../dto/lista-livro.dto";
import { ILivroRepositorio } from './../interface/livro-repositorio.interface';

@Injectable()
export class LivroRepositorio implements ILivroRepositorio {
    constructor(private readonly prisma: PrismaService) {}

  //////////////////////////////////////// 
    async cadastrar(dadosLivro: CadastraLivroDto): Promise<ListaLivroDto> {
      const livro = await this.prisma.livro.create( { data: { nome: dadosLivro.nome,
                                                             isbn: dadosLivro.isbn,
                                                             dataDePublicacao: dadosLivro.dataDePublicacao
       }});
      return plainToInstance(ListaLivroDto, livro); 
    }
  
  ////////////////////////////////////////     
    async atualizar(id: string, data: AtualizaLivroDto): Promise<ListaLivroDto> {
      const livro = await this.prisma.livro.update({ where: { id } , data: { nome: data.nome, 
                                                                             isbn: data.isbn, 
                                                                             dataDePublicacao: data.dataDePublicacao,
                                                                             aluguelId: data.aluguelId} });
      return plainToInstance(ListaLivroDto, livro); 
    }
  
  ////////////////////////////////////////     
    async remover(id: string) {
      return this.prisma.livro.delete({ where: { id } });
    }

      ////////////////////////////////////////  
    async listarTodos(): Promise<ListaLivroDto[]> {
      const livros = await this.prisma.livro.findMany({ include: { autorPorLivros: false}    });
      return plainToInstance(ListaLivroDto, livros);
    }

  ////////////////////////////////////////     
    async buscaPorId(id: string): Promise<ListaLivroDto | null> {
      //const livro = await this.prisma.livro.findUnique({ where: { id } });
      const livro = await this.prisma.livro.findUnique({ where: { id }, 
        include: { 
                    autorPorLivros: { 
                                       include: { autor: true,},
                                     },
                 },
       });
      return plainToInstance(ListaLivroDto, livro);
    }

  ////////////////////////////////////////     
    async ObtemlistarPorId(listaId: string[]): Promise<ListaLivroDto[] | null> {
      const livro = await this.prisma.livro.findMany({ where: { id: { in: listaId} }});
      return plainToInstance(ListaLivroDto, livro);;
    }

  ////////////////////////////////////////       
    async ObtemlistaReservados(nome: string): Promise<ListaLivroDto[]> {
      if (nome) {
      const livrosReservados = await this.prisma.livro.findMany({ where: { nome: { contains: nome, mode: "insensitive" } , aluguelId: { not: null} }, include: { autorPorLivros: true} });   
      return plainToInstance(ListaLivroDto, livrosReservados);
      }
      else {
        const livrosReservados = await this.prisma.livro.findMany({ where: { aluguelId: { not: null} }, include: { autorPorLivros: true} });   
        return plainToInstance(ListaLivroDto, livrosReservados);     
      }
    }

  ////////////////////////////////////////       
  async ObtemlistaDisponiveis(nome: string): Promise<ListaLivroDto[]> {
    if (nome) {
      const livrosDisponiveis = await this.prisma.livro.findMany({ where: { nome: { contains: nome, mode: "insensitive" }, aluguelId: null }, include: { autorPorLivros: true}    });   
      return plainToInstance(ListaLivroDto, livrosDisponiveis);
    }
    else {
      const livrosDisponiveis = await this.prisma.livro.findMany({ where: { aluguelId: null }, include: { autorPorLivros: true}    });   
      return plainToInstance(ListaLivroDto, livrosDisponiveis);
    }
  }    

  ////////////////////////////////////////       
  async buscaPorNome(nome: string): Promise<ListaLivroDto[] | null> {
    const livro = await this.prisma.livro.findMany({ where: { nome: { contains: nome, mode: "insensitive" } },
                                                       include: { 
                                                                   autorPorLivros: { 
                                                                                      include: { autor: true,},
                                                                                    },
                                                                },
                                                      });
   if (!livro) {
    return [];
   }
    return plainToInstance(ListaLivroDto, livro);
  }
  

}