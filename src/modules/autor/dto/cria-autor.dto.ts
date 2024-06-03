import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CriaAutorDto {

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsBoolean()
  sexo: boolean;

  @IsNotEmpty()
  @IsNumber()
  anoDeNascimento: number;

  @IsNotEmpty()
  // @ValidationCPF({ message: 'CPF Inválido' })
  cpf: string;

  }
