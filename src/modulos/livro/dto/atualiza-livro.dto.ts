import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class AtualizaLivroDto{
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()    
    isbn: string;

    @IsNotEmpty()
    @IsString()    
    @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: "Data de Publicação deve estar no formato YYYY-MM-DD" })
    dataDePublicacao: string;

    @IsOptional()
    @IsString()   
    aluguelId?: string; 

    autorPorLivros: { 
        autorId: string;
        livroId: string;
        autor: {
                id: string;
                nome: string;
        }
    }[];
}
