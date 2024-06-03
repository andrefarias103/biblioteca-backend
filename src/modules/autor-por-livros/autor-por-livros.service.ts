import { Injectable } from '@nestjs/common';
import { CreateAutorPorLivroDto } from './dto/create-autor-por-livro.dto';
import { UpdateAutorPorLivroDto } from './dto/update-autor-por-livro.dto';

@Injectable()
export class AutorPorLivrosService {
  create(createAutorPorLivroDto: CreateAutorPorLivroDto) {
    return 'This action adds a new autorPorLivro';
  }

  findAll() {
    return `This action returns all autorPorLivros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autorPorLivro`;
  }

  update(id: number, updateAutorPorLivroDto: UpdateAutorPorLivroDto) {
    return `This action updates a #${id} autorPorLivro`;
  }

  remove(id: number) {
    return `This action removes a #${id} autorPorLivro`;
  }
}
