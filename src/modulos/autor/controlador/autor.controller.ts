import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AtualizaAutorDto } from '../dto/atualiza-autor.dto';
import { CadastraAutorDto } from '../dto/cadastra-autor.dto';
import { ListaAutorDto } from '../dto/lista-autor.dto';
import { AutorService } from './../servico/autor.service';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um Autor' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro do autor com sucesso',
  })
  async cadastrar(@Body() dadosAutor: CadastraAutorDto) {
    return await this.autorService.cadastrar(dadosAutor);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os autores' })
  async listarTodos(): Promise<ListaAutorDto[]> {
    return this.autorService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista autor por Id' })
  async BuscaPorId(@Param('id') id: string): Promise<ListaAutorDto> {
    return this.autorService.buscaPorId(id);
  }

  @Get('/nome/:nome')
  @ApiOperation({ summary: 'Lista autor por nome' })
  async buscaAutorPorNome(@Param('nome') nome: string): Promise<ListaAutorDto> {
    return await this.autorService.buscaAutorPorNome(nome);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um autor existente' })
  async atualizar(
    @Param('id') id: string,
    @Body() dadosAutor: AtualizaAutorDto,
  ): Promise<ListaAutorDto> {
    return await this.autorService.atualizar(id, dadosAutor);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um autor' })
  async remover(@Param('id') id: string) {
    return await this.autorService.remover(id);
  }
}
