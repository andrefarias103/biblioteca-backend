import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CadastraAluguelDto {
    @IsNotEmpty()
    @IsString()
    dataRetirada: string;

    @IsNotEmpty()
    @IsString()
    dataDevolucao: string;

    @IsNotEmpty()
    @IsString()
    locatarioId: string;

    @IsArray()
    livro: string[];

}
