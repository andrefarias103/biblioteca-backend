import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CadastraAutorDto {

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  sexo: string;

  @IsNotEmpty()
  @IsNumber()
  anoDeNascimento: number;

  @IsNotEmpty()
  // @ValidationCPF({ message: 'CPF Inválido' })
  cpf: string;

  }
