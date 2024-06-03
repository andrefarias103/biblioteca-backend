import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { Autor } from '../autor.entity';
import { AtualizaAutorDto } from '../dto/atualiza-autor.dto';
import { CriaAutorDto } from '../dto/cria-autor.dto';
import { AutorService } from './../servicos/autor.service';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post()
  cadastrar(@Body() dadosAutor: CriaAutorDto) {
    return this.autorService.cadastrar(dadosAutor);
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
  async buscaAutorPorNome(@Param('nome') nome: string): Promise<Autor> {
    return await this.autorService.buscaAutorPorNome(nome);
  }

  @Patch(':id')
  async atualizar(@Param('id') id: string, @Body() dadosAutor: AtualizaAutorDto): Promise<Autor> {
    return await this.autorService.atualizar(id, dadosAutor);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.autorService.remover(id);
  }
}
