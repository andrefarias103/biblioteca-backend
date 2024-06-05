import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../../../prisma/prisma.service";
import { AtualizaAutorDto } from '../dto/atualiza-autor.dto';
import { CadastraAutorDto } from '../dto/cadastra-autor.dto';
import { ListaAutorDto } from '../dto/lista-autor.dto';
import { IAutorRepositorio } from '../interfaces/autor-repositorio.interface';

@Injectable()
export class AutorRepositorio implements IAutorRepositorio {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastraAutorDto): Promise<ListaAutorDto> {
    return await this.prisma.autor.create({ data });
  }

  async atualizar(id: string, data: AtualizaAutorDto): Promise<ListaAutorDto> {
    return await this.prisma.autor.update ({ where: { id } , data });
  }

  async remover(id: string) {
    return await this.prisma.autor.delete ({ where: { id } });
  }

  async listarTodos(): Promise<ListaAutorDto[]> {
    return await this.prisma.autor.findMany();
  }

  async buscaPorNome(nome: string): Promise<ListaAutorDto | null> {
    return await this.prisma.autor.findUnique({ where: { nome } });
  }

  // Outros métodos...
}
