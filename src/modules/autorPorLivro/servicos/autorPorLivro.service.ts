import { Inject, Injectable } from "@nestjs/common";
import { AUTORPORLIVRO_REPOSITORIO } from "src/common/constantes/constantes";
import { CadastraAutorPorLivroDto } from "../dto/cadastra-autorPorLivro.dto";
import { ListaAutorPorLivroDto } from "../dto/lista-autorPorLivro.dto";
import { IAutorPorLivroRepositorio } from "../interfaces/autorPorLivro-interface";

@Injectable()
export class AutorPorLivroService {
    constructor(@Inject(AUTORPORLIVRO_REPOSITORIO) private readonly autorPorLivroRepositorio: IAutorPorLivroRepositorio) {}

    async cadastrar(dadosAutor: CadastraAutorPorLivroDto):Promise<ListaAutorPorLivroDto> {
      return await this.autorPorLivroRepositorio.cadastrar(dadosAutor);
    }
}