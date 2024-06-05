import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, Matches } from "class-validator";

export class CadastraLivroDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()    
    isbn: string;

    @IsNotEmpty()
    @IsString()    
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: "Data Hora Inicio deve estar no formato YYY-MM-DD" })
    dataDePublicacao: string;

    @IsArray()
    @ArrayNotEmpty()
    autorPorLivros: string[]

}
