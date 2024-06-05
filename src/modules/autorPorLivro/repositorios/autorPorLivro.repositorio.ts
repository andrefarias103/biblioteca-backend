import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../prisma/prisma.service";
import { CadastraAutorPorLivroDto } from "../dto/cadastra-autorPorLivro.dto";
import { ListaAutorPorLivroDto } from "../dto/lista-autorPorLivro.dto";
import { IAutorPorLivroRepositorio } from "../interfaces/autorPorLivro-interface";

@Injectable()
export class AutorPorLivroRepositorio implements IAutorPorLivroRepositorio {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastraAutorPorLivroDto): Promise<ListaAutorPorLivroDto> {
    return await this.prisma.autorPorLivros.create({ data });
  }
}