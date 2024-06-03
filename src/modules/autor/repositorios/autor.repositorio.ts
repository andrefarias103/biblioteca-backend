import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Autor } from '../autor.entity';
import { AtualizaAutorDto } from '../dto/atualiza-autor.dto';
import { CriaAutorDto } from '../dto/cria-autor.dto';
import { IAutorRepositorio } from '../interfaces/autor-repositorio.interface';

@Injectable()
export class AutorRepositorio implements IAutorRepositorio {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CriaAutorDto): Promise<Autor> {
    return this.prisma.autor.create({ data });
  }

  async atualizar(id: string, data: AtualizaAutorDto): Promise<Autor> {
    return this.prisma.autor.update ({ where: { id } , data });
  }

  async remover(id: string) {
    return this.prisma.autor.delete ({ where: { id } });
  }

  async buscaPorCondicao(nome: string): Promise<Autor | null> {
    return this.prisma.autor.findUnique({ where: { nome } });
  }

  // Outros métodos...
}
