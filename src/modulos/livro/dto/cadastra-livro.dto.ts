import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CadastraLivroDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  isbn: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Data de Publicação deve estar no formato YYYY-MM-DD',
  })
  dataDePublicacao: string;

  @IsArray()
  @ArrayNotEmpty()
  autorPorLivros: string[];

  @IsOptional()
  @IsString()
  aluguelId?: string;
}
