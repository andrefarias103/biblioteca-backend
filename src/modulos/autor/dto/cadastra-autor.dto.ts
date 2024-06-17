import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ValidationCPF } from "../../../comum/recurso/validacao/cpf.validador";

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
  @ValidationCPF({ message: "O CPF informado é inválido!" })
  cpf: string;

  }
