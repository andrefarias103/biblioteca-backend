import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AtualizaLocatarioDto } from '../dto/atualiza-locatario.dto';
import { CadastraLocatarioDto } from '../dto/cadastra-locatario.dto';
import { ListaLocatarioDto } from '../dto/lista-locatario.dto';
import { LocatarioService } from '../servico/locatario.service';

@Controller('locatario')
export class LocatarioController {
  constructor(private readonly locatarioService: LocatarioService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um Locatário'})
  @ApiResponse({
    status: 201,
    description: 'Cadastro do locatário com sucesso',
    // type: CreateTodosSwagger
  })
  async cadastrar(@Body() dadosLocatario: CadastraLocatarioDto): Promise<ListaLocatarioDto> {
    return this.locatarioService.cadastrar(dadosLocatario);
  }

  @Get()
  findAll() {
    return this.locatarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista locatário por Id' })
  async BuscaPorId(@Param('id') id: string): Promise<ListaLocatarioDto> {
    return this.locatarioService.buscaPorId(id);
  }

  @Get('/nome/:nome')
  @ApiOperation({ summary: 'Lista locatário por nome' })
  async buscaAutorPorNome(@Param('nome') nome: string): Promise<ListaLocatarioDto> {
    return await this.locatarioService.buscaAutorPorNome(nome);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um locatário existente'})
  async atualizar(@Param('id') id: string, @Body() dadosLocatario: AtualizaLocatarioDto) {
    return this.locatarioService.atualizar(id, dadosLocatario);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um locatário'})
  async remover(@Param('id') id: string) {
    return this.locatarioService.remover(id);
  }
}
