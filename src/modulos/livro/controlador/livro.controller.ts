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
import { AtualizaLivroDto } from '../dto/atualiza-livro.dto';
import { CadastraLivroDto } from '../dto/cadastra-livro.dto';
import { ListaLivroDto } from '../dto/lista-livro.dto';
import { LivroService } from '../servico/livro.service';

@Controller('livro')
export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastra um Livro' })
  @ApiResponse({
    status: 201,
    description: 'Cadastro do livro com sucesso',
    // type: CreateTodosSwagger
  })
  async cadastrar(@Body() dadosLivro: CadastraLivroDto) {
    return await this.livroService.cadastrar(dadosLivro);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os livros' })
  async listarTodos(): Promise<ListaLivroDto[]> {
    return this.livroService.listarTodos();
  }

  @Get('reservados/')
  @ApiOperation({ summary: 'Lista todos os livros reservados' })
  async buscaLivrosReservados(): Promise<ListaLivroDto[] | null> {
    const livrosReservados = await this.livroService.buscaLivroReservados();
    return livrosReservados;
  }

  @Get('disponiveis/')
  @ApiOperation({ summary: 'Lista todos os livros disponíveis' })
  async buscaLivrosDisponiveis(): Promise<ListaLivroDto[] | null> {
    const livrosDisponiveis = await this.livroService.buscaLivrosDisponiveis();
    return livrosDisponiveis;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista livro por id' })
  async buscaLivroPorId(@Param('id') id: string): Promise<ListaLivroDto> {
    return await this.livroService.buscaLivroPorId(id);
  }

  @Get('/nome/:nome')
  @ApiOperation({ summary: 'Lista livro por nome' })
  async buscaAutorPorNome(@Param('nome') nome: string): Promise<ListaLivroDto> {
    const livro= await this.livroService.buscaLivroPorNome(nome);
    return livro;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um livro existente' })
  async atualizar(
    @Param('id') id: string,
    @Body() dadosLivro: AtualizaLivroDto,
  ): Promise<ListaLivroDto> {
    return await this.livroService.atualizar(id, dadosLivro);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Exclui um livro' })
  async remover(@Param('id') id: string) {
    return await this.livroService.remover(id);
  }
}
