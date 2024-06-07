import { IsNotEmpty, IsString } from "class-validator";

export class CadastraAutorPorLivroDto {
    @IsNotEmpty()
    @IsString()
    autorId: string;

    @IsNotEmpty()
    @IsString()    
    livroId: string;
}