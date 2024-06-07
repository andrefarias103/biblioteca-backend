import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ValidacaoCPF } from "../../../comum/recurso/validacao/cpf.validador";

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
  @ValidacaoCPF({ message: "O CPF informado é inválido!" })
  cpf: string;

  }
