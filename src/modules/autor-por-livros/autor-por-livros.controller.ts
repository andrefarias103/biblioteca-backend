import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutorPorLivrosService } from './autor-por-livros.service';
import { CreateAutorPorLivroDto } from './dto/create-autor-por-livro.dto';
import { UpdateAutorPorLivroDto } from './dto/update-autor-por-livro.dto';

@Controller('autor-por-livros')
export class AutorPorLivrosController {
  constructor(private readonly autorPorLivrosService: AutorPorLivrosService) {}

  @Post()
  create(@Body() createAutorPorLivroDto: CreateAutorPorLivroDto) {
    return this.autorPorLivrosService.create(createAutorPorLivroDto);
  }

  @Get()
  findAll() {
    return this.autorPorLivrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autorPorLivrosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutorPorLivroDto: UpdateAutorPorLivroDto) {
    return this.autorPorLivrosService.update(+id, updateAutorPorLivroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autorPorLivrosService.remove(+id);
  }
}
