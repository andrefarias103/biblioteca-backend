import { PartialType } from '@nestjs/mapped-types';
import { CreateAutorPorLivroDto } from './create-autor-por-livro.dto';

export class UpdateAutorPorLivroDto extends PartialType(CreateAutorPorLivroDto) {}
