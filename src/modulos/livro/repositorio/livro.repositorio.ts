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
    async buscaPorId(id: string): Promise<ListaLivroDto | null> {
      const livro = await this.prisma.livro.findUnique({ where: { id } });
      return plainToInstance(ListaLivroDto, livro);
    }

  ////////////////////////////////////////     
    async ObtemlistarPorId(listaId: string[]): Promise<ListaLivroDto[] | null> {
      const livro = await this.prisma.livro.findMany({ where: { id: { in: listaId} }});
      return plainToInstance(ListaLivroDto, livro);;
    }

  ////////////////////////////////////////       
    async ObtemlistaReservados(): Promise<ListaLivroDto[]> {
      const livrosReservados = await this.prisma.livro.findMany({ where: { aluguelId: { not: null} }, include: { autorPorLivros: true}    });   
      return plainToInstance(ListaLivroDto, livrosReservados);;
    }

  ////////////////////////////////////////       
  async ObtemlistaDisponiveis(): Promise<ListaLivroDto[]> {
    const livrosDisponiveis = await this.prisma.livro.findMany({ where: { aluguelId: null }, include: { autorPorLivros: true}    });   
    return plainToInstance(ListaLivroDto, livrosDisponiveis);;
  }    
  

}