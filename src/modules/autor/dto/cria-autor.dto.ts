import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CriaAutorDto {

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  sexo: string;

  @IsNotEmpty()
  @IsNumber()
  anoDeNascimento: number;

  @IsNotEmpty()
  // @ValidationCPF({ message: 'CPF Inválido' })
  cpf: string;

  }
