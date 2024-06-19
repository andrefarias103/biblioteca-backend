import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ValidationCPF } from '../../../comum/recurso/validacao/cpf.validador';

export class CadastraLocatarioDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  sexo: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Data de Nascimento deve estar no formato YYYY-MM-DD',
  })
  dataDeNascimento: string;

  @IsNotEmpty()
  @ValidationCPF({ message: 'O CPF informado é inválido!' })
  cpf: string;
}
