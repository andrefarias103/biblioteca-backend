import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AtualizaLocatarioDto } from '../dto/atualiza-locatario.dto';
import { CadastraLocatarioDto } from '../dto/cadastra-locatario.dto';
import { ListaLocatarioDto } from '../dto/lista-locatario.dto';
import { ILocatarioRepositorio } from '../interface/locatario-repositorio.interface';

@Injectable()
export class LocatarioRepositorio implements ILocatarioRepositorio {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastraLocatarioDto): Promise<ListaLocatarioDto> {
    const locatario = await this.prisma.locatario.create({
      data: {
        nome: data.nome,
        sexo: data.sexo,
        telefone: data.telefone,
        email: data.email,
        dataDeNascimento: data.dataDeNascimento,
        cpf: data.cpf,
      },
    });
    return plainToInstance(ListaLocatarioDto, locatario);
  }

  async atualizar(
    id: string,
    data: AtualizaLocatarioDto,
  ): Promise<ListaLocatarioDto> {
    const locatario = await this.prisma.locatario.update({
      where: { id },
      data: {
        nome: data.nome,
        sexo: data.sexo,
        telefone: data.telefone,
        email: data.email,
        dataDeNascimento: data.dataDeNascimento,
        cpf: data.cpf,
      },
    });
    return plainToInstance(ListaLocatarioDto, locatario);
  }

  async remover(id: string) {
    return await this.prisma.locatario.delete({ where: { id } });
  }

  async buscaPorId(id: string): Promise<ListaLocatarioDto> {
    return await this.prisma.locatario.findUnique({ where: { id } });
  }

  async buscaPorNome(nome: string): Promise<ListaLocatarioDto[]> {
    if (nome) {
      const locatario = await this.prisma.locatario.findMany({
        where: { nome: { contains: nome, mode: 'insensitive' } },
      });
      if (!locatario) {
        return [];
      }
      return plainToInstance(ListaLocatarioDto, locatario);
    } else {
      const locatario = await this.prisma.locatario.findMany();
      if (!locatario) {
        return [];
      }
      return plainToInstance(ListaLocatarioDto, locatario);
    }
  }
}
