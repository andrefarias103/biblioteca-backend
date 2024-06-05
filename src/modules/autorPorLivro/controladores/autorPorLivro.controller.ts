import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CadastraAutorPorLivroDto } from "../dto/cadastra-autorPorLivro.dto";
import { AutorPorLivroService } from "../servicos/autorPorLivro.service";

@Controller('autorPorLivro')
export class AutorPorLivroController {
    constructor(private readonly autorPorLivroService: AutorPorLivroService) {}

    @Post()
    @ApiOperation({ summary: 'Relaciona um Autor a um livro'})
    @ApiResponse({
      status: 201,
      description: 'Relacionamento do autor e livro com sucesso',
      // type: CreateTodosSwagger
    })
    async cadastrar(@Body() dadosAutor: CadastraAutorPorLivroDto) {
      return await this.autorPorLivroService.cadastrar(dadosAutor);
    }

}