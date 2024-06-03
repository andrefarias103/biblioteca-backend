import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Autor } from '../autor.entity';
import { AtualizaAutorDto } from '../dto/atualiza-autor.dto';
import { CriaAutorDto } from '../dto/cria-autor.dto';
import { AutorService } from './../servicos/autor.service';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um Autor'})
  @ApiResponse({
    status: 201,
    description: 'Cadastro do autor com sucesso',
    // type: CreateTodosSwagger
  })
  async cadastrar(@Body() dadosAutor: CriaAutorDto) {
    return await this.autorService.cadastrar(dadosAutor);
  }

  @Get()
  findAll() {
    return this.autorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autorService.findOne(+id);
  }

  @Get('/nome/:nome')
  @ApiOperation({ summary: 'Listar Autor por Nome'})
  async buscaAutorPorNome(@Param('nome') nome: string): Promise<Autor> {
    return await this.autorService.buscaAutorPorNome(nome);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar os dados de um Autor existente'})
  async atualizar(@Param('id') id: string, @Body() dadosAutor: AtualizaAutorDto): Promise<Autor> {
    return await this.autorService.atualizar(id, dadosAutor);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um Autor'})
  async remover(@Param('id') id: string) {
    return await this.autorService.remover(id);
  }
}
